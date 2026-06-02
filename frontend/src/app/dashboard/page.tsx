"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import { 
  FiGrid, FiUser, FiBookOpen, FiStar, FiClipboard, 
  FiHeart, FiShoppingBag, FiMessageCircle, FiSettings,
  FiCheckCircle, FiClock, FiCreditCard
} from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const getDomainImage = (domain: string) => {
  const mapping: Record<string, string> = {
    'Full Stack Development': '/images/fullstack_banner.png',
    'Python Development': '/images/python_banner.png',
    'AI & ML Development': '/images/ai_ml_banner.png',
    'Data Science': '/images/data_science_banner.png',
    'Data Analytics': '/images/data_analytics_banner.png',
    'Cyber Security': '/images/cyber_security_banner.png',
    'Web Development': '/images/frontend_banner.png',
    'Cloud Computing': '/images/cloud_computing_banner.png',
    'UI/UX Designing': '/images/ui_ux_banner.png',
    'GST & Taxation': '/images/gst_taxation_banner.png',
    'Digital Marketing': '/images/digital_marketing_banner.png',
    'HR': '/images/hr_banner.png',
    'Business Analytics': '/images/business_analytics_banner.png',
    'Tally': '/images/tally_banner.png',
    'Sales & Marketing': '/images/sales_marketing_banner.png',
  };
  return mapping[domain] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80';
};

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeSidebar, setActiveSidebar] = useState('Enrolled Courses');
  const [activeCourseTab, setActiveCourseTab] = useState<'all' | 'active' | 'completed'>('all');
  
  const [formData, setFormData] = useState({ 
    name: '', college: '', phone: '', 
    currentPassword: '', newPassword: '', confirmPassword: '' 
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchRegistrations = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internships/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setRegistrations(data);
      } else {
        console.error('API Error:', data.error);
      }
    } catch (err) {
      console.error('Failed to fetch registrations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({ 
        name: parsedUser.name || '', 
        college: parsedUser.college || '', 
        phone: parsedUser.phone || '', 
        currentPassword: '', newPassword: '', confirmPassword: '' 
      });
      fetchRegistrations(parsedUser.id);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleGenerateCertificate = async (registrationId: string) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internships/generate-certificate/${registrationId}`, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (res.ok) {
        alert('Certificate generated successfully! It has also been sent to your email.');
        fetchRegistrations(user.id);
      } else {
        alert(data.error || 'Failed to generate certificate.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Failed to generate certificate.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert("New passwords do not match!");
        setIsSaving(false);
        return;
      }
      if (!formData.currentPassword) {
        alert("Please enter your current password to set a new one.");
        setIsSaving(false);
        return;
      }
    }
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('auth-change'));
        alert("Profile updated successfully!");
        setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        alert(data.error || "Failed to update profile");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user || loading) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;

  const sidebarItems = [
    { name: 'Dashboard', icon: FiGrid },
    { name: 'Enrolled Courses', icon: FiBookOpen },
    { name: 'Order History', icon: FiShoppingBag },
    { name: 'Settings', icon: FiSettings },
  ];

  const completedCount = registrations.filter(r => r.status === 'COMPLETED').length;
  
  let displayedRegistrations = registrations;
  if (activeCourseTab === 'active') {
    displayedRegistrations = registrations.filter(r => r.status === 'APPROVED');
  } else if (activeCourseTab === 'completed') {
    displayedRegistrations = registrations.filter(r => r.status === 'COMPLETED');
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Navbar />
      
      {/* Top spacer for navbar */}
      <div className="pt-24 pb-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Greeting Block */}
        <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-8">
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-gray-500 text-lg">Hello,</p>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden py-4">
              {sidebarItems.map((item, idx) => {
                const isActive = activeSidebar === item.name;
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSidebar(item.name)}
                    className={`w-full flex items-center gap-4 px-6 py-3.5 text-left font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            
            {activeSidebar === 'Enrolled Courses' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Enrolled Courses</h2>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                  <button 
                    onClick={() => setActiveCourseTab('all')}
                    className={`whitespace-nowrap px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeCourseTab === 'all' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Enrolled Courses ({registrations.length})
                  </button>
                  <button 
                    onClick={() => setActiveCourseTab('active')}
                    className={`whitespace-nowrap px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeCourseTab === 'active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Active Courses
                  </button>
                  <button 
                    onClick={() => setActiveCourseTab('completed')}
                    className={`whitespace-nowrap px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeCourseTab === 'completed' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Completed Courses ({completedCount})
                  </button>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedRegistrations.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-300 rounded-xl">
                      No courses found in this category.
                    </div>
                  ) : (
                    displayedRegistrations.map((reg, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                          <img 
                            src={getDomainImage(reg.internship.domain)} 
                            alt={`${reg.internship.domain} Thumbnail`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                            {reg.internship.domain}
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex items-center gap-1 text-yellow-400 mb-2">
                            <FaStar className="w-4 h-4" />
                            <FaStar className="w-4 h-4" />
                            <FaStar className="w-4 h-4" />
                            <FaStar className="w-4 h-4" />
                            <FaStarHalfAlt className="w-4 h-4" />
                            <span className="text-gray-900 font-bold ml-1 text-sm">4.75</span>
                            <span className="text-gray-500 text-sm">(16)</span>
                          </div>
                          
                          <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2 leading-tight">
                            {reg.internship.duration} {reg.internship.title}
                          </h3>
                          
                          <div className="mt-auto">
                            {reg.status === 'COMPLETED' ? (
                              <div>
                                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                  <span>Progress</span>
                                  <span className="text-green-600">100% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                                  <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                                </div>
                                {reg.paymentStatus !== 'PAID' ? (
                                  <button onClick={() => handleGenerateCertificate(reg.id)} disabled={isSaving} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-sm flex justify-center items-center gap-2 disabled:bg-blue-400">
                                    <FiCheckCircle /> Generate Certificate
                                  </button>
                                ) : (
                                  <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${reg.certificate?.pdfUrl || '#'}`} target="_blank" rel="noreferrer" className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition text-sm flex justify-center items-center gap-2">
                                    <FiCheckCircle /> Download Certificate
                                  </a>
                                )}
                              </div>
                            ) : (
                              <div>
                                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                                  <span>Status</span>
                                  <span className="text-blue-600">Ongoing</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
                                  <div className="bg-blue-500 h-1.5 rounded-full w-1/3 relative">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Link href={`/learn/${reg.id}`} className="block w-full py-2.5 bg-blue-600 text-white hover:bg-blue-700 text-center rounded-lg font-bold transition text-sm shadow-sm">
                                    Continue Learning
                                  </Link>
                                  {reg.offerLetterUrl && (
                                    <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${reg.offerLetterUrl}`} target="_blank" rel="noreferrer" className="block w-full py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-center rounded-lg font-bold transition text-sm">
                                      Download Offer Letter
                                    </a>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeSidebar === 'Settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Account Settings</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-gray-50/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">College / University</label>
                    <input type="text" required value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-gray-50/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-gray-400 font-normal">(Read-only)</span></label>
                    <input type="email" readOnly value={user.email} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none" />
                  </div>
                  <div className="pt-6 border-t border-gray-100 mt-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Current Password <span className="text-gray-400 font-normal">(Required to change password)</span></label>
                        <input type="password" value={formData.currentPassword} onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-gray-50/50" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                          <input type="password" value={formData.newPassword} onChange={(e) => setFormData({...formData, newPassword: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-gray-50/50" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                          <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-gray-50/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition disabled:bg-blue-400 shadow-sm">
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeSidebar === 'Dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-2xl">
                      <FiBookOpen />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Enrolled</p>
                      <h3 className="text-2xl font-bold text-gray-900">{registrations.length}</h3>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-2xl">
                      <FiCheckCircle />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Completed</p>
                      <h3 className="text-2xl font-bold text-gray-900">{completedCount}</h3>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-2xl">
                      <FiClock />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">In Progress</p>
                      <h3 className="text-2xl font-bold text-gray-900">{registrations.length - completedCount}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Recent Activity</h3>
                    <button onClick={() => setActiveSidebar('Enrolled Courses')} className="text-blue-600 text-sm font-bold hover:underline">View All</button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {registrations.slice(0, 3).length === 0 ? (
                      <div className="p-8 text-center text-gray-500">No recent activity.</div>
                    ) : (
                      registrations.slice(0, 3).map((reg, idx) => (
                        <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
                          <div className="flex items-center gap-4">
                            <img src={getDomainImage(reg.internship.domain)} className="w-16 h-12 object-cover rounded-lg" alt="" />
                            <div>
                              <h4 className="font-bold text-gray-900">{reg.internship.title}</h4>
                              <p className="text-sm text-gray-500">Status: {reg.status}</p>
                            </div>
                          </div>
                          <Link href={`/learn/${reg.id}`} className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                            Continue
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSidebar === 'Order History' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                  <p className="text-sm text-gray-500 mt-1">View all your course purchases and certificate payments.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-bold border-b border-gray-100">Course</th>
                        <th className="px-6 py-4 font-bold border-b border-gray-100">Date</th>
                        <th className="px-6 py-4 font-bold border-b border-gray-100">Amount</th>
                        <th className="px-6 py-4 font-bold border-b border-gray-100">Status</th>
                        <th className="px-6 py-4 font-bold border-b border-gray-100">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {registrations.filter(r => r.paymentStatus === 'PAID').length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                        </tr>
                      ) : (
                        registrations.filter(r => r.paymentStatus === 'PAID').map((reg, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <p className="font-bold text-gray-900">{reg.internship.title}</p>
                              <p className="text-xs text-gray-500">Certificate Fee</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {new Date(reg.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-900">
                              ₹{reg.internship.price}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                {reg.paymentStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">
                              <span className="text-gray-400">{reg.paymentId || 'N/A'}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
