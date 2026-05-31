"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FiUsers, FiClock, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const internships = [
  {
    id: 1,
    title: 'Frontend Development',
    image: '/images/frontend_banner.png',
    badge: 'Development',
    students: '23.9K',
    duration: '4 Weeks',
    link: '/internships/frontend-development'
  },
  {
    id: 2,
    title: 'Backend Development',
    image: '/images/backend_banner.png',
    badge: 'Development',
    students: '21.9K',
    duration: '4 Weeks',
    link: '/internships/backend-development'
  },
  {
    id: 3,
    title: 'Full Stack Development',
    image: '/images/fullstack_banner.png',
    badge: 'Development',
    students: '91.5K',
    duration: '4 Weeks',
    link: '/internships/full-stack-development'
  },
  {
    id: 4,
    title: 'Digital Marketing',
    image: '/images/digital_marketing_banner.png',
    badge: 'Marketing',
    students: '54.2K',
    duration: '4 Weeks',
    link: '/internships/digital-marketing'
  }
];

export default function FeaturedInternships() {
  return (
    <section className="py-24 bg-[#FAFAFC] relative overflow-hidden">
      {/* Soft Colorful Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 pointer-events-none translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight"
          >
            Popular Internships
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-medium"
          >
            Kickstart your career with our most sought-after development programs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {internships.map((internship, i) => (
            <motion.div 
              key={internship.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 shadow-apple hover:shadow-apple-hover hover:bg-white transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                  {internship.badge}
                </div>
                <Image 
                  src={internship.image} 
                  alt={internship.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col relative z-20">
                <h3 className="text-xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{internship.title}</h3>
                
                <div className="flex items-center gap-4 text-gray-500 text-sm font-bold mb-6">
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                    <FiUsers className="w-3.5 h-3.5 text-blue-500" />
                    {internship.students}
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                    <FiClock className="w-3.5 h-3.5 text-purple-500" />
                    {internship.duration}
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-gray-100">
                  <Link 
                    href={internship.link}
                    className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-600 hover:to-indigo-600 text-blue-600 hover:text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-sm"
                  >
                    Apply Now 
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
