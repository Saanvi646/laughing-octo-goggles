from music.models import Song

# Mock song objects with different URL types
urls = [
    "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=12345",
    "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
    "https://open.spotify.com/intl-es/track/4cOdK2wGLETKBW3PvgPWqT",
    "https://spotify.link/AbCdEfG"
]

print("Testing URL parsing:")
for u in urls:
    s = Song(spotify_url=u)
    print(f"Input: {u}")
    print(f"Output: {s.get_embed_url()}")
    print("-" * 20)
