import re
from rest_framework import serializers
from .models import CustomUser
from django.core.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

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