from django.urls import path
from . import views

urlpatterns = [
    path('', views.letters_list, name='letters'),
    path('add/', views.add_letter, name='add_letter'),
    path('<int:id>/', views.letter_detail, name='letter_detail'),
    path('<int:id>/delete/', views.delete_letter, name='delete_letter'),
]