from django.db import models
from django.conf import settings

class Review(models.Model):
    """
    Review Model
    with author as FK if is member
    """
    first_name = models.CharField("prénom", max_length=50, blank = False, null = False, help_text="Prénom de l'utilisateur requis.")
    last_name = models.CharField("nom de famille", max_length=50, blank = False, null = False, help_text="Nom de famille de l'utilisateur requis.")
    email = models.EmailField("adresse email", help_text="L'adresse email valide est requise pour l'identification.")
    subject = models.CharField("sujet", max_length=150)
    message = models.TextField("message")

    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="auteur (membre)", on_delete=models.SET_NULL, null=True, blank=True, related_name='reviews')

    is_processed = models.BooleanField("traité", default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} de {self.first_name} {self.last_name} ({self.email})"