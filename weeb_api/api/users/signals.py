from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import CustomUser

@receiver(pre_save, sender=CustomUser)
def send_activation_email(sender, instance, **kwargs):
    if instance.pk:  # Si l'utilisateur existe déjà (pas une création)
        old_instance = CustomUser.objects.get(pk=instance.pk)
        
        # Si on passe de inactif à actif
        if not old_instance.is_active and instance.is_active:
            send_mail(
                subject="Votre compte est activé !",
                message=f"Bonjour {instance.first_name}, votre compte a été activé par l'administrateur."
                        f"Vous pouvez maintenant vous connecter ici : http://localhost:5173/login",
                from_email=None, # Utilise DEFAULT_FROM_EMAIL
                recipient_list=[instance.email],
                fail_silently=False,
            )