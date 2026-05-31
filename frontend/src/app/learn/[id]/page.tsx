"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { FiCheckCircle, FiPlayCircle, FiLock, FiCheck } from 'react-icons/fi';
import 'plyr/dist/plyr.css';

const curriculums: any = {
  "Python Development": [
    { id: "py1", title: "1. Introduction & Setup", url: "NnTJnQKo90c", start: 0, end: 260 },
    { id: "py2", title: "2. Variables & Input", url: "NnTJnQKo90c", start: 260, end: 890 },
    { id: "py3", title: "3. Strings & Operators", url: "NnTJnQKo90c", start: 890, end: 1590 },
    { id: "py4", title: "4. Control Flow (If & While)", url: "NnTJnQKo90c", start: 1590, end: 2310 },
    { id: "py5", title: "5. Lists & For Loops", url: "NnTJnQKo90c", start: 2310, end: 3060 },
    { id: "py6", title: "6. Tuples & Final Exercise", url: "NnTJnQKo90c", start: 3060, end: 3600, task: "Final Project: Build a complete Python application utilizing loops, lists, and tuples." }
  ],
  "Full Stack Development": [
    { id: "fs1", title: "1. HTML & CSS Basics", url: "_YX_j_kZfwU", start: 0, end: 1800 },
    { id: "fs2", title: "2. JavaScript Fundamentals", url: "_YX_j_kZfwU", start: 1800, end: 3600 },
    { id: "fs3", title: "3. ReactJS Introduction", url: "_YX_j_kZfwU", start: 3600, end: 5400 },
    { id: "fs4", title: "4. Node.js & Express API", url: "_YX_j_kZfwU", start: 5400, end: 7200 },
    { id: "fs5", title: "5. Database Integration", url: "_YX_j_kZfwU", start: 7200, end: 9000 },
    { id: "fs6", title: "6. Full Stack Deployment", url: "_YX_j_kZfwU", start: 9000, end: 10800, task: "Final Project: Deploy a complete MERN stack application to the cloud." }
  ],
  "AI & ML Development": [
    { id: "ai1", title: "1. Intro to AI & Python", url: "Iu_5ZNAyBxc", start: 0, end: 1800 },
    { id: "ai2", title: "2. Numpy & Pandas", url: "Iu_5ZNAyBxc", start: 1800, end: 3600 },
    { id: "ai3", title: "3. Data Visualization", url: "Iu_5ZNAyBxc", start: 3600, end: 5400 },
    { id: "ai4", title: "4. Scikit-Learn Basics", url: "Iu_5ZNAyBxc", start: 5400, end: 7200 },
    { id: "ai5", title: "5. Neural Networks", url: "Iu_5ZNAyBxc", start: 7200, end: 9000 },
    { id: "ai6", title: "6. Final AI Project", url: "Iu_5ZNAyBxc", start: 9000, end: 10800, task: "Final Project: Train a complete machine learning model, evaluate its accuracy, and submit the Jupyter Notebook." }
  ],
  "Data Science": [
    { id: "ds1", title: "1. Data Science Overview", url: "y4p-4bIhy_I", start: 0, end: 1800 },
    { id: "ds2", title: "2. Data Cleaning", url: "y4p-4bIhy_I", start: 1800, end: 3600 },
    { id: "ds3", title: "3. Exploratory Data Analysis", url: "y4p-4bIhy_I", start: 3600, end: 5400 },
    { id: "ds4", title: "4. Statistical Methods", url: "y4p-4bIhy_I", start: 5400, end: 7200 },
    { id: "ds5", title: "5. Machine Learning for DS", url: "y4p-4bIhy_I", start: 7200, end: 9000 },
    { id: "ds6", title: "6. Analytics Dashboard", url: "y4p-4bIhy_I", start: 9000, end: 10800, task: "Final Project: Perform EDA on a dataset of your choice and present the insights in a dashboard or report." }
  ],
  "Data Analytics": [
    { id: "da1", title: "1. Intro to Data Analytics", url: "kdYuk1JWBzE", start: 0, end: 1800 },
    { id: "da2", title: "2. Excel for Analytics", url: "kdYuk1JWBzE", start: 1800, end: 3600 },
    { id: "da3", title: "3. SQL Fundamentals", url: "kdYuk1JWBzE", start: 3600, end: 5400 },
    { id: "da4", title: "4. Data Visualization", url: "kdYuk1JWBzE", start: 5400, end: 7200 },
    { id: "da5", title: "5. Python for Analytics", url: "kdYuk1JWBzE", start: 7200, end: 9000 },
    { id: "da6", title: "6. Final Project", url: "kdYuk1JWBzE", start: 9000, end: 10800, task: "Final Project: Create an interactive data visualization dashboard using Power BI, Tableau, or Python." }
  ],
  "Cyber Security": [
    { id: "cs1", title: "1. Cyber Security Fundamentals", url: "PI1f4DVrvvE", start: 0, end: 1800 },
    { id: "cs2", title: "2. Networking Basics", url: "PI1f4DVrvvE", start: 1800, end: 3600 },
    { id: "cs3", title: "3. Linux for Security", url: "PI1f4DVrvvE", start: 3600, end: 5400 },
    { id: "cs4", title: "4. Penetration Testing", url: "PI1f4DVrvvE", start: 5400, end: 7200 },
    { id: "cs5", title: "5. Web Application Security", url: "PI1f4DVrvvE", start: 7200, end: 9000 },
    { id: "cs6", title: "6. Security Auditing", url: "PI1f4DVrvvE", start: 9000, end: 10800, task: "Final Project: Perform a mock vulnerability assessment and write a detailed security audit report." }
  ],
  "Web Development": [
    { id: "wd1", title: "1. Internet & Hosting Basics", url: "_YX_j_kZfwU", start: 0, end: 1200 },
    { id: "wd2", title: "2. HTML5 & SEO", url: "_YX_j_kZfwU", start: 1200, end: 2400 },
    { id: "wd3", title: "3. CSS3 & Tailwind Basics", url: "_YX_j_kZfwU", start: 2400, end: 3600 },
    { id: "wd4", title: "4. JavaScript Fundamentals", url: "_YX_j_kZfwU", start: 3600, end: 4800 },
    { id: "wd5", title: "5. Responsive Layouts", url: "_YX_j_kZfwU", start: 4800, end: 6000 },
    { id: "wd6", title: "6. Final Web Project", url: "_YX_j_kZfwU", start: 6000, end: 7200, task: "Final Project: Build and deploy a fully responsive, multi-page website with a contact form." }
  ],
  "Frontend Development": [
    { id: "fe1", title: "1. Advanced HTML5 & Accessibility", url: "_YX_j_kZfwU", start: 0, end: 1200 },
    { id: "fe2", title: "2. CSS Animations & Layouts", url: "_YX_j_kZfwU", start: 1200, end: 2400 },
    { id: "fe3", title: "3. JavaScript DOM & Events", url: "_YX_j_kZfwU", start: 2400, end: 3600 },
    { id: "fe4", title: "4. React Fundamentals", url: "_YX_j_kZfwU", start: 3600, end: 4800 },
    { id: "fe5", title: "5. API Integration & Hooks", url: "_YX_j_kZfwU", start: 4800, end: 6000 },
    { id: "fe6", title: "6. Frontend Master Project", url: "_YX_j_kZfwU", start: 6000, end: 7200, task: "Final Project: Develop a responsive e-commerce product gallery with a working shopping cart using React." }
  ],
  "Backend Development": [
    { id: "be1", title: "1. Node.js Basics", url: "m_u6P5k0vP0", start: 0, end: 1200 },
    { id: "be2", title: "2. Express.js Routing", url: "m_u6P5k0vP0", start: 1200, end: 2400 },
    { id: "be3", title: "3. Database Design (MongoDB)", url: "m_u6P5k0vP0", start: 2400, end: 3600 },
    { id: "be4", title: "4. Authentication & Security", url: "m_u6P5k0vP0", start: 3600, end: 4800 },
    { id: "be5", title: "5. Advanced Middleware", url: "m_u6P5k0vP0", start: 4800, end: 6000 },
    { id: "be6", title: "6. Backend Final Project", url: "m_u6P5k0vP0", start: 6000, end: 7200, task: "Final Project: Build, document, and deploy a complete secure REST API with JWT authentication." }
  ],
  "Cloud Computing": [
    { id: "cc1", title: "1. Intro to Cloud", url: "e28M64lpwjE", start: 0, end: 1800 },
    { id: "cc2", title: "2. AWS Global Infrastructure", url: "e28M64lpwjE", start: 1800, end: 3600 },
    { id: "cc3", title: "3. IAM & Security", url: "e28M64lpwjE", start: 3600, end: 5400 },
    { id: "cc4", title: "4. Compute Services (EC2)", url: "e28M64lpwjE", start: 5400, end: 7200 },
    { id: "cc5", title: "5. Storage (S3)", url: "e28M64lpwjE", start: 7200, end: 9000 },
    { id: "cc6", title: "6. Cloud Architecture", url: "e28M64lpwjE", start: 9000, end: 10800, task: "Final Project: Design a highly available 2-tier web architecture diagram and explain its components." }
  ],
  "UI/UX Designing": [
    { id: "ui1", title: "1. UX Principles", url: "yN5BOj1W0b4", start: 0, end: 1800 },
    { id: "ui2", title: "2. User Research", url: "yN5BOj1W0b4", start: 1800, end: 3600 },
    { id: "ui3", title: "3. Wireframing", url: "yN5BOj1W0b4", start: 3600, end: 5400 },
    { id: "ui4", title: "4. Introduction to Figma", url: "yN5BOj1W0b4", start: 5400, end: 7200 },
    { id: "ui5", title: "5. High-Fidelity Design", url: "yN5BOj1W0b4", start: 7200, end: 9000 },
    { id: "ui6", title: "6. Prototyping", url: "yN5BOj1W0b4", start: 9000, end: 10800, task: "Final Project: Submit a complete high-fidelity Figma prototype for a mobile or web application." }
  ],
  "GST & Taxation": [
    { id: "gst1", title: "1. Basics of Taxation", url: "jzCKfT5iZ5A", start: 0, end: 1200 },
    { id: "gst2", title: "2. Introduction to GST", url: "jzCKfT5iZ5A", start: 1200, end: 2400 },
    { id: "gst3", title: "3. Registration Process", url: "jzCKfT5iZ5A", start: 2400, end: 3600 },
    { id: "gst4", title: "4. Input Tax Credit (ITC)", url: "jzCKfT5iZ5A", start: 3600, end: 4800 },
    { id: "gst5", title: "5. GST Returns", url: "jzCKfT5iZ5A", start: 4800, end: 6000 },
    { id: "gst6", title: "6. E-way Bills", url: "jzCKfT5iZ5A", start: 6000, end: 7200, task: "Final Project: Prepare a comprehensive mock GSTR-1 return sheet and calculate final tax liability." }
  ],
  "Digital Marketing": [
    { id: "dm1", title: "1. Marketing Fundamentals", url: "wt7a2Ip4ANk", start: 0, end: 1800 },
    { id: "dm2", title: "2. Search Engine Optimization", url: "wt7a2Ip4ANk", start: 1800, end: 3600 },
    { id: "dm3", title: "3. Content Marketing", url: "wt7a2Ip4ANk", start: 3600, end: 5400 },
    { id: "dm4", title: "4. Social Media Marketing", url: "wt7a2Ip4ANk", start: 5400, end: 7200 },
    { id: "dm5", title: "5. Paid Advertising (PPC)", url: "wt7a2Ip4ANk", start: 7200, end: 9000 },
    { id: "dm6", title: "6. Email Marketing", url: "wt7a2Ip4ANk", start: 9000, end: 10800, task: "Final Project: Create a full 30-day digital marketing strategy and content calendar for a brand." }
  ],
  "HR": [
    { id: "hr1", title: "1. Role of HR", url: "HE5eqS1njQk", start: 0, end: 1200 },
    { id: "hr2", title: "2. Recruitment & Selection", url: "HE5eqS1njQk", start: 1200, end: 2400 },
    { id: "hr3", title: "3. Employee Onboarding", url: "HE5eqS1njQk", start: 2400, end: 3600 },
    { id: "hr4", title: "4. Performance Management", url: "HE5eqS1njQk", start: 3600, end: 4800 },
    { id: "hr5", title: "5. Training & Development", url: "HE5eqS1njQk", start: 4800, end: 6000 },
    { id: "hr6", title: "6. HR Policies", url: "HE5eqS1njQk", start: 6000, end: 7200, task: "Final Project: Draft a complete employee handbook containing at least 3 major company policies." }
  ],
  "Business Analytics": [
    { id: "ba1", title: "1. Business Analysis Fundamentals", url: "BAFlTZnOs9c", start: 5, end: 1800 },
    { id: "ba2", title: "2. Requirement Gathering", url: "BAFlTZnOs9c", start: 1800, end: 3600 },
    { id: "ba3", title: "3. Process Modeling", url: "BAFlTZnOs9c", start: 3600, end: 5400 },
    { id: "ba4", title: "4. Agile & Scrum", url: "BAFlTZnOs9c", start: 5400, end: 7200 },
    { id: "ba5", title: "5. Data Analysis for BA", url: "BAFlTZnOs9c", start: 7200, end: 9000 },
    { id: "ba6", title: "6. Strategy Analysis", url: "BAFlTZnOs9c", start: 9000, end: 10800, task: "Final Project: Produce a comprehensive Business Requirements Document (BRD) for a new software feature." }
  ],
  "Tally": [
    { id: "ty1", title: "1. Basics of Accounting", url: "0u1J-lR1BwU", start: 0, end: 1800 },
    { id: "ty2", title: "2. Intro to Tally Prime", url: "0u1J-lR1BwU", start: 1800, end: 3600 },
    { id: "ty3", title: "3. Ledgers & Groups", url: "0u1J-lR1BwU", start: 3600, end: 5400 },
    { id: "ty4", title: "4. Voucher Entries", url: "0u1J-lR1BwU", start: 5400, end: 7200 },
    { id: "ty5", title: "5. Inventory Management", url: "0u1J-lR1BwU", start: 7200, end: 9000 },
    { id: "ty6", title: "6. Reporting", url: "0u1J-lR1BwU", start: 9000, end: 10800, task: "Final Project: Submit a final Balance Sheet and Profit & Loss report generated in Tally." }
  ],
  "Sales & Marketing": [
    { id: "smk1", title: "1. Sales Funnel Basics", url: "JbO_f7M-5tU", start: 0, end: 1800 },
    { id: "smk2", title: "2. Lead Generation", url: "JbO_f7M-5tU", start: 1800, end: 3600 },
    { id: "smk3", title: "3. Pitching & Negotiation", url: "JbO_f7M-5tU", start: 3600, end: 5400 },
    { id: "smk4", title: "4. Marketing Strategies", url: "JbO_f7M-5tU", start: 5400, end: 7200 },
    { id: "smk5", title: "5. Customer Relationship Management", url: "JbO_f7M-5tU", start: 7200, end: 9000 },
    { id: "smk6", title: "6. Closing the Deal", url: "JbO_f7M-5tU", start: 9000, end: 10800, task: "Final Project: Write a complete sales pitch script and mapping of a B2B sales pipeline." }
  ],
  "default": [
    { id: "df1", title: "1. Introduction to Domain", url: "WEDIj9JBTC8", start: 0, end: 1800 },
    { id: "df2", title: "2. Advanced Techniques", url: "WEDIj9JBTC8", start: 1800, end: 3600, task: "Final Project: Implement the advanced techniques shown into a small mini-project." }
  ]
};

