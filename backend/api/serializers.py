from rest_framework import serializers
from restaurants.models import Vendor, MenuItem, Menu

class VendorSerializer(serializers.ModelSerializer):
     class Meta:
        model = Vendor 
        fields = '__all__'

class MenuSerializer(serializers.ModelSerializer):
     class Meta:
        model = Menu 
        fields = '__all__'

class MenuItemSerializer(serializers.ModelSerializer):
     class Meta:
        model = MenuItem 
        fields = '__all__' 