"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiClock, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const techDomains = [
  { name: 'Full Stack Development', badge: 'Development', students: '91.5K', duration: '4 Weeks', image: '/images/fullstack_banner.png' },
  { name: 'Python Development', badge: 'Development', students: '42.1K', duration: '4 Weeks', image: '/images/python_banner.png' },
  { name: 'AI & ML Development', badge: 'Data & AI', students: '76.3K', duration: '4 Weeks', image: '/images/ai_ml_banner.png' },
  { name: 'Data Science', badge: 'Data & AI', students: '65.2K', duration: '4 Weeks', image: '/images/data_science_banner.png' },
  { name: 'Data Analytics', badge: 'Data & AI', students: '48.9K', duration: '4 Weeks', image: '/images/data_analytics_banner.png' },
  { name: 'Cyber Security', badge: 'Security', students: '38.4K', duration: '4 Weeks', image: '/images/cyber_security_banner.png' },
  { name: 'Web Development', badge: 'Development', students: '52.7K', duration: '4 Weeks', image: '/images/frontend_banner.png' },
  { name: 'Cloud Computing', badge: 'Infrastructure', students: '31.2K', duration: '4 Weeks', image: '/images/cloud_computing_banner.png' },
  { name: 'UI/UX Designing', badge: 'Design', students: '45.8K', duration: '4 Weeks', image: '/images/ui_ux_banner.png' },
];

const nonTechDomains = [
  { name: 'GST & Taxation', badge: 'Finance', students: '28.4K', duration: '4 Weeks', image: '/images/gst_taxation_banner.png' },
  { name: 'Digital Marketing', badge: 'Marketing', students: '54.2K', duration: '4 Weeks', image: '/images/digital_marketing_banner.png' },
  { name: 'HR', badge: 'Management', students: '33.1K', duration: '4 Weeks', image: '/images/hr_banner.png' },
  { name: 'Business Analytics', badge: 'Data', students: '39.8K', duration: '4 Weeks', image: '/images/business_analytics_banner.png' },
  { name: 'Tally', badge: 'Finance', students: '22.3K', duration: '4 Weeks', image: '/images/tally_banner.png' },
  { name: 'Sales & Marketing', badge: 'Marketing', students: '47.9K', duration: '4 Weeks', image: '/images/sales_marketing_banner.png' },
];

export default function Domains() {
  const [activeTab, setActiveTab] = useState<'tech' | 'non-tech'>('tech');
  const [activeDuration, setActiveDuration] = useState('1 Month');
  const [currentPage, setCurrentPage] = useState(1);
  
  const displayedDomains = activeTab === 'tech' ? techDomains : nonTechDomains;

  // Reset page to 1 when changing tabs or duration
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, activeDuration]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(displayedDomains.length / itemsPerPage);
  const currentDomains = displayedDomains.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPrice = () => {
    let base = 99;
    if (activeDuration === '2 Months') base = 150;
    if (activeDuration === '3 Months') base = 199;
    if (activeDuration === '6 Months') base = 299;
    return activeTab === 'tech' ? base : base - 50;
  };

  return (
    <section id="internships" className="py-24 bg-[#FAFAFC] relative overflow-hidden">
      {/* Soft colorful gradient instead of pure white */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight"
          >
            Choose Your Domain
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg font-medium"
          >
            We offer a wide range of highly specialized Tech and Non-Tech internships to boost your skills.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 mb-4"
          >
            {/* Tech / Non-Tech Tabs */}
            <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-gray-200 inline-flex transition-all shadow-sm">
              <button 
                onClick={() => setActiveTab('tech')}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'tech' ? 'bg-white text-blue-600 shadow-apple' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Tech Internships
              </button>
              <button 
                onClick={() => setActiveTab('non-tech')}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'non-tech' ? 'bg-white text-purple-600 shadow-apple' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Non-Tech Internships
              </button>
            </div>

            {/* Duration Selector */}
            <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 inline-flex transition-all shadow-sm max-w-full overflow-x-auto">
              {['1 Month', '2 Months', '3 Months', '6 Months'].map((dur) => (
                <button 
                  key={dur}
                  onClick={() => setActiveDuration(dur)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeDuration === dur ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'}`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            {currentDomains.map((domain, i) => (
              <motion.div 
                key={`${activeTab}-${activeDuration}-${currentPage}-${domain.name}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 shadow-apple hover:shadow-apple-hover hover:bg-white transition-all overflow-hidden flex flex-col group h-max"
              >
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    {domain.badge}
                  </div>
                  <Image 
                    src={domain.image} 
                    alt={domain.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col relative z-20">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{domain.name}</h3>
                  
                  <div className="flex items-center gap-4 text-gray-500 text-sm font-bold mb-6">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      <FiUsers className="w-3.5 h-3.5 text-blue-500" />
                      {domain.students}
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      <FiClock className="w-3.5 h-3.5 text-purple-500" />
                      {activeDuration}
                    </div>
                  </div>

                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through font-medium">₹1,449.00</span>
                      <span className="text-2xl font-black text-gray-900">₹{getPrice()}.00</span>
                    </div>
                    <Link 
                      href={`/internships/${domain.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}?duration=${encodeURIComponent(activeDuration)}`}
                      className="bg-white border-2 border-blue-500 hover:bg-blue-50 text-blue-600 font-bold py-2.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-sm"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md border border-blue-100'}`}
            >
              <FiChevronLeft className="w-5 h-5" /> Previous
            </button>
            <div className="text-gray-500 font-bold text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-md border border-blue-100'}`}
            >
              Next <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
