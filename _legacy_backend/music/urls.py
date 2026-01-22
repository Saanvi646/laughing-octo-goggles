from django.urls import path
from . import views

urlpatterns = [
    path('', views.music_list, name='music_list'),
    path('add/', views.add_song, name='add_song'),
    path('<int:id>/edit/', views.edit_song, name='edit_song'),
    path('<int:id>/delete/', views.delete_song, name='delete_song'),
]
