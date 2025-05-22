from django.urls import path
from . import views

urlpatterns = [
    path('', views.vendor_list, name='main'), 
    path('restaurant/<int:vendor_id>/', views.vendor_detail, name='vendor-detail'),
]