function VideoPlayer({ module }: { module: any }) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playerRef.current) return;
    let playerInstance: any = null;
    
    // Dynamically import vanilla Plyr to avoid SSR 'window is not defined' errors
    import('plyr').then((PlyrModule) => {
      const Plyr = PlyrModule.default;
      playerInstance = new Plyr(playerRef.current!, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        youtube: { 
          noCookie: true, 
          modestbranding: 1, 
          rel: 0, 
          showinfo: 0, 
          iv_load_policy: 3, 
          start: module.start, 
          end: module.end 
        }
      });
    });

    return () => {
      try {
        if (playerInstance) playerInstance.destroy();
      } catch (e) {}
    };
  }, [module]);

  const iframeHtml = `
    <iframe
      src="https://www.youtube-nocookie.com/embed/${module.url}?origin=http://localhost:3001&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1"
      allowfullscreen
      allow="autoplay; fullscreen; picture-in-picture"
      style="${module.url === 'jzCKfT5iZ5A' ? 'transform: scale(1.2); transform-origin: center;' : ''}"
    ></iframe>
  `;

  return (
    <div 
      className="plyr__video-embed h-full w-full relative overflow-hidden" 
      ref={playerRef}
      dangerouslySetInnerHTML={{ __html: iframeHtml }}
    />
  );
}

