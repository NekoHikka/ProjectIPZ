import os
import json
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth.models import User
from .models import Profile
from api.serializers import ProfileSerializer

def update_profiles_json():
    file_path = os.path.join(settings.BASE_DIR, "user_profiles.json")
    all_profiles = Profile.objects.all()
    serializer = ProfileSerializer(all_profiles, many=True)

    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(serializer.data, file, indent=4, ensure_ascii=False)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, username=instance.username)

@receiver(post_save, sender=Profile)
def sync_user_and_save_json(sender, instance, created, **kwargs):
    user = instance.user
    if instance.username and user.username != instance.username:
        user.username = instance.username
        user.save(update_fields=['username'])
    update_profiles_json()

@receiver(post_delete, sender=Profile)
def delete_profile_from_json(sender, instance, **kwargs):
    update_profiles_json()
