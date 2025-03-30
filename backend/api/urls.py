from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRouts),
    path('restaurants/', views.getVendors),
    path('restaurants/<str:pk>/', views.getVendor),
    path('menus/', views.getMenus),
    path('menus/<str:pk>/', views.getMenu),
    path('menuItems/', views.getMenuItems),
    path('menuItems/<str:pk>/', views.getMenuItem),
]
