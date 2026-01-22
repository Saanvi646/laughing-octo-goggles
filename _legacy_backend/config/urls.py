"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from core import views as core_views
from django.shortcuts import redirect

urlpatterns = [
    path('', lambda request: redirect('login')),
    path('admin/', admin.site.urls),
    path('login/', core_views.login_view, name='login'),
    path('logout/', core_views.logout_view, name='logout'),
    path('enter/', core_views.enter, name='enter'),
    path('home/', core_views.home, name='home'),
    path('journey/', core_views.journey, name='journey'),
    path('journey/', core_views.journey, name='journey'),
    path('letters/', include('letters.urls')),
    path('music/', include('music.urls')),
    path('promises/', include('promises.urls')),
]

from django.urls import re_path
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', core_views.serve_media),
]