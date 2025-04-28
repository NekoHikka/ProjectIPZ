from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import hasVendorsChanged
urlpatterns = [
    path('users/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/', views.register_user_api, name='register_api'),

    path('', views.getRouts),
    path('restaurants/', views.getVendors),
    path('restaurants/<str:pk>/', views.getVendor),
    path('menus/', views.getMenus),
    path('menus/<str:pk>/', views.getMenu),
    path('menuItems/', views.getMenuItems),
    path('menuItems/<str:pk>/', views.getMenuItem),
    path('profile/', views.profile_detail, name='profile-detail'),
    path('api/vendors/has-changed/', hasVendorsChanged, name='vendors-has-changed'),

    
    path('testErrorView/', views.testErrorView),
]
