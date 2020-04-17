from django import forms
from .models import *


class ImageForm(forms.ModelForm):
    class Meta:
        model = Caption_Predictor
        fields = ['img']