"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiCode, FiCheckCircle, FiAward, FiTerminal } from 'react-icons/fi';

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-[#0A0F2C]">
      {/* Background Glows & Dynamic Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[140px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md text-blue-400 font-semibold text-xs sm:text-sm mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Next-Gen Developer & Professional Internships</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.12]"
            >
              Build Real Projects. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Earn Verified Credentials.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-normal max-w-2xl"
            >
              Gain industry-standard experience through structured Tech & Non-Tech internships. Master top skills, submit production code, and get an instant verifiable digital certificate.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <Link 
                href="#internships" 
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-base shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore Internships</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>

              <Link 
                href="/verify" 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 rounded-xl font-semibold text-base transition-all duration-300 hover:border-slate-500"
              >
                <FiShield className="w-4 h-4 text-emerald-400" />
                <span>Verify Certificate</span>
              </Link>
            </motion.div>

            {/* Tech Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-slate-800/80 flex items-center gap-6 text-slate-400 text-xs font-semibold uppercase tracking-wider"
            >
              <span>Popular:</span>
              <div className="flex flex-wrap gap-2 text-slate-300 normal-case font-medium">
                {['Full Stack', 'AI & ML', 'Python', 'Cloud', 'UI/UX'].map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-800/60 border border-slate-700/50 rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Moving IDE / Interactive Platform Card */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Outer Card with IDE Topbar */}
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
                
                {/* IDE Header Bar */}
                <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
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

                {/* Animated Code snippet content */}
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
                  <div className="mt-2 p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs space-y-1 font-mono text-emerald-400">
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

                {/* Interactive Status Footer inside Card */}
                <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Live Verification Engine</span>
                  </span>
                  <span className="text-blue-400 font-bold">100% Verifiable Credentials</span>
                </div>
              </div>

              {/* Floating Floating Micro-Card 1: Verified Badge */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-slate-900/95 backdrop-blur-xl border border-slate-700/70 p-4 rounded-xl shadow-2xl flex items-center gap-3 text-white z-20"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FiCheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Instant Digital</p>
                  <p className="text-sm font-bold text-white">QR Code Verified</p>
                </div>
              </motion.div>

              {/* Floating Floating Micro-Card 2: Placed Counter */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -right-6 bg-slate-900/95 backdrop-blur-xl border border-slate-700/70 p-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-white z-20"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <FiCode className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Hands-on Projects</p>
                  <p className="text-sm font-bold text-blue-400">20,000+ Students</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
