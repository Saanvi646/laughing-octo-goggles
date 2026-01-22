from django.db import models
from django.contrib.auth.models import User

class Letter(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    cover_image = models.ImageField(upload_to='letter_covers/', blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title