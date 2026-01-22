
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line @next/next/no-img-element
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleProfileClick = (username: string) => {
        setSelectedUser(username);
        setPassword('');
        setError(null);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        setLoading(true);
        setError(null);

        // Hardcoded email mapping for simplicity. 
        // You should create these users in Supabase Auth.
        const email = `${selectedUser}@birthday.com`;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.refresh(); // Refresh to update middleware state
            router.push('/');
        }
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

                {!selectedUser ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Pari */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => handleProfileClick('pari')}
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
                            onClick={() => handleProfileClick('saanvi')}
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
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                    >
                        <div className="flex flex-col items-center mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`/images/${selectedUser}.jpg`}
                                alt={selectedUser}
                                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm mb-4"
                            />
                            <h2 className="text-xl font-serif text-gray-800 capitalize">
                                Welcome back, {selectedUser}
                            </h2>
                            <p className="text-xs text-gray-400 mt-1">Please enter your secret code</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DB2955] focus:ring-1 focus:ring-[#DB2955] outline-none text-center text-lg tracking-widest transition-all text-gray-800 placeholder-gray-300"
                                autoFocus
                            />

                            {error && <p className="text-red-500 text-xs">{error}</p>}

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedUser(null)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition font-medium text-sm"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 rounded-xl bg-[#DB2955] text-white hover:bg-[#b01e40] transition font-medium text-sm shadow-md disabled:opacity-50 flex items-center justify-center"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enter"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
