import re
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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