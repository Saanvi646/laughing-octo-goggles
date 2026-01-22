
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line @next/next/no-img-element
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (username: string) => {
        // Basic conceptual login - in a real app this would set a cookie/token
        // For now, we just redirect to home
        router.push('/');
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">

            {/* Background */}
            <div
                className="fixed inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: "url('/images/backdrop.png')",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '512px',
                }}
            />
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-0" />

            <div className="relative z-10 w-full max-w-2xl">
                {/* Intro Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 space-y-2"
                >
                    <h1 className="text-5xl md:text-6xl font-hand text-[#2D2A26]">
                        hey, this is just for us
                    </h1>
                    <p className="text-gray-500 font-sans tracking-wide text-sm uppercase">
                        a shared space for our memories
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Pari */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => handleLogin('pari')}
                        className="group relative text-left w-full"
                    >
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex flex-col items-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-[#B98389] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/pari.jpg"
                                    alt="Pari"
                                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
                                />
                            </div>

                            <h2 className="text-2xl font-serif text-gray-800 mb-2">Pari</h2>
                            <span className="px-4 py-1 bg-gray-50 text-gray-400 text-xs rounded-full uppercase tracking-widest group-hover:bg-[#B98389] group-hover:text-white transition">
                                Tap to Enter
                            </span>
                        </div>
                    </motion.button>

                    {/* Saanvi */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => handleLogin('saanvi')}
                        className="group relative text-left w-full"
                    >
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex flex-col items-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-[#DB2955] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/saanvi.jpg"
                                    alt="Saanvi"
                                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
                                />
                            </div>

                            <h2 className="text-2xl font-serif text-gray-800 mb-2">Saanvi</h2>
                            <span className="px-4 py-1 bg-gray-50 text-gray-400 text-xs rounded-full uppercase tracking-widest group-hover:bg-[#DB2955] group-hover:text-white transition">
                                Tap to Enter
                            </span>
                        </div>
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
