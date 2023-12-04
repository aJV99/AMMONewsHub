from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages


from .models import User, Profile
from .forms import CustomUserCreationForm, CustomUserLoginForm

def main_spa(request: HttpRequest) -> HttpResponse:
    return render(request, 'api/spa/index.html', {})

#LOGIN VIEW
# def loginUser(request):
#     page='login'
#     if request.user.is_authenticated:
#         return redirect('api:main')
    
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']

#         try:
#             #Check that this user exists
#             user = User.objects.get(username=username)
#         except:
#             messages.error(request, 'Username does not exist')

#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user) #Create the session for the user in the db and in browser's cookies
#             return redirect('api:main')
#         else:
#             messages.error(request, 'Username OR Password does not exist')

#     return render(request, 'api/spa/login_register.html')

def loginUser(request):
    page = 'login'
    form = CustomUserLoginForm()

    if request.method == 'POST':
        form = CustomUserLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                print("User authenticated: ", user)
                login(request, user)
                print("User logged in: ", request.user)
                return redirect('api:main')
            else:
                messages.error(request, 'Username OR Password does not exist')
        else:
            print("Form is not valid: ", form.errors)
    else:
        form = CustomUserLoginForm()
            
    return render(request, 'api/spa/login_register.html', {'form': form})

#LOGOUT VIEW
def logoutUser(request):
    logout(request)
    messages.error(request, 'User was successfully logged out')
    return redirect('api:login')


#REGISTER VIEW
def registerUser(request):
    page = 'register'
    form = CustomUserCreationForm()

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()

            messages.success(request, 'User account was created!')

            login(request, user)
            return redirect('api:main')
        
        else:
            messages.error(request, 'An error has occurred during registration.')

    context = {
        'page': page,
        'form': form,
    }

    return render(request, 'api/spa/login_register.html', context)


#PROFILES VIEW
# def profiles(request):
#     profiles = Profile.objects.all()
#     context = {
#         'profiles' : profiles,
#     }
#     return render(request, '')
