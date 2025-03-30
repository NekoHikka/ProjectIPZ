from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import VendorSerializer,MenuSerializer, MenuItemSerializer
from restaurants.models import Vendor, MenuItem, Menu

@api_view(['GET'])
def getRouts(request):

    routes = [
        {'POST':'/api/users/token'},
        {'POST':'/api/users/token/refresh'},

        {'GET':'/api/restaurants'},
        {'GET':'/api/restaurants/id'},

        {'GET':'/api/menus'},
        {'GET':'/api/menus/id'},

        {'GET':'/api/menuItems'},
        {'GET':'/api/menuItems/id'},
    ]

    return Response(routes)

@api_view(['GET'])
def getVendors(request): 
    vendors = Vendor.objects.all()
    serializer = VendorSerializer(vendors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getVendor(request,pk): 
    vendors = Vendor.objects.get(id=pk)
    serializer = VendorSerializer(vendors, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getMenus(request): 
    menus = Menu.objects.all()
    serializer = MenuSerializer(menus, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMenu(request,pk): 
    menu = Menu.objects.get(id=pk)
    serializer = MenuSerializer(menu, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getMenuItems(request): 
    menuItems = MenuItem.objects.all()
    serializer = MenuItemSerializer(menuItems, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMenuItem(request,pk): 
    menuItem = MenuItem.objects.get(id=pk)
    serializer = MenuItemSerializer(menuItem, many=False)
    return Response(serializer.data)