"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiCode, FiCheckCircle, FiAward, FiTerminal, FiMail } from 'react-icons/fi';

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAFAFC]">
      {/* Soft Animated Background Mesh matching rest of site */}
      <div className="absolute inset-0 pointer-events-none opacity-70 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-blue-200/60 to-cyan-100/50 rounded-full mix-blend-multiply filter blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-gradient-to-tl from-purple-200/50 to-pink-100/40 rounded-full mix-blend-multiply filter blur-[130px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.12]"
            >
              Build Real Projects. <br />
              <span className="text-blue-600">
                Earn Verified Credentials.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed font-medium max-w-2xl"
            >
              Gain industry-standard experience through structured Tech & Non-Tech internships. Master top skills, submit production code, and receive an instant verifiable digital certificate.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
            >
              <Link 
                href="#internships" 
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-base shadow-lg shadow-slate-900/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore Internships</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>

              <Link 
                href="/verify" 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl font-bold text-base shadow-sm transition-all duration-300 hover:border-gray-300"
              >
                <FiShield className="w-4 h-4 text-blue-600" />
                <span>Verify Certificate</span>
              </Link>
            </motion.div>

            {/* Need More Info Contact Note */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50/80 border border-blue-100 rounded-lg text-xs sm:text-sm text-gray-700 font-medium mb-8"
            >
              <FiMail className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Need more information? Mail us at <a href="mailto:lgstechnologiess@gmail.com" className="text-blue-600 font-bold underline hover:text-blue-800">lgstechnologiess@gmail.com</a></span>
            </motion.div>

            {/* Popular Tech Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-gray-200/80 flex items-center gap-4 text-gray-400 text-xs font-semibold uppercase tracking-wider"
            >
              <span>Popular Tracks:</span>
              <div className="flex flex-wrap gap-2 text-gray-700 normal-case font-semibold">
                {['Full Stack', 'AI & ML', 'Python', 'Cloud', 'UI/UX'].map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs shadow-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Hero Image */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Image Container with Sleek Shadow */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 bg-white">
                 <Image 
                   src="/hero-isometric.jpg" 
                   alt="3D isometric illustration of a sleek modern laptop" 
                   width={800} 
                   height={600} 
                   className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-out"
                   priority
                 />
                 
                 {/* Gradient Overlay for better contrast on bottom edge */}
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Badge: Verified Badge */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md border border-gray-200 p-3 rounded-xl shadow-lg shadow-slate-900/5 flex items-center gap-3 text-slate-900 z-20"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold border border-emerald-100">
                  <FiCheckCircle className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Credential</p>
                  <p className="text-sm font-bold text-slate-900">Verified Issuer</p>
                </div>
              </motion.div>

              {/* Floating Badge: Counter */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-gray-200 p-3 rounded-xl shadow-lg shadow-slate-900/5 flex items-center gap-3 text-slate-900 z-20"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                  <FiAward className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Network</p>
                  <p className="text-sm font-bold text-slate-900">1K+ Partners</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
