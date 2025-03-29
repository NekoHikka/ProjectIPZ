
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import VendorSerializer
from restaurants.models import Vendor

@api_view(['GET'])
def getRouts(request):

    routes = [
        {'GET':'/api/restaurants'},
        {'GET':'/api/restaurants/id'},

        {'POST':'/api/users/token'},
        {'POST':'/api/users/token/refresh'},
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