
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Song } from '@/types';

export default function MusicPage() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    // Track which song's player is currently open
    const [activeSongId, setActiveSongId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchSongs() {
            const { data, error } = await supabase
                .from('songs')
                .select('*')
                .order('added_at', { ascending: false });

            if (error) {
                console.error('Error fetching songs:', error);
            } else {
                setSongs(data || []);
            }
            setLoading(false);
        }
        fetchSongs();
    }, []);

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const confirmDelete = window.confirm("Are you sure you want to remove this song?");
        if (!confirmDelete) return;

        const { error } = await supabase
            .from('songs')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting song');
        } else {
            setSongs(songs.filter(s => s.id !== id));
            if (activeSongId === id) setActiveSongId(null);
        }
    };

    const togglePlayer = (id: number) => {
        if (activeSongId === id) {
            setActiveSongId(null);
        } else {
            setActiveSongId(id);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans pb-32">

            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .vinyl-spin {
                    animation: spin 8s linear infinite;
                }
                .paused {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-16">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-hand text-[#2D2A26]">Our Playlist 🎵</h1>
                    </div>

                    <Link href="/music/new" className="text-sm font-medium hover:text-gray-600 transition uppercase tracking-widest border-b border-gray-300 pb-1 text-gray-800">
                        Add Song
                    </Link>
                </div>

                {loading ? (
                    <div className="text-gray-400 text-center py-12 italic font-hand text-xl">loading tunes...</div>
                ) : songs.length === 0 ? (
                    <div className="text-gray-400 text-center py-20 opacity-50">
                        <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 border-2 border-dashed border-gray-300"></div>
                        <p>No music added yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 row-gap-16">
                        {songs.map((song) => {
                            const isPlaying = activeSongId === song.id;

                            return (
                                <div key={song.id} className="group relative flex flex-col items-center">

                                    {/* Delete Button */}
                                    <button
                                        onClick={(e) => handleDelete(song.id, e)}
                                        className="absolute top-0 right-0 z-20 p-2 text-gray-300 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>

                                    {/* CD / Vinyl */}
                                    <div
                                        className="relative cursor-pointer mb-6"
                                        onClick={() => togglePlayer(song.id)}
                                    >
                                        <div className={`w-48 h-48 rounded-full shadow-xl relative overflow-hidden border-4 border-white bg-gray-100 mx-auto vinyl-spin ${isPlaying ? '' : 'paused'}`}>
                                            {song.cover_url ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={song.cover_url} alt="Cover" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400"></div>
                                            )}

                                            {/* Center Hole */}
                                            <div className="absolute inset-0 m-auto w-8 h-8 bg-white rounded-full shadow-inner border border-gray-100 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                                            </div>

                                            {/* Shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                                        </div>

                                        {/* Play Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform">
                                                {isPlaying ? <Pause className="w-8 h-8 text-gray-800" /> : <Play className="w-8 h-8 text-gray-800" />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metadata */}
                                    <div className="text-center w-full px-4">
                                        <h2 className="text-xl font-serif text-gray-900 font-bold truncate">{song.title}</h2>
                                        <p className="text-gray-500 font-sans text-xs mt-1 uppercase tracking-widest truncate">{song.artist}</p>
                                    </div>

                                    {/* Embed Player */}
                                    {isPlaying && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="w-full mt-6"
                                        >
                                            <div className="shadow-lg rounded-xl overflow-hidden border border-gray-100 bg-white">
                                                {song.embed_code ? (
                                                    <div dangerouslySetInnerHTML={{ __html: song.embed_code }} />
                                                ) : song.preview_url ? (
                                                    // Fallback for old preview URLs if any exist
                                                    <iframe
                                                        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                                                        frameBorder="0"
                                                        height="150"
                                                        style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent' }}
                                                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                                                        src={song.preview_url}
                                                    />
                                                ) : (
                                                    <div className="p-4 text-center text-red-400 text-xs">No preview available</div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
