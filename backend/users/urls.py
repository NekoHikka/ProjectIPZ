from django.urls import path
from . import views

urlpatterns = [
   
    path('registration/', views.registerUser, name='registration'),  
    path('login/', views.loginUser, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('edit-profile/', views.editProfile, name="edit-profile"),

]
