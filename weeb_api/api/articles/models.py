from django.db import models
from django.conf import settings

class Article(models.Model):
    """
    Article Model
    with author as FK
    """
    title = models.CharField("titre", max_length=150, help_text="Titre de l'article requis.")
    content = models.TextField("contenu", blank=True)
    image = models.ImageField("image", upload_to="articles/images", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="auteur", on_delete=models.CASCADE, related_name='articles')

    def __str__(self):
        return self.title