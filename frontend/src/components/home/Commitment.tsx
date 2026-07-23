"use client";
import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiTrendingUp, FiMessageCircle, FiAward, FiMonitor, FiTarget, FiClock } from 'react-icons/fi';

export default function Commitment() {
  return (
    <section id="placements" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-900 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
      
      {/* Soft Animated glow */}
      <motion.div 
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900"
          >
            Your Journey, Our Commitment
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-xl font-medium"
          >
            We are dedicated to shaping your future with practical learning, mentorship, and real opportunities.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '20K+', label: 'Students Trained', icon: <FiUsers className="w-8 h-8" />, color: 'text-blue-600 bg-blue-50 ring-blue-100' },
            { value: '1K+', label: 'Hiring Partners', icon: <FiBriefcase className="w-8 h-8" />, color: 'text-purple-600 bg-purple-50 ring-purple-100' },
            { value: '95%', label: 'Satisfaction Rate', icon: <FiTrendingUp className="w-8 h-8" />, color: 'text-emerald-600 bg-emerald-50 ring-emerald-100' },
            { value: '24/7', label: 'Mentor Support', icon: <FiMessageCircle className="w-8 h-8" />, color: 'text-amber-600 bg-amber-50 ring-amber-100' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-3 bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white hover:shadow-apple-hover shadow-apple transition-all"
            >
              <div className={`text-4xl font-extrabold flex items-center gap-4 ${stat.color.split(' ')[0]}`}>
                <span className={`text-3xl p-3 rounded-2xl ring-4 ${stat.color} shadow-sm`}>{stat.icon}</span> 
                {stat.value}
              </div>
              <div className="text-gray-500 font-bold text-lg ml-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 pt-16 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
                { title: 'Quick Certificate', desc: 'Get certified instantly', icon: <FiAward className="w-6 h-6" /> },
                { title: 'Live Projects', desc: 'Real-world experience', icon: <FiMonitor className="w-6 h-6" /> },
                { title: 'Career Support', desc: 'Placement assistance', icon: <FiTarget className="w-6 h-6" /> },
                { title: 'Flexible Schedule', desc: 'Learn at your pace', icon: <FiClock className="w-6 h-6" /> },
            ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-start gap-4 group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-blue-600 text-2xl border border-gray-100 shadow-sm group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-apple transition-all duration-300">
                        {feature.icon}
                    </div>
                    <div>
                        <h4 className="font-extrabold text-gray-900 mb-1 text-lg group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
