from rest_framework import serializers
from .models import Order, OrderItem
from restaurants.models import MenuItem, Vendor
from api.serializers import MenuItemSerializer, VendorSerializer

# OrderItem для створення замовлення (POST)
class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())

    class Meta:
        model = OrderItem
        fields = ['menu_item', 'quantity']

# OrderItem для виводу замовлення (GET)
class OrderItemReadSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['menu_item', 'quantity', 'price_at_order']

# Детальне представлення замовлення (GET)
class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemReadSerializer(many=True, read_only=True)
    vendor = VendorSerializer(read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    order_code = serializers.CharField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'vendor', 'items', 'total_price', 'created_at', 'order_code']

# Серіалізатор для створення замовлення (POST)
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    order_code = serializers.CharField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'vendor', 'items', 'total_price', 'created_at', 'order_code']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        vendor = validated_data.get('vendor')

        order = Order.objects.create(user=user, vendor=vendor, total_price=0)

        total_price = 0
        for item_data in items_data:
            menu_item = item_data['menu_item']
            
            if not menu_item.menu.filter(vendor=vendor).exists():
                raise serializers.ValidationError(f"Menu item '{menu_item}' не належить цьому ресторану.")
            
            quantity = item_data['quantity']
            price_at_order = menu_item.price
            total_price += price_at_order * quantity

            OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=quantity,
                price_at_order=price_at_order,
            )

        order.total_price = total_price
        order.save()
        return order
