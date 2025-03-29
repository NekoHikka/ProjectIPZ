from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRouts),
    path('restaurants/', views.getVendors),
    path('restaurants/<str:pk>/', views.getVendor),
]
