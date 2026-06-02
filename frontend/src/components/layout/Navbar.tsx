"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white border border-gray-200 z-50 rounded-full shadow-lg transition-all duration-300">
      <div className="px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/images/logo.png" alt="LGS Technologies" className="h-10 object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            {!isLearningModule && (
              <>
                <Link href="/#internships" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Internships</Link>
                <Link href="/#about" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">About Us</Link>
                <Link href="/verify" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Verify Certificate</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer py-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold ring-2 ring-white hover:ring-blue-200 transition-all shadow-sm">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-gray-700 hover:text-gray-900 transition font-medium">
                      {user.name} <FiChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="absolute right-0 top-full w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:scale-100 scale-95 pt-2">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                      <p className="text-base font-bold text-gray-900 truncate">{user.name}</p>
                    </div>
                    <div className="py-2 flex flex-col">
                      <Link href={user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition font-medium">
                        <FiGrid className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/dashboard" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition font-medium">
                        <FiUser className="w-4 h-4" /> My profile
                      </Link>
                      <Link href="/dashboard?tab=settings" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition font-medium">
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
                <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition">Login</Link>
                <Link href="/register" className="text-sm font-bold bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(37,99,235,0.4)] transition-all">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
