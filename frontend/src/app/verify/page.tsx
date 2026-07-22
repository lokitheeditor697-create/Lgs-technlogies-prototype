"use client";
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FiCheckCircle, FiXCircle, FiDownload, FiSearch, FiShield } from 'react-icons/fi';

function VerifyCertificateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlId = searchParams.get('id') || '';
  
  const [certInput, setCertInput] = useState(urlId);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const verifyCert = async (targetId: string) => {
    if (!targetId.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    setSearched(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}/api/internships/verify-certificate/${targetId.trim()}`);
      const result = await res.json();
      
      if (res.ok && result.valid) {
        setData(result.certificate);
      } else {
        setError(result.error || "Certificate ID not found in our record system.");
      }
    } catch (err) {
      setError("Failed to connect to verification server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlId) {
      setCertInput(urlId);
      verifyCert(urlId);
    }
  }, [urlId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certInput.trim()) {
      router.push(`/verify?id=${certInput.trim()}`);
      verifyCert(certInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex-1 w-full">
        
        {/* Header Search Box */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
            <FiShield className="w-4 h-4" />
            <span>Official Credential Verification</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Verify Certificate Credentials
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-medium max-w-lg mx-auto">
            Enter the unique Certificate ID found at the bottom of your certificate to instantly verify authenticity.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-10">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="Enter Certificate ID (e.g. LGS-89X2A)"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-gray-900 font-medium placeholder-gray-400 transition"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !certInput.trim()}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <FiSearch className="w-5 h-5" />
                  <span>Verify</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Verification Results Display */}
        {searched && !loading && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all">
            {data ? (
              <div>
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 px-8 py-10 text-center text-white">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                      <FiCheckCircle className="w-14 h-14 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">Authentic Certificate Verified</h2>
                  <p className="text-emerald-100 text-sm sm:text-base font-medium">Issued Officially by LGS Technologies</p>
                </div>
                
                <div className="p-8 sm:p-10 space-y-6">
                  <div className="pb-6 border-b border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Student Name</p>
                    <p className="text-2xl font-extrabold text-gray-900">{data.registration.user.name}</p>
                    <p className="text-gray-500 font-medium">{data.registration.user.college || 'College / University'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Completed Domain / Track</p>
                    <p className="text-xl text-blue-600 font-bold">{data.registration.internship.domain}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-2">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Issue Date</p>
                      <p className="text-gray-900 font-bold">{new Date(data.issueDate).toLocaleDateString('en-GB')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Certificate Reference ID</p>
                      <p className="text-gray-900 font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-lg inline-block text-sm font-bold">{data.certificateId}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <a 
                      href={`${process.env.NEXT_PUBLIC_API_URL || 'https://lgs-technlogies-prototype.onrender.com'}${data.pdfUrl}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full flex justify-center items-center gap-2 bg-gray-900 text-white font-bold px-6 py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5"
                    >
                      <FiDownload className="w-5 h-5" />
                      View Original PDF Certificate
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-8 py-14 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-red-50 p-5 rounded-full">
                    <FiXCircle className="w-16 h-16 text-red-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                <p className="text-gray-600 text-base mb-6 max-w-md mx-auto font-medium">{error}</p>
                <button 
                  onClick={() => { setCertInput(''); setSearched(false); }} 
                  className="inline-block bg-gray-100 text-gray-800 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200 transition text-sm"
                >
                  Try Another ID
                </button>
              </div>
            )}
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}

export default function VerifyCertificate() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">Loading Verification Portal...</div>}>
      <VerifyCertificateContent />
    </Suspense>
  );
}
