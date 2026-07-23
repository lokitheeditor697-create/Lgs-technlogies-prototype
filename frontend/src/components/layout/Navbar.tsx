"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isLearningModule = pathname?.startsWith('/learn/');

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    window.addEventListener('auth-change', checkUser);
    return () => window.removeEventListener('auth-change', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/images/logo.png" alt="LGS Technologies" className="h-10 sm:h-12 md:h-14 object-contain py-1" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-slate-900 transition-colors">Home</Link>
            {!isLearningModule && (
              <>
                <Link href="/#internships" className="text-sm font-semibold text-gray-600 hover:text-slate-900 transition-colors">Internships</Link>
                <Link href="/#about" className="text-sm font-semibold text-gray-600 hover:text-slate-900 transition-colors">About Us</Link>
                <Link href="/verify" className="text-sm font-semibold text-gray-600 hover:text-slate-900 transition-colors">Verify Certificate</Link>
                <Link href="/#footer" className="text-sm font-semibold text-gray-600 hover:text-slate-900 transition-colors">Contact</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="relative group">
                  <div onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 cursor-pointer py-2">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold ring-2 ring-white hover:ring-slate-200 transition-all shadow-sm">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-gray-700 hover:text-slate-900 transition font-medium">
                      {user.name} <FiChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className={`absolute right-0 top-full w-56 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-200 transform origin-top-right pt-2 ${dropdownOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100'}`}>
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                      <p className="text-base font-bold text-gray-900 truncate">{user.name}</p>
                    </div>
                    <div className="py-2 flex flex-col">
                      <Link href="/dashboard" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-slate-900 transition font-medium">
                        <FiGrid className="w-4 h-4" /> Dashboard
                      </Link>
                      {user.role === 'ADMIN' && (
                        <Link href="/admin" className="flex items-center gap-3 px-5 py-2.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 transition font-bold">
                          <FiSettings className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <Link href="/dashboard" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-slate-900 transition font-medium">
                        <FiUser className="w-4 h-4" /> My profile
                      </Link>
                      <Link href="/dashboard?tab=settings" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-slate-900 transition font-medium">
                        <FiSettings className="w-4 h-4" /> Account Settings
                      </Link>
                      <div className="h-px bg-gray-100 my-1 mx-2"></div>
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition font-medium rounded-b-xl">
                        <FiLogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-slate-900 transition">Login</Link>
                <Link href="/register" className="text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
