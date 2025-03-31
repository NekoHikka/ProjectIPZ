from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import VendorSerializer,MenuSerializer, MenuItemSerializer, ProfileSerializer
from restaurants.models import Vendor, MenuItem, Menu
from users.models import Profile


@api_view(['GET'])
def getRouts(request):

    routes = [
        {'POST':'/api/users/token'},
        {'POST':'/api/users/token/refresh'},

        {'GET':'/api/restaurants'},
        {'GET':'/api/restaurants/id'},

        {'GET':'/api/menus'},
        {'GET':'/api/menus/id'},
        {'GET': '/api/menus?vendor_id=<vendor_id>'},

        {'GET':'/api/menuItems'},
        {'GET':'/api/menuItems/id'},
        {'GET': '/api/menuItems?menu_id=<menu_id>'},

    ]

    return Response(routes)
@api_view(['GET', 'PUT'])
def profile_detail(request):
    profile = request.user.profile  # Отримуємо профіль авторизованого користувача

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data, partial=True)  
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
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
    vendor_id = request.GET.get('vendor_id')
    if vendor_id:
        menus = Menu.objects.filter(vendor_id=vendor_id)
    else:
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
    menu_id = request.GET.get('menu_id')
    if menu_id:
        menuItems = MenuItem.objects.filter(menu_id=menu_id)
    else:
        menuItems = MenuItem.objects.all()

    serializer = MenuItemSerializer(menuItems, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMenuItem(request,pk): 
    menuItem = MenuItem.objects.get(id=pk)
    serializer = MenuItemSerializer(menuItem, many=False)
    return Response(serializer.data)


