from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Song
from .forms import SongForm

@login_required
def music_list(request):
    songs = Song.objects.order_by('-added_at')
    return render(request, 'music/list.html', {'songs': songs})

@login_required
def add_song(request):
    if request.method == 'POST':
        form = SongForm(request.POST, request.FILES)
        if form.is_valid():
            song = form.save(commit=False)
            song.added_by = request.user
            song.save()
            return redirect('music_list')
    else:
        form = SongForm()
    return render(request, 'music/add.html', {'form': form})

from django.shortcuts import get_object_or_404
@login_required
@login_required
def delete_song(request, id):
    song = get_object_or_404(Song, id=id)
    if request.method == 'POST':
        song.delete()
    return redirect('music_list')

@login_required
def edit_song(request, id):
    song = get_object_or_404(Song, id=id)
    if request.method == 'POST':
        form = SongForm(request.POST, request.FILES, instance=song)
        if form.is_valid():
            form.save()
            return redirect('music_list')
    else:
        form = SongForm(instance=song)
    return render(request, 'music/edit.html', {'form': form, 'song': song})
