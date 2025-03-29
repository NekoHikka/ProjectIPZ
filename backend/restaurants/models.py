from django.db import models
from users.models import Profile

class Vendor(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to='vendor_logos/', blank=True, null=True, default='images/default.jpg')  # Путь к static
    

    def __str__(self):
        return self.name

class Menu(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='menu/', blank=True, null=True, default='images/default.jpg')  # Путь к static

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='menu_items/', blank=True, null=True, default='images/default.jpg')  # Путь к static

    def __str__(self):
        return self.name
