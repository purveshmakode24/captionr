from django.urls import path
from  .views import  image_view
from captionr_app import views

urlpatterns = [
    path('', image_view, name = 'home'),
    # path('', home, name='home'),
]
