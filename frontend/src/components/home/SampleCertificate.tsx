"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiAward, FiCheckCircle, FiShield, FiExternalLink } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';

export default function SampleCertificate() {
  // Real scannable QR Code URL linking to the live verify page
  const sampleQrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://lgs.aimtechsolutions.in/verify";

  return (
    <section className="py-20 bg-[#FAFAFC] border-t border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-wider mb-4"
          >
            <FiAward className="w-4 h-4" />
            <span>Official Verified Credentials</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4"
          >
            Industry-Recognized <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sample Certificate</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 font-medium"
          >
            Upon successful completion of your internship, you will be awarded an official certificate equipped with a unique QR code for instant recruiter verification.
          </motion.p>
        </div>

        {/* Certificate Display Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Sample Certificate Preview Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative group select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-xl bg-white p-2 group-hover:shadow-2xl transition-all duration-500">
              
              {/* Certificate Container */}
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src="/images/certificate-landscape.png" 
                  alt="LGS Technologies Sample Internship Certificate" 
                  className="w-full h-auto rounded-xl object-contain pointer-events-none select-none"
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                
                {/* Real Scannable QR Code placed directly on bottom-right of the certificate */}
                <Link 
                  href="/verify"
                  title="Scan with phone camera or click to verify"
                  className="absolute bottom-[9%] right-[9%] z-20 w-[11%] aspect-square bg-white p-1 rounded-md shadow-md hover:scale-110 transition-transform block border border-gray-300/80"
                >
                  <img 
                    src={sampleQrCodeUrl} 
                    alt="Scan Sample QR Code" 
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </Link>

                {/* Transparent Security Shielding Right Click & Drag */}
                <div 
                  className="absolute inset-0 z-10 cursor-default"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                ></div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Key Certificate Features */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {[
              {
                title: 'Tamper-Proof QR Code Verification',
                desc: 'Recruiters and employers can instantly scan the built-in QR code to verify your certificate status live on our official domain.',
                icon: FiCheckCircle,
                color: 'text-emerald-500 bg-emerald-50'
              },
              {
                title: 'Unique Certificate ID',
                desc: 'Every certificate contains a unique reference ID (e.g. LGS-89X2A) linked directly to your completed projects and duration.',
                icon: FiAward,
                color: 'text-blue-500 bg-blue-50'
              },
              {
                title: 'Authorized Official Signature',
                desc: 'Digitally signed and stamped by LGS Technologies directors for complete authenticity and career recognition.',
                icon: FiShield,
                color: 'text-purple-500 bg-purple-50'
              }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl font-bold ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{feat.title}</h3>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}

            <div className="pt-4">
              <Link 
                href="/verify" 
                className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 transition bg-blue-50 px-5 py-3 rounded-xl border border-blue-100 hover:bg-blue-100/80"
              >
                <FaQrcode className="w-5 h-5 text-blue-600" />
                <span>Test Live QR Verification Portal</span>
                <FiExternalLink />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
