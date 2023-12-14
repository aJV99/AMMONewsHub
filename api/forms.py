from django.forms import ModelForm
from django import forms
from django.contrib.auth.forms import UserCreationForm #Registration
from django.contrib.auth.forms import AuthenticationForm #Login

from django.contrib.auth import authenticate

from .models import Profile, User

class CustomUserCreationForm(UserCreationForm):
    '''
    Register form using 'UserCreationForm' provided by Django
    '''
    full_name = forms.CharField(required=True)
    date_of_birth = forms.DateField(
        required=True,
        widget=forms.DateInput(attrs={'type': 'date'})
    )
    class Meta:
        '''
        Using Meta class provide additional information like
        specifying the model where to save new user's info and
        specifying the fields that should be in the form
        '''
        model = User
        fields = ['full_name', 'date_of_birth', 'email', 'username', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
            profile = Profile.objects.create(
                user=user, 
                full_name=self.cleaned_data['full_name'], 
                date_of_birth=self.cleaned_data['date_of_birth']
            )
        return user



# class CustomUserLoginForm(AuthenticationForm):
#     '''
#     Login form using 'AuthenticationForm' provided by Django
#     '''
#     class Meta:
#         model = User
#         fields = ['username', 'password']

class CustomUserLoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

    # def clean(self):
    #     cleaned_data = super().clean()
    #     username = cleaned_data.get('username')
    #     password = cleaned_data.get('password')

    #     if username and password:
    #         user = authenticate(username=username, password=password)

    #         if not user or not user.is_active:
    #             raise forms.ValidationError("Invalid username or password")

    #     return cleaned_data

    