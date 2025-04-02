from rest_framework import serializers
from restaurants.models import Vendor, MenuItem, Menu
from users.models import Profile

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

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)  

    class Meta:
        model = Profile
        fields = ['username', 'location', 'profile_image']  