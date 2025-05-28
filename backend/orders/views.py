from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer, OrderDetailSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    serializer = OrderSerializer(data=request.data, context={'request': request}) 
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

