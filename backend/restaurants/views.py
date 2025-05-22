from django.shortcuts import render, get_object_or_404
from .models import Vendor, Menu, MenuItem

def vendor_list(request):
    vendors = Vendor.objects.all()
    for vendor in vendors:
        vendor.menus = Menu.objects.filter(vendor=vendor)
        for menu in vendor.menus:
            menu.items = MenuItem.objects.filter(menu=menu)
    return render(request, 'main.html', {'vendors': vendors})

def vendor_detail(request, vendor_id):
    vendor = get_object_or_404(Vendor, id=vendor_id)
    menus = Menu.objects.filter(vendor=vendor)

    for menu in menus:
        menu.items = MenuItem.objects.filter(menu=menu)

    return render(request, 'vendor_detail.html', {
        'vendor': vendor,
        'menus': menus,
    })