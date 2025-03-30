from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import UserRegisterForm, ProfileForm
from django.contrib import messages


def loginUser(request):
    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, 'You have successfully logged in.')
            return redirect('main')  
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, "users/login.html")

def logoutUser(request):
    logout(request)
    messages.info(request, 'User was logged out!')
    return redirect('main') 

def registerUser(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid(): 
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            messages.success(request, 'Account was created')
            login(request, user)
            return redirect('login')  
        else:
            messages.error(request, 'error.')
    else:
        form = UserRegisterForm()

    return render(request, 'users/registration.html', {'form': form})

def editProfile(request):
    profile = request.user.profile  # Отримуємо профіль поточного юзера
    form = ProfileForm(instance=profile)

    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('main')  # Перенаправлення на сторінку профілю

    return render(request, 'users/profile_form.html', {'form': form})
