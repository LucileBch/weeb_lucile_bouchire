import re
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import PasswordResetCode

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
        min_length=8,
        max_length=20,
        style={'input_type': 'password'}
    )

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'password']

    def validate_password(self, value):
        """
        Custom password validation rules
        """
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins une majuscule.")
        
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins une minuscule.")
        
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins un chiffre.")
        
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins un caractère spécial.")
            
        return value
    
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

        if user:
            # 2. check if account is_active
            if not user.is_active:
                raise serializers.ValidationError({
                    "detail": "Votre compte est en attente de validation par l'administrateur."
                })
            
            # 3. check password
            user_authenticated = authenticate(email=email, password=password)
            if not user_authenticated:
                raise serializers.ValidationError({
                    "detail": "Email ou mot de passe incorrect."
                })
        else:
            # 4. user does not exist
            raise serializers.ValidationError({
                "detail": "Aucun compte trouvé avec cet email."
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
    Validate email adress associated to user
    """
    email = serializers.EmailField()

    def validate_email(self, value):
        value = value.lower()
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Aucun compte n'est associé à cet email.")
        return value

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
        min_length=8, 
        max_length=20,
        style={'input_type': 'password'}
    )

    def validate_password(self, value):
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins une majuscule.")
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins une minuscule.")
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins un chiffre.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins un caractère spécial.")
        return value

    def validate(self, data):
        email = data.get('email').lower()
        code_saisi = data.get('activationCode')

        reset_entry = PasswordResetCode.objects.filter(
            user__email=email, 
            is_used=False
        ).first()

        if not reset_entry:
            raise serializers.ValidationError({"activationCode": "Code invalide ou déjà utilisé."})
        
        if reset_entry.code != code_saisi:
            raise serializers.ValidationError({"activationCode": "Code incorrect."})

        if reset_entry.is_expired:
            raise serializers.ValidationError({"activationCode": "Le code a expiré."})

        data['reset_entry'] = reset_entry
        return data

    def save(self):
        new_password = self.validated_data['password']
        reset_entry = self.validated_data['reset_entry']
        
        user = reset_entry.user
        user.set_password(new_password)
        user.save()

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
        required=False, 
        min_length=8, 
        max_length=20
    )

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'old_password', 'new_password']
        extra_kwargs = {
            'email': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
        }

    def validate_new_password(self, value):
        """
        Password validation rules
        """
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins une majuscule.")
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins une minuscule.")
        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins un chiffre.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Le mot de passe doit contenir au moins un caractère spécial.")
        return value

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