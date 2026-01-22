'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewSongPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        cover_url: '',
        embed_code: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `music_covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading image: ' + uploadError.message);
            setUploading(false);
        } else {
            // Get public URL
            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setFormData({ ...formData, cover_url: data.publicUrl });
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('songs')
            .insert([{
                title: formData.title,
                artist: formData.artist,
                cover_url: formData.cover_url,
                embed_code: formData.embed_code
                // preview_url is deliberately omitted as we are moving away from it
            }]);

        if (error) {
            alert('Error creating song: ' + error.message);
            setLoading(false);
        } else {
            router.push('/music');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans">
            <div className="max-w-2xl mx-auto">
                <Link href="/music" className="inline-flex items-center text-gray-400 hover:text-gray-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Playlist
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <h1 className="text-3xl font-hand font-bold text-[#DB2955] mb-6">Add a Song</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Song Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
                            <input
                                type="text"
                                name="artist"
                                required
                                value={formData.artist}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                            <div className="flex items-center gap-4">
                                <label className="flex-1 cursor-pointer">
                                    <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#DB2955] transition flex items-center justify-center gap-2 text-gray-500 hover:text-[#DB2955]">
                                        {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
                                        <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Click to Upload Album Art'}</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                            {formData.cover_url && (
                                <div className="mt-3 relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mx-auto">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={formData.cover_url} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Apple Music Embed Code (Optional)</label>
                            <textarea
                                name="embed_code"
                                value={formData.embed_code}
                                onChange={handleChange}
                                placeholder='<iframe allow="autoplay *; encrypted-media *..." ...></iframe>'
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition h-24 font-mono text-xs"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="w-full bg-[#DB2955] text-white py-3 rounded-xl font-bold hover:bg-[#b01e40] transition flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Song</>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
