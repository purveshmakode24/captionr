from django.db import models

# Create your models here.


class Caption_Predictor(models.Model):
    img = models.ImageField(upload_to='images/')
    
