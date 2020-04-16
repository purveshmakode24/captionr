from django.urls import path
from captionr_app import views

urlpatterns = [
    path('', views.home, name='home'),
]
