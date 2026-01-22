
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Letter } from '@/types';

export default function LetterDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [letter, setLetter] = useState<Letter | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLetter() {
            const { data, error } = await supabase
                .from('letters')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching letter:', error);
            } else {
                setLetter(data);
            }
            setLoading(false);
        }

        if (id) {
            fetchLetter();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFF7F8] flex items-center justify-center font-sans text-gray-400 italic">
                loading memory...
            </div>
        );
    }

    if (!letter) {
        return notFound();
    }

    // Era-based styling logic
    const getEraStyles = (era: string) => {
        switch (era) {
            case 'midnights': return 'bg-slate-900 text-slate-200 shadow-indigo-500/20';
            case 'red': return 'bg-[#FFF5F5] text-gray-800';
            case 'folklore': return 'bg-[#F3F4F6] text-gray-800';
            default: return 'bg-[#FFF0F3] text-gray-800';
        }
    };

    const getBadgeStyles = (era: string) => {
        switch (era) {
            case 'midnights': return 'bg-slate-100 text-slate-600';
            case 'red': return 'bg-red-50 text-red-500';
            case 'folklore': return 'bg-gray-100 text-gray-500';
            default: return 'bg-pink-50 text-pink-500';
        }
    };

    const eraStyles = getEraStyles(letter.era);
    const badgeStyles = getBadgeStyles(letter.era);

    return (
        <div className={`min-h-screen py-10 px-4 transition-colors duration-500 ${letter.era === 'midnights' ? 'bg-slate-900' : 'bg-[#FFF7F8]'} font-sans`}>
            <div className="max-w-3xl mx-auto relative z-10">

                <Link href="/letters" className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full transition text-gray-500 hover:bg-black/5 hover:text-gray-900 bg-white/50 backdrop-blur-sm">
                    <ArrowLeft className="w-4 h-4" />
                    <span>back to collection</span>
                </Link>

                {/* Letter Paper */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`px-8 py-12 md:p-16 shadow-2xl relative mx-auto paper-texture ${eraStyles} bg-white`}
                >
                    {/* Fold effect */}
                    <div className="absolute top-0 right-0 border-t-[40px] border-r-[40px] border-t-[#f3f4f6] border-r-[#FFF7F8] shadow-sm" />

                    <header className="mb-10 text-center">
                        <span className={`inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full ${badgeStyles}`}>
                            {letter.era} Era
                        </span>

                        <h1 className="text-3xl md:text-5xl font-serif mb-2">
                            {letter.title}
                        </h1>

                        <time className="text-sm opacity-60">
                            {new Date(letter.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                    </header>

                    <div className="prose prose-lg prose-p:font-hand prose-p:text-2xl prose-p:leading-relaxed mx-auto max-w-none font-hand text-xl md:text-2xl whitespace-pre-line leading-loose text-gray-700">
                        {letter.content}
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                        <p className="font-serif italic text-gray-400 text-sm">
                            forever & always, <br />
                            <span className="not-italic font-bold text-gray-600">{letter.author}</span>
                        </p>
                    </div>

                </motion.article>
            </div>
        </div>
    );
}
