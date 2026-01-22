
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Heart } from 'lucide-react';
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

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-gray-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <h1 className="text-4xl font-hand font-bold text-[#DB2955]">Promises</h1>
                    <Heart className="w-6 h-6 text-[#DB2955] fill-[#DB2955]" />
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
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">{promise.title}</h3>
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
