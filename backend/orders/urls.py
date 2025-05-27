from django.urls import path
from . import views
from .views import create_order

urlpatterns = [
    path('', views.list_orders),
    path('create/', views.create_order),
]
