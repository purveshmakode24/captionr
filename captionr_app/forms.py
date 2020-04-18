from django import forms
from .models import *


class ImageForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['img'].widget.attrs.update({'id': 'idImageUploadField'})

    class Meta:
        model = Caption_Predictor
        fields = ['img']
        # widgets = {'img': forms.HiddenInput()}


# class ImageForm(forms.Forms):
#     img = forms.ImageField(required='true', widget=forms.FileInput(attrs={'id':idImageUploadField}))

# class ImageForm(forms.Form):
#     img = forms.ImageField(widget=forms.FileInput(attrs={'id':"idImageUploadField"}))