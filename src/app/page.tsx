
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
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/images/home_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      </div>

      {/* Navbar Area */}
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
          className="text-4xl font-hand mb-3 text-gray-800"
        >
          Welcome back, {username} 🎀
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-500 mb-12 font-sans"
        >
          this is your shared space — slow, private, intentional
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans"
        >
          <Link href="/letters" className="group md:col-span-2">
            <div className="glass rounded-xl p-6 transition-all duration-300 hover:bg-white/60 hover:scale-[1.02] hover:shadow-lg">
              <h2 className="text-xl font-medium text-gray-800 mb-1">Letters</h2>
              <p className="text-sm text-gray-500">long-form thoughts, written and kept</p>
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
              <p className="text-sm text-gray-500">pinky swears and commitments</p>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
