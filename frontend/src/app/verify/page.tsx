"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function VerifyPortal() {
  const [certId, setCertId] = useState('');
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      router.push(`/verify/${certId.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#FAFAFC]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none fixed">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-emerald-400/20 rounded-full blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-8 sm:p-12 relative z-10 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
        >
          <FiShield className="w-10 h-10 text-emerald-600 drop-shadow-md" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-4 tracking-tight"
        >
          Verify Certificate
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-gray-500 mb-10 max-w-md mx-auto font-medium"
        >
          Enter the unique Certificate ID located at the bottom of your certificate to verify its authenticity.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          onSubmit={handleVerify} 
          className="relative max-w-lg mx-auto group"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
            <FiSearch className="w-6 h-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="e.g. LGS-A1B2C3"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="w-full pl-14 pr-36 py-5 bg-white/80 border border-gray-200 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase placeholder:normal-case shadow-sm"
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 top-2.5 bottom-2.5 px-8 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]"
          >
            Verify
          </button>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 inline-flex px-4 py-2 rounded-full border border-emerald-100"
        >
          <FiShield className="w-4 h-4" />
          Secured by LGS Technologies
        </motion.div>
      </motion.div>
    </div>
  );
}
