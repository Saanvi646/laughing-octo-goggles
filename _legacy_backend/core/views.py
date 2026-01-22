from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache



@login_required
def home(request):
    return render(request, 'home.html')

@login_required
def journey(request):
    months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return render(request, 'journey.html', {'months': months})

@never_cache
def enter(request):
    if request.user.is_authenticated:
        return redirect('home')
        
    username = request.GET.get('username')
    if not username:
        return redirect('login')
        
    return render(request, 'enter.html', {
        'selected_username': username
    })

@never_cache
def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')

    error = None
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            error = True
            # If login failed, stay on the password page (enter.html)
            return render(request, 'enter.html', {
                'error': error,
                'selected_username': username
            })

    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')


from django.http import FileResponse, Http404
import os
from django.conf import settings

def serve_media(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'))
    raise Http404
