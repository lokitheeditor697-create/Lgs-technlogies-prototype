"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter simulation
    const duration = 2500;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    // Hide preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // slightly longer than 100% so it stays at 100 for a split second

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ 
            clipPath: "circle(0% at 50% 50%)", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Deep Space Background Glows */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-full blur-[100px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Orbital Rings around the Logo */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              {/* Outer Ring */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-blue-500/20 border-t-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              />
              {/* Middle Reverse Ring */}
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-purple-500/20 border-b-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              />
              {/* Inner Fast Ring */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-cyan-400/10 border-l-cyan-400"
              />
              
              {/* Center Logo with Pulse */}
              <motion.div 
                animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-24 h-24 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10"
              >
                <img src="/images/icon.png" alt="LGS" className="h-14 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </motion.div>
            </div>

            {/* Premium Typography & Progress */}
            <div className="flex flex-col items-center overflow-hidden">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-sm font-medium tracking-[0.3em] uppercase mb-4 opacity-80"
              >
                LGS Technologies
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter tabular-nums"
              >
                {progress}%
              </motion.div>
            </div>

            {/* High-Tech Loading Bar */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 h-1 bg-gray-800 rounded-full overflow-hidden relative"
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
