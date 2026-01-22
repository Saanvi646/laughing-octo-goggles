
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewPromisePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('promises')
            .insert([formData]);

        if (error) {
            alert('Error creating promise: ' + error.message);
            setLoading(false);
        } else {
            router.push('/promises');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans">
            <div className="max-w-2xl mx-auto">
                <Link href="/promises" className="inline-flex items-center text-gray-400 hover:text-gray-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Promises
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <h1 className="text-3xl font-hand font-bold text-[#DB2955] mb-6">Make a Promise</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Promise Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition"
                                placeholder="e.g. Always be there"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description / Details</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#DB2955] focus:border-transparent outline-none transition font-hand text-lg"
                                placeholder="I promise to..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#DB2955] text-white py-3 rounded-xl font-bold hover:bg-[#b01e40] transition flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Promise</>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
