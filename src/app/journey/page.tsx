
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Pre-defined rotations to mimic the CSS nth-child logic
const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-4", "-rotate-2", "rotate-3"];

export default function JourneyPage() {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    const openModal = (month: string) => setSelectedMonth(month);
    const closeModal = () => setSelectedMonth(null);

    return (
        <div className="min-h-screen pb-24 font-sans text-gray-800 bg-[#FFF7F8]">
            <div className="max-w-5xl mx-auto px-4 pt-8">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/" className="text-gray-400 hover:text-gray-600 transition p-2 rounded-full hover:bg-gray-100">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-4xl font-hand text-gray-800 text-[#DB2955]">Our Journey</h1>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 p-4">
                    {months.map((month, index) => (
                        <div
                            key={month}
                            onClick={() => openModal(month.toLowerCase())}
                            className={`relative cursor-pointer group transition-all duration-300 hover:scale-[1.08] hover:rotate-0 hover:z-20 hover:shadow-2xl ${rotations[index % rotations.length]}`}
                        >
                            {/* Tape Effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 shadow-sm rotate-2 backdrop-blur-sm pointer-events-none z-10" />

                            {/* Polaroid Container */}
                            <div className="bg-white p-3 md:p-4 pb-8 md:pb-12 shadow-md transition-shadow border-t border-white/50">
                                <div className="aspect-square bg-gray-100 overflow-hidden mb-3 relative">
                                    {/* Using standard img tag for simplicity with dynamic paths or explicit check */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`/images/journey/${month.toLowerCase()}.png`}
                                        alt={month}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                            (e.target as HTMLImageElement).nextElementSibling?.classList.add('flex');
                                        }}
                                    />

                                    {/* Fallback */}
                                    <div className="hidden w-full h-full flex-col items-center justify-center text-gray-300 bg-gray-50 border-2 border-dashed border-gray-200">
                                        <span className="text-3xl mb-1 opacity-50">✨</span>
                                        <span className="text-xs">no memory yet</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-2 md:bottom-4 left-0 right-0 text-center">
                                    <span className="font-hand text-xl md:text-2xl font-bold text-gray-700">
                                        {month}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedMonth && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
                    onClick={closeModal}
                >
                    <button onClick={closeModal} className="absolute top-6 right-6 text-white/70 hover:text-white z-20 p-2">
                        <span className="text-4xl">&times;</span>
                    </button>

                    <motion.div
                        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        className="relative max-w-5xl max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`/images/journey/${selectedMonth}.png`}
                            alt={selectedMonth}
                            className="max-h-[85vh] max-w-full object-contain rounded-md shadow-2xl ring-1 ring-white/10"
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
}
