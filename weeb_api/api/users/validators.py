import re
from django.core.exceptions import ValidationError

class PasswordComplexityValidator:
    """
    Custom password validator
    Same rules as frontend (validationRules.ts)
    """
    def __init__(self, max_length=20):
        self.max_length = max_length

    def validate(self, password, user=None):
        errors = []
        if len(password) > self.max_length:
            errors.append(f"Le mot de passe ne doit pas dépasser {self.max_length} caractères.")
        if re.search(r'\s', password):
            errors.append("Le mot de passe ne doit pas contenir d'espaces.")
        if not re.search(r'[A-Z]', password):
            errors.append("Le mot de passe doit contenir au moins une majuscule.")
        if not re.search(r'[a-z]', password):
            errors.append("Le mot de passe doit contenir au moins une minuscule.")
        if not re.search(r'[0-9]', password):
            errors.append("Le mot de passe doit contenir au moins un chiffre.")
        if not re.search(r'[^A-Za-z0-9\s]', password):
            errors.append("Le mot de passe doit contenir au moins un caractère spécial.")
        if errors:
            raise ValidationError(errors)

    def get_help_text(self):
        return "8 à 20 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."