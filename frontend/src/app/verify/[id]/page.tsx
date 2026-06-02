"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { FiCheckCircle, FiXCircle, FiDownload } from 'react-icons/fi';

export default function VerifyCertificate() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyCert = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}/api/internships/verify-certificate/${id}`);
        const result = await res.json();
        
        if (res.ok && result.valid) {
          setData(result.certificate);
        } else {
          setError(result.error || "Invalid Certificate ID");
        }
      } catch (err) {
        setError("Failed to connect to verification server.");
      } finally {
        setLoading(false);
      }
    };
    verifyCert();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">Verifying...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all hover:scale-[1.01]">
          {data ? (
            <div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 px-8 py-12 text-center text-white">
                <div className="flex justify-center mb-6">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                    <FiCheckCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Authentic Certificate</h1>
                <p className="text-green-100 text-lg font-medium">Verified securely by Aimtech Solutions</p>
              </div>
              
              <div className="p-10">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between pb-6 border-b border-gray-100 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Student</p>
                      <p className="text-2xl font-bold text-gray-900">{data.registration.user.name}</p>
                      <p className="text-gray-500">{data.registration.user.college || 'Engineering College'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Domain & Field</p>
                    <p className="text-xl text-gray-800 font-medium">{data.registration.internship.domain}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Issue Date</p>
                      <p className="text-gray-900 font-medium">{new Date(data.issueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Certificate ID</p>
                      <p className="text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block text-sm">{data.certificateId}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8">
                  <a 
                    href={`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}${data.pdfUrl}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full flex justify-center items-center gap-2 bg-gray-900 text-white font-medium px-6 py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <FiDownload className="w-5 h-5" />
                    Download Original PDF
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-8 py-20 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-red-50 p-6 rounded-full">
                  <FiXCircle className="w-20 h-20 text-red-500" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification Failed</h1>
              <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">{error}</p>
              <a href="/" className="inline-block bg-gray-100 text-gray-900 font-medium px-8 py-3 rounded-xl hover:bg-gray-200 transition">
                Return to Home
              </a>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
