"use client";
import { motion } from 'framer-motion';

const testimonials = [
  {
    content: "The Full Stack internship at LGS Technologies helped me build real projects and gain confidence. The mentors are amazing!",
    author: "Rohit Sharma",
    role: "Full Stack Developer",
    avatar: "👨‍💻",
  },
  {
    content: "The Digital Marketing internship was very insightful. I learned a lot and the certificate is industry recognized.",
    author: "Ananya Gupta",
    role: "Marketing Intern",
    avatar: "👩‍💼",
  },
  {
    content: "Great platform for practical learning. Timely tasks and feedback helped me improve my skills.",
    author: "Vikram Patil",
    role: "AI/ML Intern",
    avatar: "👨‍🔬",
  },
];

export default function Testimonials() {
  return (
    <section id="about" className="py-24 bg-gradient-to-tl from-blue-50/50 via-white to-purple-50/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 tracking-tight"
        >
          What Our Interns Say
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-100 shadow-apple hover:shadow-apple-hover transition-all duration-300 group"
            >
              <div className="text-6xl text-blue-100 font-serif mb-2 leading-none">"</div>
              <p className="text-gray-600 font-medium mb-8 min-h-[80px] text-lg leading-relaxed relative z-10">
                {t.content}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 border border-gray-100 shadow-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{t.author}</h4>
                  <p className="text-sm text-gray-500 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
