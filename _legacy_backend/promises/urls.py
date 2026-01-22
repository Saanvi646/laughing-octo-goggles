from django.urls import path
from . import views

urlpatterns = [
    path('', views.promises_list, name='promises_list'),
    path('add/', views.add_promise, name='add_promise'),
]
