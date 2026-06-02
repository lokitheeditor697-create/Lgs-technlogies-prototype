"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'ADMIN') {
        setIsAuthorized(true);
        fetchRegistrations();
      } else {
        alert("Access Denied: You do not have admin privileges.");
        window.location.href = '/dashboard';
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}/api/admin/registrations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setRegistrations(data);
      } else {
        setRegistrations([]);
        console.error('API did not return an array:', data);
      }
    } catch (err) {
      console.error('Failed to fetch registrations', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!window.confirm('Are you absolutely sure you want to delete this application? This action cannot be undone.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}/api/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('Application deleted successfully.');
        fetchRegistrations();
      } else {
        alert('Failed to delete application.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting.');
    }
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length < 2) return alert("CSV must have a header row and at least one data row.");

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const records = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const record: any = {};
        headers.forEach((header, idx) => {
          record[header] = values[idx] || '';
        });
        if (record.name && record.email && record.domain) {
          records.push(record);
        }
      }

      if (records.length === 0) return alert("No valid records found in CSV.");

      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}/api/admin/bulk-certificates`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ records })
        });
        
        if (res.ok) {
          alert(`Successfully generated ${records.length} certificates!`);
          fetchRegistrations();
        } else {
          alert("Failed to bulk generate certificates.");
        }
      } catch (err) {
        console.error(err);
        alert("Error during bulk generation.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthorized) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Checking authorization...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage student applications and enrollments.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">{registrations.length}</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Approvals</p>
              <p className="text-2xl font-bold text-orange-500">{registrations.filter(r => r.status === 'PENDING').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Bulk Actions & Certificates</h2>
            <p className="text-sm text-gray-500 max-w-lg">Upload a CSV file with columns: <code className="bg-gray-100 px-1 rounded">name, email, college, domain, startDate, endDate</code> to instantly generate PDF certificates.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={async () => {
                if (!window.confirm("Are you sure you want to resend all missing offer letters? This will email everyone who hasn't received one.")) return;
                try {
                  alert('Sending missing offer letters... This might take a minute depending on the number of users.');
                  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}/api/internships/resend-all-offers`);
                  const data = await res.json();
                  alert(data.message || 'Emails sent successfully!');
                } catch (e) {
                  alert('Failed to send emails. Check the server logs.');
                }
              }}
              className="bg-green-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-600/20"
            >
              Resend All Missing Offers
            </button>
            <label className="cursor-pointer bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 inline-block">
              Upload CSV
              <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-600 text-sm">Student Details</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Internship Domain</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Application Date</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Payment</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">Loading registrations...</td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">No applications found.</td>
                  </tr>
                ) : (
                  registrations.map((reg, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{reg.user?.name || 'Unknown User'}</div>
                        <div className="text-sm text-gray-500">{reg.user?.email || 'N/A'}</div>
                        <div className="text-xs text-gray-400 mt-1">{reg.user?.college || 'N/A'} • {reg.user?.phone || 'N/A'}</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {reg.internship?.title || 'Unknown Domain'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          reg.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                          reg.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                          reg.status === 'COMPLETED' ? 'bg-purple-100 text-purple-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reg.status || 'PENDING'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          reg.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {reg.paymentStatus || 'UNPAID'}
                        </span>
                      </td>
                      <td className="p-4 flex items-center gap-3">
                        {/* Task Review System */}
                        {reg.driveLink && reg.status !== 'COMPLETED' && (
                          <div className="flex flex-col gap-1">
                            <a href={reg.driveLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-900 text-sm font-medium border border-blue-200 bg-blue-50 px-2 py-1 rounded text-center inline-block">
                              View Task Link
                            </a>
                            <button 
                              onClick={async () => {
                                if(!confirm("Are you sure you want to approve this task and generate the certificate?")) return;
                                try {
                                  const token = localStorage.getItem('token');
                                  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}/api/admin/approve-task/${reg.id}`, { 
                                    method: 'POST',
                                    headers: {
                                      'Authorization': `Bearer ${token}`
                                    }
                                  });
                                  if(res.ok) {
                                    alert("Task approved & Certificate generated!");
                                    fetchRegistrations();
                                  }
                                } catch(e) {}
                              }} 
                              className="text-green-700 hover:text-green-900 text-sm font-bold bg-green-100 hover:bg-green-200 px-2 py-1 rounded transition text-center"
                            >
                              Approve & Generate Cert
                            </button>
                          </div>
                        )}
                        
                        {reg.offerLetterUrl && (
                          <a href={`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}${reg.offerLetterUrl}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium bg-indigo-50 px-2 py-1 rounded">
                            View Offer
                          </a>
                        )}

                        {reg.certificate?.pdfUrl && (
                          <a href={`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}${reg.certificate.pdfUrl}`} target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-900 text-sm font-medium bg-purple-50 px-2 py-1 rounded">
                            View Cert
                          </a>
                        )}

                        {!reg.certificate?.pdfUrl && !reg.offerLetterUrl && !(reg.driveLink && reg.status !== 'COMPLETED') && (
                          <span className="text-gray-400 text-sm font-medium">Pending Docs</span>
                        )}

                        <div className="w-px h-4 bg-gray-300 mx-1"></div>
                        <button onClick={() => handleDeleteRegistration(reg.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
