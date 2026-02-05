from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

# Create your models here.
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