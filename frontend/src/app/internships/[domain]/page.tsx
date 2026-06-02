"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const departments = [
  "Computer Science Engineering (CSE)",
  "Information Technology (IT)",
  "Electronics & Communication (ECE)",
  "Electrical & Electronics (EEE)",
  "Mechanical Engineering",
  "Civil Engineering",
  "Artificial Intelligence & Data Science",
  "Business Administration (BBA/MBA)",
  "Commerce (B.Com/M.Com)",
  "Arts & Science",
  "Other"
];

const years = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Passed Out",
  "Working Professional"
];

export default function ApplyInternship() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialDuration = searchParams.get('duration') || '';
  
  const getDurationValue = (query: string) => {
    if (query === '1 Month') return '4 Weeks';
    if (query === '2 Months') return '8 Weeks';
    if (query === '3 Months') return '12 Weeks';
    if (query === '6 Months') return '24 Weeks';
    return '';
  };

  const slug = typeof params?.domain === 'string' ? params.domain : 'internship';
  
  const slugToName: Record<string, string> = {
    "ui-ux-designing": "UI/UX Designing",
    "ai-ml-development": "AI & ML Development",
    "gst-taxation": "GST & Taxation",
    "hr": "HR",
    "sales-marketing": "Sales & Marketing"
  };

  const displayDomain = slugToName[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [offerLetterUrl, setOfferLetterUrl] = useState<string | null>(null);
  const [emailPreviewUrl, setEmailPreviewUrl] = useState<string | null>(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(getDurationValue(initialDuration));
  const [department, setDepartment] = useState(user?.department || '');
  const [customDepartment, setCustomDepartment] = useState('');

  // Automatically calculate end date when start date or duration changes
  useEffect(() => {
    if (startDate && duration) {
      const start = new Date(startDate);
      let monthsToAdd = 1;
      if (duration === '8 Weeks') monthsToAdd = 2;
      else if (duration === '12 Weeks') monthsToAdd = 3;
      else if (duration === '24 Weeks') monthsToAdd = 6;
      
      start.setMonth(start.getMonth() + monthsToAdd);
      
      // Format as YYYY-MM-DD for input type="date"
      const yyyy = start.getFullYear();
      const mm = String(start.getMonth() + 1).padStart(2, '0');
      const dd = String(start.getDate()).padStart(2, '0');
      
      setEndDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [startDate, duration]);

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("Please login or sign up first to apply for an internship.");
      router.push('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setDepartment(parsedUser.department || '');
    }
  }, [router]);

  // Wait until user is loaded before rendering the form to avoid flicker
  if (!user) return <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create payload
    const form = e.target as HTMLFormElement;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone number must be exactly 10 digits');
      setIsLoading(false);
      return;
    }
    
    const finalDepartment = department === 'Other' ? customDepartment : department;
    
    if (finalDepartment.trim() === '') {
      alert('Please specify your department');
      setIsLoading(false);
      return;
    }

    const payload = {
      userId: user.id,
      studentName: (form.elements.namedItem('name') as HTMLInputElement).value,
      studentEmail: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: phone,
      college: (form.elements.namedItem('college') as HTMLInputElement).value,
      department: finalDepartment.trim(),
      year: (form.elements.namedItem('year') as HTMLSelectElement).value,
      duration: (form.elements.namedItem('duration') as HTMLSelectElement).value,
      domain: displayDomain,
      startDate: new Date((form.elements.namedItem('startDate') as HTMLInputElement).value).toISOString(),
      endDate: new Date((form.elements.namedItem('endDate') as HTMLInputElement).value).toISOString(),
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internships/enroll`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to enroll');
      }
      
      if (data.registration?.offerLetterUrl) {
        setOfferLetterUrl(data.registration.offerLetterUrl);
      }
      if (data.emailPreview) {
        setEmailPreviewUrl(data.emailPreview);
      }
      
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      alert("Application failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full px-5 py-3.5 bg-white/60 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-2";

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-green-400/20 rounded-full blur-[100px]" />
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="max-w-md w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden relative z-10 p-8 sm:p-10 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
          >
            <FiCheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 drop-shadow-[0_10px_20px_rgba(34,197,94,0.3)]" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-4 tracking-tight">Application Successful!</h2>
          <p className="text-gray-600 mb-8 font-medium">
            You have successfully applied for the <strong>{displayDomain}</strong> internship. Your offer letter has been generated successfully and is ready to download!
          </p>
          <div className="flex flex-col gap-4">
            {offerLetterUrl && (
              <motion.a 
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${offerLetterUrl}`} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] transition-all inline-block"
              >
                Download Offer Letter
              </motion.a>
            )}
            <motion.div whileHover={{ scale: 1.02, translateY: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="w-full block bg-white border border-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                Return to Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none fixed">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-cyan-400/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl w-full mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden relative z-10"
      >
        <div className="bg-[#0A0F2C] p-10 text-white text-center relative overflow-hidden">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-[-50%] right-[-10%] w-[150%] h-[150%] bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl pointer-events-none"></motion.div>
          <motion.img 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            src="/images/icon.png" alt="LGS Icon" className="h-16 object-contain mb-6 mx-auto relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
          />
          <h2 className="text-4xl font-extrabold mb-3 relative z-10 tracking-tight text-white drop-shadow-md">Apply for {displayDomain}</h2>
          <p className="text-blue-200 text-sm relative z-10 font-medium">Please fill out all the necessary details to receive your offer letter.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className={labelClasses}>Full Name</label>
              <input required type="text" name="name" defaultValue={user?.name || ''} placeholder="John Doe" className={inputClasses} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <label className={labelClasses}>Email Address</label>
              <input required type="email" name="email" defaultValue={user?.email || ''} placeholder="john@example.com" className={inputClasses} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className={labelClasses}>Phone Number</label>
              <input required type="tel" name="phone" defaultValue={user?.phone || ''} placeholder="+91 98765 43210" className={inputClasses} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
              <label className={labelClasses}>College / Institution</label>
              <input required type="text" name="college" defaultValue={user?.college || ''} placeholder="Your College Name" className={inputClasses} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className={labelClasses}>Department / Course</label>
              <select 
                required 
                value={departments.includes(department) ? department : (department ? 'Other' : '')}
                onChange={(e) => setDepartment(e.target.value)}
                className={`${inputClasses} bg-white/60 mb-3 appearance-none`}
              >
                <option value="" disabled>Select your department</option>
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
              
              {!departments.includes(department) && department !== '' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <input 
                    type="text" 
                    value={customDepartment}
                    onChange={(e) => setCustomDepartment(e.target.value)}
                    required 
                    placeholder="Type your department" 
                    className={`${inputClasses} bg-white/60`} 
                  />
                </motion.div>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
              <label className={labelClasses}>Year of Study</label>
              <select required name="year" defaultValue={user?.year || ''} className={`${inputClasses} bg-white/60 appearance-none`}>
                <option value="">Select your year</option>
                {years.map((year, idx) => (
                  <option key={idx} value={year}>{year}</option>
                ))}
              </select>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.46 }}>
              <label className={labelClasses}>Start Date</label>
              <input required type="date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputClasses} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.48 }}>
              <label className={labelClasses}>End Date</label>
              <input required type="date" name="endDate" value={endDate} readOnly className={`${inputClasses} bg-gray-100 cursor-not-allowed text-gray-500`} title="Automatically calculated based on Start Date and Duration" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label className={labelClasses}>Duration</label>
              <select required name="duration" value={duration} onChange={e => setDuration(e.target.value)} className={`${inputClasses} bg-white/60 appearance-none`}>
                <option value="">Select internship duration</option>
                <option value="4 Weeks">4 Weeks (1 Month)</option>
                <option value="8 Weeks">8 Weeks (2 Months)</option>
                <option value="12 Weeks">12 Weeks (3 Months)</option>
                <option value="24 Weeks">24 Weeks (6 Months)</option>
              </select>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pt-6 border-t border-gray-100">
            <motion.button 
              whileHover={{ scale: 1.01, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isLoading}
              className={`w-full relative group overflow-hidden bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Application...
                  </>
                ) : (
                  'Submit Application & Get Offer Letter'
                )}
              </span>
              {!isLoading && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
            </motion.button>
            <div className="text-center mt-6">
              <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition underline-offset-4 hover:underline">
                ← Cancel and go back
              </Link>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
