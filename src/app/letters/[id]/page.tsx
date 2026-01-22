
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Letter } from '@/types';
// eslint-disable-next-line @next/next/no-img-element
import Image from 'next/image';

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

    return (
        <div className="min-h-screen relative font-sans overflow-hidden bg-[#FFF7F8]">

            {/* Dynamic Background */}
            {letter.cover_image && (
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110"
                        style={{ backgroundImage: `url(${letter.cover_image})` }}
                    />
                    <div className="absolute inset-0 bg-white/40" />
                </div>
            )}

            <div className="max-w-3xl mx-auto relative z-10 py-10 px-4">

                <Link href="/letters" className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full transition text-gray-500 hover:bg-black/5 hover:text-gray-900 bg-white/50 backdrop-blur-sm shadow-sm border border-white/40">
                    <ArrowLeft className="w-4 h-4" />
                    <span>back to collection</span>
                </Link>

                {/* Letter Paper */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-8 py-12 md:p-16 shadow-2xl relative mx-auto paper-texture bg-white/95 backdrop-blur-sm rounded-sm"
                >
                    {/* Fold effect */}
                    <div className="absolute top-0 right-0 border-t-[40px] border-r-[40px] border-t-[#f3f4f6] border-r-transparent shadow-sm opacity-50" />

                    <header className="mb-10 text-center">
                        {/* Cover Image in Header if exists */}
                        {letter.cover_image && (
                            <div className="w-full h-64 mb-8 rounded-lg overflow-hidden shadow-inner relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={letter.cover_image}
                                    alt="Cover"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <h1 className="text-3xl md:text-5xl font-serif mb-4 text-gray-900">
                            {letter.title}
                        </h1>

                        <div className="flex items-center justify-center gap-2 text-sm opacity-60 text-gray-500 font-serif italic">
                            <time>
                                {new Date(letter.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                            <span>•</span>
                            <span>{letter.author}</span>
                        </div>
                    </header>

                    <div className="prose prose-lg prose-p:font-hand prose-p:text-2xl prose-p:leading-relaxed mx-auto max-w-none font-hand text-xl md:text-2xl whitespace-pre-line leading-loose text-gray-700 ">
                        {letter.content}
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                        <p className="font-serif italic text-gray-400 text-sm">
                            forever & always, <br />
                            <span className="not-italic font-bold text-gray-600 font-sans tracking-wide uppercase text-xs mt-1 block">{letter.author}</span>
                        </p>
                    </div>

                </motion.article>
            </div>
        </div>
    );
}
