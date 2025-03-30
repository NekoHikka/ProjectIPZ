from django.shortcuts import render
from .models import Vendor, Menu, MenuItem

def vendor_list(request):
    vendors = Vendor.objects.all()
    for vendor in vendors:
        vendor.menus = Menu.objects.filter(vendor=vendor)
        for menu in vendor.menus:
            menu.items = MenuItem.objects.filter(menu=menu)
    return render(request, 'main.html', {'vendors': vendors})

