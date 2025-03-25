from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import UserRegisterForm
from django.contrib import messages

def home(request):
    return render(request, "home.html")  

def loginUser(request):
    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, 'You have successfully logged in.')
            return redirect('home')  
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, "users/login.html")

def logoutUser(request):
    logout(request)
    messages.info(request, 'User was logged out!')
    return redirect('home') 

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

