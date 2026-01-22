
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Letter } from '@/types';

export default function LettersPage() {
    const [letters, setLetters] = useState<Letter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLetters() {
            const { data, error } = await supabase
                .from('letters')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching letters:', error);
            } else {
                setLetters(data || []);
            }
            setLoading(false);
        }

        fetchLetters();
    }, []);

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-gray-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-hand font-bold text-[#DB2955] mb-8"
                >
                    Letters
                </motion.h1>

                {loading ? (
                    <div className="text-gray-400 text-center py-12 italic">loading your letters...</div>
                ) : letters.length === 0 ? (
                    <div className="text-gray-400 text-center py-12 italic">no letters yet... maybe write one?</div>
                ) : (
                    <div className="grid gap-6">
                        {letters.map((letter, index) => (
                            <Link href={`/letters/${letter.id}`} key={letter.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-medium text-gray-800 group-hover:text-[#DB2955] transition-colors">{letter.title}</h2>
                                        <span className="text-xs text-gray-500">{new Date(letter.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed font-serif line-clamp-2">{letter.content}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
