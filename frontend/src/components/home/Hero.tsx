"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div id="home" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-[#FAFAFC]">
      {/* Soft Colorful Animated Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200 to-cyan-100 rounded-full mix-blend-multiply filter blur-[100px]"
          ></motion.div>
          <motion.div 
            animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-purple-200 to-pink-100 rounded-full mix-blend-multiply filter blur-[120px]"
          ></motion.div>
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], x: [0, 0, 0], y: [0, 50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-32 left-1/4 w-[800px] h-[400px] bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-[120px]"
          ></motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-apple text-blue-700 font-bold text-sm mb-8 bg-white/60"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            #1 Tech Internship Platform
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]"
          >
            Kickstart Your Career with <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">Real-World</span> Internships
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Explore 100+ highly specialized Tech & Non-Tech Internships. Build hands-on projects, receive mentorship, and earn industry-recognized credentials.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#internships" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] hover:-translate-y-1 transition-all duration-300">
              Explore Domains
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md text-gray-800 rounded-full font-bold text-lg shadow-apple hover:shadow-apple-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                <svg className="w-4 h-4 text-gray-700 group-hover:text-blue-700 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              Watch Video
            </Link>
          </motion.div>
        </div>

        {/* 3D Glass Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Students Placed', value: '20K+', icon: '🎓', color: 'bg-blue-50 text-blue-600 ring-blue-100' },
            { label: 'Active Domains', value: '100+', icon: '🚀', color: 'bg-purple-50 text-purple-600 ring-purple-100' },
            { label: 'Hiring Partners', value: '500+', icon: '🏢', color: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
            { label: 'Average Rating', value: '4.9/5', icon: '⭐', color: 'bg-amber-50 text-amber-600 ring-amber-100' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-[2rem] shadow-apple hover:shadow-apple-hover hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center group`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform ring-4 ${stat.color} shadow-sm`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
