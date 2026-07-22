"use client";
import { motion } from 'framer-motion';
import { FiGift, FiExternalLink, FiFolder, FiDownloadCloud, FiCheck } from 'react-icons/fi';

export default function FreeResources() {
  const resourceDriveUrl = "https://drive.google.com/drive/u/0/folders/1WPd51T3vzVsiK4GgXW_-Dc8UOW2mXBnS";

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden my-8 rounded-3xl max-w-7xl mx-auto px-6 sm:px-10 shadow-2xl">
      {/* Background Animated Glow Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/20 rounded-full filter blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-400/30 rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Column: Text & Features */}
        <div className="text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider mb-4">
            <FiGift className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Exclusive Free Student Gift</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white drop-shadow-sm">
            Free Tech & Internship Resource Pack 🚀
          </h2>

          <p className="text-blue-100 text-base sm:text-lg mb-6 leading-relaxed font-medium">
            Get instant access to curated project source codes, interview prep guides, resume templates, and study materials compiled by LGS Technologies — completely free!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs sm:text-sm font-semibold text-white/90">
            <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
              <FiCheck className="text-emerald-300 font-bold" />
              <span>Project Source Codes</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
              <FiCheck className="text-emerald-300 font-bold" />
              <span>Resume Templates</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
              <FiCheck className="text-emerald-300 font-bold" />
              <span>Interview Kits</span>
            </div>
          </div>
        </div>

        {/* Right Column: CTA Box */}
        <div className="flex-shrink-0 text-center">
          <motion.a 
            whileHover={{ scale: 1.03, translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            href={resourceDriveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-5 bg-white text-blue-700 hover:bg-gray-50 rounded-2xl font-extrabold text-lg shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 group"
          >
            <FiFolder className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            <span>Access Free Drive Pack</span>
            <FiExternalLink className="w-5 h-5 text-blue-500" />
          </motion.a>
          <p className="text-xs text-blue-200 mt-3 font-medium flex items-center justify-center gap-1">
            <FiDownloadCloud className="w-3.5 h-3.5" /> Direct Google Drive Access • No Login Required
          </p>
        </div>

      </div>
    </section>
  );
}
