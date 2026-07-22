"use client";
import Link from 'next/link';
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
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.12]"
            >
              Build Real Projects. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
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
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-base shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.45)] transition-all duration-300 transform hover:-translate-y-0.5"
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

          {/* Right Column: IDE / Code Preview Card */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Outer IDE Card */}
              <div className="bg-slate-900 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
                
                {/* IDE Header Bar */}
                <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <FiTerminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>LGS_Portal.tsx</span>
                  </div>
                  <div className="w-10"></div>
                </div>

                {/* Code snippet content */}
                <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2 select-none bg-[#0D1335]">
                  <p><span className="text-purple-400">import</span> &#123; <span className="text-blue-300">applyInternship</span>, <span className="text-blue-300">verifyCertificate</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&apos;@lgs/core&apos;</span>;</p>
                  <br />
                  <p className="text-slate-500">// 1. Select Internship & Submit Code</p>
                  <p><span className="text-purple-400">const</span> <span className="text-yellow-300">intern</span> = <span className="text-purple-400">await</span> <span className="text-blue-400">applyInternship</span>(&#123;</p>
                  <p className="pl-4"><span className="text-slate-400">domain</span>: <span className="text-emerald-300">&quot;Full Stack Development&quot;</span>,</p>
                  <p className="pl-4"><span className="text-slate-400">duration</span>: <span className="text-emerald-300">&quot;4 Weeks&quot;</span>,</p>
                  <p className="pl-4"><span className="text-slate-400">status</span>: <span className="text-emerald-300">&quot;ACTIVE&quot;</span></p>
                  <p>&#125;);</p>
                  <br />
                  <p className="text-slate-500">// 2. Real-time Verified Output</p>
                  <div className="mt-2 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1 font-mono text-emerald-400">
                    <p className="flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-400" />
                      <span>Offer Letter Generated [LGS-OFFER-2026]</span>
                    </p>
                    <p className="flex items-center gap-2 text-blue-400">
                      <FiAward className="text-blue-400" />
                      <span>Digital Certificate Signed & Issued</span>
                    </p>
                  </div>
                </div>

                {/* Footer inside Card */}
                <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Live Verification Engine</span>
                  </span>
                  <span className="text-blue-400 font-bold">LGS Verified</span>
                </div>
              </div>

              {/* Floating Badge: Verified Badge */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-xl border border-gray-200 p-3.5 rounded-xl shadow-xl flex items-center gap-3 text-gray-900 z-20"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                  <FiCheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Instant Digital</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">QR Code Verified</p>
                </div>
              </motion.div>

              {/* Floating Badge: Counter */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-5 -right-5 bg-white/95 backdrop-blur-xl border border-gray-200 p-3.5 rounded-xl shadow-xl flex items-center gap-3 text-gray-900 z-20"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  <FiCode className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Hands-on Projects</p>
                  <p className="text-xs sm:text-sm font-bold text-blue-600">20,000+ Students</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
