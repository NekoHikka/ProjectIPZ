from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import VendorSerializer,MenuSerializer, MenuItemSerializer, ProfileSerializer
from restaurants.models import Vendor, MenuItem, Menu
from users.models import Profile
from rest_framework import status
import logging
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
logger = logging.getLogger("django")


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

        {'GET': '/api/profile'},  
        {'PUT': '/api/profile'},  
        {'PUT': '/api/profile/location'},  

        {'POST':'/api/register'},
        {'GET':'/api/testErrorView'},

        {'GET':'/api/vendors/has-changed?since=<timestamp>'},
    ]

    return Response(routes)

@api_view(['POST'])
def register_user_api(request):
    data = request.data

    required_fields = ['username', 'password', 'email']
    if not all(field in data for field in required_fields):
        return Response({'error': 'необхідні поля: username, password, email'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=data['username'].lower()).exists():
        return Response({'error': 'Користувач з таким username вже є'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=data['username'].lower(),
        email=data['email'],
        password=make_password(data['password'])
    )
    profile = user.profile
    profile.save()

    serializer = ProfileSerializer(profile)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_detail(request):
    profile = request.user.profile  

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
def getMenuItem(request, pk): 
    try:
        menu_item = MenuItem.objects.get(id=pk)
    except MenuItem.DoesNotExist:
        return Response({"error": "MenuItem not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = MenuItemSerializer(menu_item, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def testErrorView(request):
    raise ValueError("Це тестова помилка!")

@api_view(['GET'])
def hasVendorsChanged(request):
    since = request.GET.get('since')
    if since:
        try:
            from datetime import datetime
            from django.utils.dateparse import parse_datetime
            since_dt = parse_datetime(since)
        except Exception:
            return Response({"error": "Invalid date"}, status=400)
        changed = Vendor.objects.filter(updated_at__gt=since_dt).exists()
    else:
        changed = True  
    return Response({"vendors_changed": changed, "timestamp": now().isoformat()})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_location_api(request):
    profile = request.user.profile
    location = request.data.get('location')

    if location:
        profile.location = location
        profile.save()
        return Response({'message': 'Location updated', 'location': profile.location})
    else:
        return Response({'error': 'Location is required'}, status=status.HTTP_400_BAD_REQUEST)

