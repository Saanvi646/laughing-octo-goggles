
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Heart, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PromiseItem } from '@/types';

export default function PromisesPage() {
    const [promises, setPromises] = useState<PromiseItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPromises() {
            const { data, error } = await supabase
                .from('promises')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching promises:', error);
            } else {
                setPromises(data || []);
            }
            setLoading(false);
        }
        fetchPromises();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this promise?");
        if (!confirmDelete) return;

        const { error } = await supabase
            .from('promises')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting promise');
        } else {
            setPromises(promises.filter(p => p.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-gray-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-hand font-bold text-[#DB2955]">Promises</h1>
                        <Heart className="w-6 h-6 text-[#DB2955] fill-[#DB2955]" />
                    </div>
                    <Link href="/promises/new" className="px-4 py-2 bg-[#DB2955] text-white rounded-full text-sm font-bold shadow-md hover:bg-[#b01e40] transition">
                        + New Promise
                    </Link>
                </div>

                {loading ? (
                    <div className="text-gray-400 text-center py-12 italic">loading your promises...</div>
                ) : promises.length === 0 ? (
                    <div className="text-gray-400 text-center py-12 italic">no promises yet... make one?</div>
                ) : (
                    <div className="space-y-6">
                        {promises.map((promise, index) => (
                            <motion.div
                                key={promise.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-2xl flex items-start gap-4 hover:shadow-md transition-shadow"
                            >
                                <div className={`mt-1 p-1 rounded-full ${promise.is_fulfilled ? 'text-green-500' : 'text-gray-300'}`}>
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-start w-full">
                                        <h3 className="text-xl font-medium text-gray-800 mb-2">{promise.title}</h3>
                                        <button
                                            onClick={() => handleDelete(promise.id)}
                                            className="text-gray-400 hover:text-red-500 transition p-1 ml-4"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed font-serif italic">{promise.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
