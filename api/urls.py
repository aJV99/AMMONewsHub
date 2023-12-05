from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse

from . import views

app_name = 'api'

urlpatterns = [
    path('main/', views.main_spa, name="main"),
    path('login/', views.loginUser, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('', views.registerUser, name="register"),
    path('profile/', views.get_profile, name='get_profile'),
]
