"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('user')) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      setSuccess('Account created successfully! Logging you in...');
      
      const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const loginData = await loginRes.json();
      
      if (loginRes.ok) {
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
        window.dispatchEvent(new Event('auth-change'));
        setTimeout(() => { window.location.href = '/dashboard'; }, 1500);
      } else {
        window.location.href = '/login';
      }
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-5 py-3.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none fixed">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-blue-400/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-purple-400/20 rounded-full blur-[100px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden relative z-10"
      >
        <div className="p-8 sm:p-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <img src="/images/icon.png" alt="LGS Icon" className="h-16 object-contain relative z-10 drop-shadow-lg" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-2 tracking-tight">Create Your Account</h2>
            <p className="text-sm font-medium text-gray-500">Join LGS Technologies and start your learning journey today.</p>
          </motion.div>

          {error && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">{error}</motion.div>}
          {success && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-green-50/80 backdrop-blur-sm border border-green-100 text-green-600 rounded-xl text-sm font-medium flex items-center gap-2">{success}</motion.div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className={labelClasses}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" className={inputClasses} />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <label className={labelClasses}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" className={inputClasses} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className={labelClasses}>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number" className={inputClasses} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
              <label className={labelClasses}>College / University</label>
              <input type="text" name="college" value={formData.college} onChange={handleChange} required placeholder="Enter your college name" className={inputClasses} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Department</label>
                <input required type="text" name="department" list="dept-list" value={formData.department} onChange={handleChange} placeholder="Select or type" className={inputClasses} />
                <datalist id="dept-list">
                  <option value="Computer Science" />
                  <option value="Information Technology (IT)" />
                  <option value="Electronics and Communication" />
                  <option value="Mechanical Engineering" />
                  <option value="Civil Engineering" />
                  <option value="Data Science" />
                  <option value="Artificial Intelligence" />
                </datalist>
              </div>
              <div>
                <label className={labelClasses}>Year</label>
                <select name="year" value={formData.year} onChange={handleChange} required className={`${inputClasses} ${!formData.year ? 'text-gray-400' : ''}`}>
                  <option value="" disabled>Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
              <label className={labelClasses}>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a password" className={inputClasses} />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center mt-2">
              <input type="checkbox" id="terms" required className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all cursor-pointer" />
              <label htmlFor="terms" className="ml-3 block text-sm font-medium text-gray-600 cursor-pointer select-none">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition">Terms & Conditions</a>
              </label>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.01, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading} 
              className={`w-full relative group overflow-hidden text-white font-bold text-lg py-4 rounded-xl mt-8 transition-all duration-300 shadow-[0_8px_20px_rgba(37,99,235,0.2)] ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)]'}`}
            >
              <span className="relative z-10">{loading ? 'Processing...' : 'Create Account'}</span>
              {!loading && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
            </motion.button>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 text-sm font-medium text-gray-500"
          >
            Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition">Login</Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