export default function LearningPortal() {
  const { id } = useParams();
  const router = useRouter();
  const [registration, setRegistration] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [progress, setProgress] = useState<string[]>([]); // Array of completed module IDs
  const [loading, setLoading] = useState(true);
  
  const [taskLink, setTaskLink] = useState('');
  const [submitType, setSubmitType] = useState('task'); // 'task' or 'linkedin'
  const [mounted, setMounted] = useState(false);

  const fetchRegistration = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internships/registration/${id}`);
      const data = await res.json();
      setRegistration(data);
      
      const domain = data.internship.domain;
      
      const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalizedDomain = normalize(domain);
      
      let matchedModules = curriculums["default"];
      for (const key in curriculums) {
        if (key === "default") continue;
        const normKey = normalize(key);
        if (
          normKey === normalizedDomain || 
          (normalizedDomain.length > 5 && normKey.startsWith(normalizedDomain)) ||
          (normKey.length > 5 && normalizedDomain.startsWith(normKey))
        ) {
          matchedModules = curriculums[key];
          break;
        }
      }
      
      setModules(matchedModules);
      setProgress(JSON.parse(data.progress || "[]"));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchRegistration();
  }, [id]);

  useEffect(() => {
    // Reset submission state when switching modules
    setTaskLink('');
    setSubmitType('task');
  }, [currentModuleIndex]);

  const markModuleComplete = async () => {
    const currentModule = modules[currentModuleIndex];
    if (!currentModule || progress.includes(currentModule.id)) return;

    const newProgress = [...progress, currentModule.id];
    setProgress(newProgress);
    
    // Save to backend
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internships/progress/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progressStr: JSON.stringify(newProgress) })
    });

    if (currentModuleIndex + 1 < modules.length) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const submitAndCompleteFinal = async () => {
    const currentModule = modules[currentModuleIndex];
    if (!currentModule || progress.includes(currentModule.id)) return;
    
    if (!taskLink || !taskLink.startsWith('http')) {
      return alert("Please enter a valid URL (starting with http or https).");
    }

    try {
      // Save to backend (Task endpoint) as a simple string since it's only one task
      const taskRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internships/task/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driveLink: taskLink })
      });

      if (!taskRes.ok) throw new Error("Failed to submit task");
      
      setRegistration({ ...registration, driveLink: taskLink });

      // Mark Final Module as Complete
      const newProgress = [...progress, currentModule.id];
      setProgress(newProgress);
      
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internships/progress/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progressStr: JSON.stringify(newProgress) })
      });

      setTaskLink('');

      // Complete Internship
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internships/mock-complete/${id}`, { method: 'POST' });
      alert("🎉 Congratulations! You have completed all modules and submitted your final project! You can now claim your certificate.");
      router.push('/dashboard');
      
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting. Please try again.");
    }
  };

  if (loading || !registration) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  const currentModule = modules[currentModuleIndex];
  if (!currentModule) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading Module...</div>;

  const isCurrentComplete = progress.includes(currentModule.id);
  const isFinalModule = currentModuleIndex === modules.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Video Player Section */}
        <div className="flex-1">
          <div className="bg-black rounded-2xl overflow-hidden shadow-lg aspect-video mb-6 relative plyr-wrapper">
            {mounted && currentModule && (
              <VideoPlayer key={currentModule.id} module={currentModule} />
            )}
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .plyr-wrapper {
              --plyr-color-main: #2563eb;
            }
            .plyr--video {
              height: 100%;
              border-radius: 1rem;
            }
          `}} />
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{currentModule.title}</h2>
              {isCurrentComplete ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                  <FiCheckCircle className="mr-2" /> Completed
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-yellow-100 text-yellow-800">
                  <FiPlayCircle className="mr-2" /> In Progress
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">
              Watch the video lesson completely before marking it as finished.
              {isFinalModule && " This is the final module. You must submit your final project to complete the internship."}
            </p>

            {isCurrentComplete ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900">Module Completed</h3>
                  <p className="text-sm text-green-700 mt-1">You have successfully finished this module.</p>
                </div>
              </div>
            ) : !isFinalModule ? (
              <button 
                onClick={markModuleComplete}
                className="bg-green-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-green-700 transition shadow-[0_4px_15px_rgba(22,163,74,0.2)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.3)] flex items-center gap-2"
              >
                <FiCheckCircle className="text-xl" /> Mark Module as Completed
              </button>
            ) : (
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden mt-8">
                <div className="bg-blue-600 p-5 text-white">
                  <h3 className="font-bold flex items-center gap-2 text-lg">
                    <FiLock /> Complete Internship Requirement
                  </h3>
                  <p className="text-sm text-blue-100 mt-1">To complete this internship, you must submit the final project OR share your offer letter.</p>
                </div>
                
                <div className="p-6">
                  {/* Tabs */}
                  <div className="flex bg-gray-100 p-1.5 rounded-xl mb-6 relative">
                    <button 
                      onClick={() => setSubmitType('task')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all z-10 ${submitType === 'task' ? 'text-blue-600 shadow-sm bg-white' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      Option A: Final Project
                    </button>
                    <button 
                      onClick={() => setSubmitType('linkedin')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all z-10 ${submitType === 'linkedin' ? 'text-blue-600 shadow-sm bg-white' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      Option B: Share on LinkedIn
                    </button>
                  </div>

                  {submitType === 'task' ? (
                    <div className="space-y-4">
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <span className="text-xs font-extrabold text-blue-500 uppercase tracking-wider">Assigned Task</span>
                        <p className="text-blue-900 font-medium mt-2 leading-relaxed">{currentModule.task || "Final Project"}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Google Drive / GitHub Link</label>
                        <input 
                          type="url" 
                          placeholder="https://github.com/..." 
                          value={taskLink}
                          onChange={(e) => setTaskLink(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <span className="text-xs font-extrabold text-blue-500 uppercase tracking-wider">Alternative Completion</span>
                        <p className="text-blue-900 font-medium mt-2 leading-relaxed">
                          Can't complete the final project? Post a screenshot or PDF of your Offer Letter on LinkedIn, tag LGS Technologies, and paste the post link below.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn Post Link</label>
                        <input 
                          type="url" 
                          placeholder="https://linkedin.com/posts/..." 
                          value={taskLink}
                          onChange={(e) => setTaskLink(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={submitAndCompleteFinal}
                    className="w-full mt-8 bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-[0_4px_15px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] flex justify-center items-center gap-2"
                  >
                    Submit & Complete Internship
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Curriculum Sidebar */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-gray-100 bg-gray-900">
              <h3 className="text-xl font-bold text-white mb-2">{registration.internship.domain} Curriculum</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${(progress.length / modules.length) * 100}%` }}></div>
              </div>
              <p className="text-gray-400 text-sm">{progress.length} of {modules.length} modules completed</p>
            </div>
            
            <div className="divide-y divide-gray-100">
              {modules.map((mod, idx) => {
                const isComplete = progress.includes(mod.id);
                const isActive = currentModuleIndex === idx;
                const isFinal = idx === modules.length - 1;
                
                return (
                  <button 
                    key={mod.id}
                    onClick={() => setCurrentModuleIndex(idx)}
                    className={`w-full text-left p-5 transition flex items-center ${isActive ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${isComplete ? 'bg-green-100 text-green-600' : isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                      {isComplete ? <FiCheck /> : idx + 1}
                    </div>
                    <div>
                      <h4 className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>{mod.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{isComplete ? 'Completed' : isFinal ? 'Final Project' : 'Video Lesson'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
