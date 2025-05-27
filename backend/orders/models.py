from django.db import models
from django.contrib.auth.models import User
from restaurants.models import Vendor, MenuItem
import uuid

class Order(models.Model):

    ORDER_STATUS_CHOICES = [
        ('new', 'Новий'),
        ('ready', 'Готово')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
  
    
    order_code = models.CharField(max_length=12, unique=True, editable=False, blank=True)

    def save(self, *args, **kwargs):
        if not self.order_code:
            self.order_code = uuid.uuid4().hex[:12].upper()  # напр. 'A1B2C3D4E5F6'
        super().save(*args, **kwargs)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price_at_order = models.DecimalField(max_digits=10, decimal_places=2)
