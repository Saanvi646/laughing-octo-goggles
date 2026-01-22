
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewLetterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        era: 'midnights',
        author: 'Saanvi',
        cover_image: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('letters')
            .insert([formData]);

        if (error) {
            alert('Error creating letter: ' + error.message);
            setLoading(false);
        } else {
            router.push('/letters');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans">
            <div className="max-w-2xl mx-auto">
                <Link href="/letters" className="inline-flex items-center text-gray-400 hover:text-gray-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <h1 className="text-3xl font-hand font-bold text-[#DB2955] mb-6">Write a Letter</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition"
                                placeholder="e.g. The First Hello"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Era (Theme)</label>
                            <select
                                name="era"
                                value={formData.era}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition bg-white"
                            >
                                <option value="midnights">Midnights (Dark Blue)</option>
                                <option value="red">Red (Soft Red)</option>
                                <option value="folklore">Folklore (Grey)</option>
                                <option value="lover">Lover (Pink)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <select
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition bg-white"
                            >
                                <option value="Saanvi">Saanvi</option>
                                <option value="Pari">Pari</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL (Optional)</label>
                            <input
                                type="url"
                                name="cover_image"
                                value={formData.cover_image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea
                                name="content"
                                required
                                rows={8}
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition font-hand text-lg"
                                placeholder="Dear..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#DB2955] text-white py-3 rounded-xl font-bold hover:bg-[#b01e40] transition flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Letter</>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
