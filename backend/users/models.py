from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255, blank=True, null=True)
    profile_image = models.ImageField(upload_to='users_profile_photo/', blank=True, null=True, default='images/default.jpg')
    is_vendor = models.BooleanField(default=False)
    username = models.CharField(max_length=200, blank=True, null=True)
    def __str__(self):
            return str(self.username)