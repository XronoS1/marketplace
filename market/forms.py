from allauth.account.forms import SignupForm
from django.contrib.auth.models import Group
from django import forms
from .models import Product, Data, Comments


class BasicSignupForm(SignupForm):

    def save(self, request):
        user = super(BasicSignupForm, self).save(request)
        return user


class ProductForm(forms.ModelForm):

    class Meta:
        model = Product
        fields = [
            'name'
        ]


class DataCreateForm(forms.ModelForm):
    class Meta:
        model = Data
        fields = [
            'address',
            'phone'
        ]


RATE_CHOICES = [(i, str(i)) for i in range(1, 6)]


class CommentsCreateForm(forms.Form):
    rate = forms.TypedChoiceField(choices=RATE_CHOICES, coerce=int)
    comment = forms.CharField(max_length=50)
