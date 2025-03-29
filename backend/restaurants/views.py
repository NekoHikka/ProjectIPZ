from django.shortcuts import render
from .models import Vendor, Menu, MenuItem

def vendor_list(request):
    # Отримуємо всі ресторани
    vendors = Vendor.objects.all()

    # Отримуємо меню та пункти меню для кожного ресторану
    for vendor in vendors:
        vendor.menus = Menu.objects.filter(vendor=vendor)
        for menu in vendor.menus:
            menu.items = MenuItem.objects.filter(menu=menu)

    # Передаємо в шаблон
    return render(request, 'main.html', {'vendors': vendors})

