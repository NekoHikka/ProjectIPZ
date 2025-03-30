from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, username=instance.username)

@receiver(post_save, sender=Profile)
def update_user_from_profile(sender, instance, created, **kwargs):
    user = instance.user
    if not created and user.username != instance.username:
        user.username = instance.username or user.username
        user.save(update_fields=['username']) 
