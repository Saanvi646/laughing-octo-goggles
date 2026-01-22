
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Music } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Song } from '@/types';

export default function MusicPage() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState<number | null>(null);

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

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-gray-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-hand font-bold text-[#DB2955] mb-8"
                >
                    Our Playlist
                </motion.h1>

                {loading ? (
                    <div className="text-gray-400 text-center py-12 italic">loading your tunes...</div>
                ) : songs.length === 0 ? (
                    <div className="text-gray-400 text-center py-12 italic">no songs yet... time to add some?</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {songs.map((song, index) => (
                            <motion.div
                                key={song.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl hover:bg-white/90 hover:shadow-xl transition-all group"
                            >
                                <div className="aspect-square bg-gray-100 rounded-xl mb-4 relative overflow-hidden shadow-inner flex items-center justify-center">
                                    {song.cover_url ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={song.cover_url} alt={song.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Music className="w-12 h-12 text-gray-300" />
                                    )}

                                    <button
                                        onClick={() => setPlaying(playing === song.id ? null : song.id)}
                                        className="absolute inset-0 bg-black/10 hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <div className="bg-white rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                            {playing === song.id ? <Pause className="w-6 h-6 text-[#DB2955]" /> : <Play className="w-6 h-6 text-[#DB2955]" />}
                                        </div>
                                    </button>
                                    {/* Simplified Audio Player Logic would go here */}
                                </div>
                                <h3 className="font-serif font-semibold text-gray-800 text-lg truncate">{song.title}</h3>
                                <p className="text-sm text-gray-500 truncate">{song.artist}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
