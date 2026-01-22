from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Promise
from .forms import PromiseForm

@login_required
def promises_list(request):
    promises = Promise.objects.order_by('-created_at')
    return render(request, 'promises/list.html', {'promises': promises})

@login_required
def add_promise(request):
    if request.method == 'POST':
        form = PromiseForm(request.POST)
        if form.is_valid():
            promise = form.save(commit=False)
            promise.promiser = request.user
            promise.save()
            return redirect('promises_list')
    else:
        form = PromiseForm()
    return render(request, 'promises/add.html', {'form': form})
