from django.db import models
from django.contrib.auth.models import User

class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    apple_music_url = models.URLField(blank=True, null=True, help_text="Link to the song on Apple Music")
    cover_image = models.ImageField(upload_to='music_covers/', blank=True, null=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.artist}"

    def get_embed_url(self):
        if not self.apple_music_url: return ""
        try:
            url = self.apple_music_url
            if 'music.apple.com' in url:
                return url.replace('music.apple.com', 'embed.music.apple.com')
        except:
            return ""
        return ""
