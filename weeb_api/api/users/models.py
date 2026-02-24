from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.utils import timezone
from datetime import timedelta

class CustomUser(AbstractUser):
    """
    Custom User Model
    with email field unique and mandatory
    """
    # remove username field
    username = None

    first_name = models.CharField("prénom", max_length=50, blank = False, null = False, help_text="Prénom de l'utilisateur requis.")
    last_name = models.CharField("nom de famille", max_length=50, blank = False, null = False, help_text="Nom de famille de l'utilisateur requis.")
    email = models.EmailField("addresse email", unique=True, help_text="L'adresse email valide est requise pour l'identification.")

    # should be cehcked by admin to validate new account
    is_active = models.BooleanField(
        "actif",
        default=False,
        help_text="Cochez cette case pour autoriser l'utilisateur à se connecter et publier."
    )

    # email is defined as unique id
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    # link to custom manager
    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

class PasswordResetCode(models.Model):
    """
    PasswordResetCode Model
    for forgotten password when user is not connected
    code with 15mn expiration time
    """
    user = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name="reset_codes"
    )
    code = models.CharField("code de validation", max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField("utilisé", default=False)

    class Meta:
        verbose_name = "Code de réinitialisation"
        ordering = ['-created_at']

    def __str__(self):
        return f"Code {self.code} pour {self.user.email}"

    @property
    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=15)