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

          {/* Right Column: Premium Dashboard Preview Card */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Glassmorphic Dashboard UI */}
              <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden p-6 sm:p-8 relative">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                 
                 {/* Header */}
                 <div className="flex items-center justify-between mb-8 relative z-10">
                   <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-sm">
                       <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">
                         ST
                       </div>
                     </div>
                     <div>
                       <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl">Student Dashboard</h3>
                       <p className="text-sm text-gray-500 font-bold">Full Stack Web Development</p>
                     </div>
                   </div>
                   <div className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full shadow-sm">
                     Active Track
                   </div>
                 </div>

                 {/* Progress Section */}
                 <div className="bg-white/80 rounded-2xl p-6 mb-6 shadow-sm border border-white relative z-10">
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-sm font-bold text-gray-700">Internship Progress</span>
                     <span className="text-lg font-black text-blue-600">85%</span>
                   </div>
                   <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                     <motion.div 
                       initial={{ width: 0 }} 
                       animate={{ width: "85%" }} 
                       transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                       className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative"
                     >
                       <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                     </motion.div>
                   </div>
                 </div>

                 {/* Modules */}
                 <div className="space-y-4 relative z-10">
                    {[
                      { icon: <FiCode />, title: 'Frontend Architecture', status: 'Completed', color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-100' },
                      { icon: <FiTerminal />, title: 'Backend Node APIs', status: 'In Progress', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
                      { icon: <FiShield />, title: 'Deployment & Security', status: 'Locked', color: 'text-gray-400', bg: 'bg-gray-50 border-gray-100' }
                    ].map((mod, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/70 rounded-2xl border border-white hover:bg-white hover:shadow-apple-hover transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl border ${mod.bg} ${mod.color}`}>
                            {mod.icon}
                          </div>
                          <span className="font-bold text-gray-800 text-sm">{mod.title}</span>
                        </div>
                        <span className={`text-xs font-extrabold tracking-wide uppercase ${mod.status === 'Completed' ? 'text-emerald-600' : mod.status === 'In Progress' ? 'text-blue-600' : 'text-gray-400'}`}>
                          {mod.status}
                        </span>
                      </div>
                    ))}
                 </div>

              </div>

              {/* Floating Badge: Verified Badge */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 sm:-left-10 bg-white/95 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow-xl flex items-center gap-4 text-gray-900 z-20"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border-4 border-white shadow-sm">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Credential</p>
                  <p className="text-sm font-extrabold text-gray-900">Verified Issuer</p>
                </div>
              </motion.div>

              {/* Floating Badge: Counter */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -right-6 sm:-right-8 bg-white/95 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl shadow-xl flex items-center gap-4 text-gray-900 z-20"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-4 border-white shadow-sm">
                  <FiAward className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Network</p>
                  <p className="text-sm font-extrabold text-blue-600">1K+ Hiring Partners</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
