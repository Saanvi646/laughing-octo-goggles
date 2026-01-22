
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Letter } from '@/types';
// eslint-disable-next-line @next/next/no-img-element
import Image from 'next/image';

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

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (!confirmDelete) return;

        const { error } = await supabase
            .from('letters')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting letter');
        } else {
            setLetters(letters.filter(l => l.id !== id));
        }
    };

    // Pre-defined rotations to mimic the "cycle" logic
    const rotations = ["-rotate-1", "rotate-1", "-rotate-0", "rotate-2"];

    return (
        <div className="min-h-screen bg-[#FFF7F8] p-8 pt-16 font-sans pb-24">
            <div className="max-w-4xl mx-auto">

                {/* Top Nav */}
                <div className="flex justify-between items-center mb-12">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> back home
                    </Link>
                    <Link href="/letters/new" className="bg-[#2D2A26] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black transition shadow-sm">
                        + add note
                    </Link>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-hand text-[#2D2A26] mb-12 text-center md:text-left">
                    things i want to say
                </h1>

                {loading ? (
                    <div className="text-gray-400 text-center py-12 italic font-hand text-xl">loading notes...</div>
                ) : letters.length === 0 ? (
                    <div className="text-gray-400 text-center py-16 font-hand text-xl">nothing said yet...</div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {letters.map((letter, index) => (
                            <div
                                key={letter.id}
                                className={`relative group bg-white rounded-xl border border-gray-200 p-1 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:rotate-0 hover:z-10 ${rotations[index % rotations.length]}`}
                            >
                                <Link href={`/letters/${letter.id}`} className="flex flex-row items-stretch h-32 md:h-36 gap-4 p-4">

                                    {/* Image */}
                                    <div className="w-28 shrink-0 relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                        {letter.cover_image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={letter.cover_image} alt="cover" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl opacity-50">📝</span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-center min-w-0">
                                        <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800 truncate pr-8 mb-1">
                                            {letter.title}
                                        </h2>
                                        <p className="text-gray-500 font-hand text-lg leading-tight line-clamp-2">
                                            {letter.content}
                                        </p>

                                        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-gray-400 font-sans uppercase tracking-wider">
                                            <span>{new Date(letter.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                            <div className="flex items-center gap-2">
                                                <span>by {letter.author}</span>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={`/images/${letter.author?.toLowerCase() || 'pari'}.jpg`}
                                                    className="w-5 h-5 rounded-full object-cover"
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => handleDelete(letter.id, e)}
                                    className="absolute top-2 right-2 z-20 p-2 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
