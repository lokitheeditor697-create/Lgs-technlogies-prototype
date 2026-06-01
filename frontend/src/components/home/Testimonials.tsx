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
  {
    content: "The Cyber Security tasks were incredibly challenging and exactly what I needed for my resume. Highly recommended!",
    author: "Priya Desai",
    role: "Security Analyst",
    avatar: "👩‍💻",
  },
  {
    content: "I landed my first job thanks to the projects I built during the Data Science internship here. The structure is flawless.",
    author: "Karan Singh",
    role: "Data Scientist",
    avatar: "👨‍🎓",
  },
  {
    content: "UI/UX design is taught beautifully. I now have a stunning portfolio that recruiters actually respond to.",
    author: "Meera Reddy",
    role: "UX Designer",
    avatar: "🎨",
  },
];

export default function Testimonials() {
  return (
    <section id="about" className="py-24 bg-gradient-to-tl from-blue-50/50 via-white to-purple-50/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent z-0 pointer-events-none"></div>

      <div className="max-w-[100vw] mx-auto text-center relative z-10 overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 tracking-tight px-4"
        >
          What Our Interns Say
        </motion.h2>
        
        {/* Infinite Scrolling Marquee */}
        <div className="flex relative overflow-hidden group py-4">
          <motion.div 
            className="flex gap-8 px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i} 
                className="w-[350px] md:w-[400px] flex-shrink-0 bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-100 shadow-apple hover:shadow-apple-hover transition-all duration-300 text-left flex flex-col"
              >
                <div className="text-6xl text-blue-100 font-serif mb-2 leading-none">"</div>
                <p className="text-gray-600 font-medium mb-8 flex-grow text-lg leading-relaxed relative z-10">
                  {t.content}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300 border border-gray-100 shadow-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900">{t.author}</h4>
                    <p className="text-sm text-gray-500 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Optional: Add gradient fades on the left and right edges for a smoother look */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>
        </div>
      </div>
    </section>
  );
}
