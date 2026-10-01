from rest_framework import serializers
from django.db.models import F
from .models import CustomUser
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import PasswordResetCode
from .utils import revoke_all_user_sessions

def run_password_validators(password, user, field):
    """
    Run AUTH_PASSWORD_VALIDATORS and convert Django errors to DRF errors
    """
    try:
        password_validation.validate_password(password, user=user)
    except DjangoValidationError as e:
        raise serializers.ValidationError({field: list(e.messages)})

class RegisterSerializer(serializers.ModelSerializer):
    """
    Register Serializer
    Create user account
    """
    email = serializers.EmailField(
        # On ajoute manuellement le validateur d'unicité ici
        validators=[
            UniqueValidator(
                queryset=CustomUser.objects.all(),
                message="Ce compte existe déjà et est en attente d'activation par l'administrateur."
            )
        ]
    )

    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'password']

    def validate(self, attrs):
        user = CustomUser(
            email=attrs.get('email'),
            first_name=attrs.get('first_name'),
            last_name=attrs.get('last_name')
        )
        run_password_validators(attrs['password'], user, 'password')
        return attrs

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom MyTokenObtainPairSerializer 
    Adding is_active and is_superuser in JWT claims
    """
    @classmethod
    def get_token(cls, user):
        # get token
        token = super().get_token(user)

        # add claims
        token['is_active'] = user.is_active
        token['is_superuser'] = user.is_superuser
        return token

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        user = CustomUser.objects.filter(email=email).first()

        # 1. Same message for unknown email and wrong password (no account enumeration)
        if not user:
            # hash anyway to keep the same response time as an existing account
            CustomUser().set_password(password)
            raise serializers.ValidationError({
                "detail": "Email ou mot de passe incorrect."
            })

        if not user.check_password(password):
            raise serializers.ValidationError({
                "detail": "Email ou mot de passe incorrect."
            })

        # 2. Account status only revealed once the password is proven
        if not user.is_active:
            raise serializers.ValidationError({
                "detail": "Votre compte est en attente de validation par l'administrateur."
            })

        # 
        data = super().validate(attrs)
        
        # data for LocalStorage
        data['user_data'] = {
            'id': self.user.id,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'email': self.user.email,
        }
        
        return data

class ForgotPasswordCodeRequestSerializer(serializers.Serializer):
    """
    Forgot Password Code Request Serializer 
    Validate email format only: account existence is never revealed
    """
    email = serializers.EmailField()

    def validate_email(self, value):
        return value.lower()

class ForgotPasswordConfirmSerializer(serializers.Serializer):
    """
    Forgot Password Confirm Serializer
    Validate new password
    Code control and invalidation after being used
    """
    email = serializers.EmailField()
    activationCode = serializers.CharField(max_length=6)
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )

    def validate(self, data):
        email = data.get('email').lower()
        code_saisi = data.get('activationCode')

        reset_entry = PasswordResetCode.objects.filter(
            user__email=email, 
            is_used=False
        ).first()

        # Security: same message for every failure (unknown email, wrong, expired or locked code)
        # so that the response never reveals if an account exists
        invalid_code_error = serializers.ValidationError({
            "activationCode": f"Code invalide ou expiré. Après {PasswordResetCode.MAX_ATTEMPTS} essais erronés, le code est désactivé : demandez-en un nouveau."
        })

        # Brute force protection: code invalidated after too many wrong attempts
        if not reset_entry or reset_entry.is_locked or reset_entry.is_expired:
            raise invalid_code_error

        if reset_entry.code != code_saisi:
            # Atomic increment in DB to count concurrent requests
            PasswordResetCode.objects.filter(pk=reset_entry.pk).update(attempts=F('attempts') + 1)
            raise invalid_code_error

        run_password_validators(data['password'], reset_entry.user, 'password')

        data['reset_entry'] = reset_entry
        return data

    def save(self):
        new_password = self.validated_data['password']
        reset_entry = self.validated_data['reset_entry']
        
        user = reset_entry.user
        user.set_password(new_password)
        user.save()

        # Security: password changed => disconnect all devices
        revoke_all_user_sessions(user)

        # Invalidation code
        reset_entry.is_used = True
        reset_entry.save()
        return user

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """
    User Profile Update Serializer
    Handle profile info changes and optional password change
    """
    old_password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'old_password', 'new_password']
        extra_kwargs = {
            'email': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
        }

    def validate(self, data):
        # if user update password
        if 'new_password' in data:
            if 'old_password' not in data:
                raise serializers.ValidationError({"old_password": "L'ancien mot de passe est requis."})
            
            user = self.context['request'].user
            if not user.check_password(data.get('old_password')):
                raise serializers.ValidationError({"old_password": "L'ancien mot de passe est incorrect."})
            
            # check new_password different from old_password
            if data.get('old_password') == data.get('new_password'):
                raise serializers.ValidationError({"new_password": "Le nouveau mot de passe doit être différent de l'ancien."})

            run_password_validators(data['new_password'], user, 'new_password')

        return data

    def update(self, instance, validated_data):
        new_password = validated_data.pop('new_password', None)
        validated_data.pop('old_password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if new_password:
            instance.set_password(new_password)
        
        instance.save()
        return instance