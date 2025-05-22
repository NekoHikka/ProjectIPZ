import json, os
from django.conf import settings
from rest_framework import serializers
from restaurants.models import Vendor, MenuItem, Menu, Category
from users.models import Profile


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class MenuSerializer(serializers.ModelSerializer):
    vendor = VendorSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = '__all__'


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

class MenuWithItemsSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ['id', 'name', 'image', 'categories', 'items']

    def get_items(self, obj):
        items = MenuItem.objects.filter(menu=obj)
        return MenuItemSerializer(items, many=True).data

class VendorDetailSerializer(serializers.ModelSerializer):
    menus = serializers.SerializerMethodField()

    class Meta:
        model = Vendor
        fields = ['id', 'name', 'description', 'logo', 'menus']

    def get_menus(self, obj):
        menus = Menu.objects.filter(vendor=obj)
        return MenuWithItemsSerializer(menus, many=True).data

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Profile
        fields = ['username', 'location', 'profile_image']

    def save(self, **kwargs):
        super().save(**kwargs)
        self.save_to_json()

    def save_to_json(self):
        file_path = os.path.join(settings.BASE_DIR, "user_profiles.json")
        all_profiles = Profile.objects.all()
        serializer = ProfileSerializer(all_profiles, many=True)
        with open(file_path, "w", encoding="utf-8") as file:
            json.dump(serializer.data, file, indent=4, ensure_ascii=False)
