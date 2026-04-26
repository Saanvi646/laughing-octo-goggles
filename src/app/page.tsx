
'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState('...');
  const [pariState, setPariState] = useState<'traitor' | 'cold' | 'nostalgia'>('traitor');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const namePart = user.email.split('@')[0];
        const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        setUsername(capitalized);
      }
    };
    fetchUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/login');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {username === 'Pari' && pariState === 'traitor' ? (
        <div className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-serif text-gray-400 font-bold mb-8 z-10 uppercase tracking-[0.4em]"
          >
            TRAITOR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="text-lg md:text-xl text-gray-600 font-serif italic mb-12 z-10"
          >
            this is my site now. <br/> you shoo away.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="z-10 flex flex-col items-center gap-8"
          >
            <button
              onClick={handleSignOut}
              className="px-8 py-3 border border-gray-800 text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-all rounded font-sans uppercase tracking-[0.2em] text-sm"
            >
              Leave
            </button>
            <button
              onClick={() => setPariState('cold')}
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors font-serif italic underline underline-offset-4"
            >
              if you choose to be stubborn about it
            </button>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Background Image with Overlay */}
          <div
            className="fixed inset-0 z-[-1]"
            style={{
              backgroundImage: (username === 'Pari' && pariState === 'cold') ? "none" : "url('/images/home_bg.png')",
              backgroundColor: (username === 'Pari' && pariState === 'cold') ? "#0f0f0f" : "transparent",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className={`absolute inset-0 ${(username === 'Pari' && pariState === 'cold') ? 'bg-black/80' : 'bg-white/50 backdrop-blur-sm'}`} />
          </div>

          {/* Navbar Area */}
          <nav className="fixed top-6 right-6 z-50">
            <button
              onClick={handleSignOut}
              className="group px-4 py-2 bg-white/50 hover:bg-red-50/90 text-red-500 rounded-full text-lg font-hand font-bold transition backdrop-blur-md shadow-sm border border-red-100 flex items-center gap-2 tracking-wider cursor-pointer"
            >
              <span>Sign Out</span>
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </nav>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 mt-20 max-w-3xl mx-auto px-6"
          >
            <motion.h1
              variants={itemVariants}
              className={`text-4xl font-hand mb-3 ${(username === 'Pari' && pariState === 'cold') ? 'text-gray-300' : 'text-gray-800'}`}
            >
              {username === 'Pari' && pariState === 'cold' ? 'Welcome to reality.' : `Welcome back, ${username} 🎀`}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`mb-12 font-sans ${(username === 'Pari' && pariState === 'cold') ? 'text-gray-600 italic' : 'text-gray-500'}`}
            >
              {username === 'Pari' && pariState === 'cold' ? 'everything is different now.' : "good 'ol-days' babbyyyy"}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans"
            >
              {username === 'Pari' && pariState === 'cold' ? (
                  <>
                      <div className="rounded-xl p-6 border border-gray-800 bg-white/5 transition-all">
                          <h2 className="text-xl font-medium text-gray-400 mb-1">Unsent Letters</h2>
                          <p className="text-sm text-gray-600">things you don't get to read anymore.</p>
                      </div>
                      <div className="rounded-xl p-6 border border-gray-800 bg-white/5 transition-all">
                          <h2 className="text-xl font-medium text-gray-400 mb-1">The Aftermath</h2>
                          <p className="text-sm text-gray-600">a year in review, but only the bad parts.</p>
                      </div>
                      <div className="rounded-xl p-6 border border-gray-800 bg-white/5 transition-all h-full">
                          <h2 className="text-xl font-medium text-gray-400 mb-1">Current Playlist</h2>
                          <p className="text-sm text-gray-600">songs that help me forget you.</p>
                      </div>
                      <div className="rounded-xl p-6 border border-gray-800 bg-white/5 transition-all h-full">
                          <h2 className="text-xl font-medium text-gray-400 mb-1">Broken Promises</h2>
                          <p className="text-sm text-gray-600">a museum of things you didn't keep.</p>
                      </div>
                  </>
              ) : (
                  <>
                      <Link href="/letters" className="group md:col-span-2">
                        <div className="glass rounded-xl p-6 transition-all duration-300 hover:bg-white/60 hover:scale-[1.02] hover:shadow-lg">
                          <h2 className="text-xl font-medium text-gray-800 mb-1">Letters</h2>
                          <p className="text-sm text-gray-500"> just some empty words </p>
                        </div>
                      </Link>

                      <Link href="/journey" className="group md:col-span-2">
                        <div className="glass rounded-xl p-6 transition-all duration-300 hover:bg-white/60 hover:scale-[1.02] hover:shadow-lg">
                          <h2 className="text-xl font-medium text-gray-800 mb-1">Our Journey</h2>
                          <p className="text-sm text-gray-500">a year in review, month by month</p>
                        </div>
                      </Link>

                      <Link href="/music" className="group">
                        <div className="glass rounded-xl p-6 transition-all duration-300 hover:bg-white/60 hover:scale-[1.02] hover:shadow-lg h-full">
                          <h2 className="text-xl font-medium text-gray-800 mb-1">Playlist</h2>
                          <p className="text-sm text-gray-500">songs that remind me of us</p>
                        </div>
                      </Link>

                      <Link href="/promises" className="group">
                        <div className="glass rounded-xl p-6 transition-all duration-300 hover:bg-white/60 hover:scale-[1.02] hover:shadow-lg h-full">
                          <h2 className="text-xl font-medium text-gray-800 mb-1">Promises</h2>
                          <p className="text-sm text-gray-500">pinky swears and commitments(do you find it funny too?)</p>
                        </div>
                      </Link>
                  </>
              )}
            </motion.div>

            {username === 'Pari' && pariState === 'cold' && (
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => setPariState('nostalgia')}
                        className="text-xs text-gray-600 hover:text-gray-400 underline underline-offset-4 transition font-serif italic"
                    >
                        if you came here to live in old memories, click here.
                    </button>
                </div>
            )}
            
            {username === 'Pari' && pariState === 'nostalgia' && (
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => setPariState('cold')}
                        className="text-xs text-red-400 hover:text-red-500 underline underline-offset-4 transition font-serif italic"
                    >
                        return to reality.
                    </button>
                </div>
            )}
          </motion.div>
        </>
      )}
    </main>
  );
}
