from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255, blank=True, null=True)
    profile_image = models.TextField(blank=True, null=True)
    is_vendor = models.BooleanField(default=False)
