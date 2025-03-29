from rest_framework import serializers
from restaurants.models import Vendor

class VendorSerializer(serializers.ModelSerializer):
     class Meta:
        model = Vendor 
        fields = '__all__'