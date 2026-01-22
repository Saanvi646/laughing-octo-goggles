from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Letter
from .forms import LetterForm

@login_required
def letters_list(request):
    letters = Letter.objects.order_by('-created_at')
    return render(request, 'letters/list.html', {'letters': letters})

@login_required
def letter_detail(request, id):
    letter = get_object_or_404(Letter, id=id)
    return render(request, 'letters/detail.html', {'letter': letter})

@login_required
def add_letter(request):

    if request.method == 'POST':
        form = LetterForm(request.POST, request.FILES)
        if form.is_valid():
            letter = form.save(commit=False)
            letter.author = request.user
            letter.save()
            return redirect('letters')
    else:
        form = LetterForm()

    return render(request, 'letters/add.html', {'form': form})

@login_required
def delete_letter(request, id):
    letter = get_object_or_404(Letter, id=id)
    if request.method == 'POST':
        letter.delete()
    return redirect('letters')