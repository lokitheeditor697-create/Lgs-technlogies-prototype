import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#FAFAFC] border-t border-gray-200 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="LGS Technologies" className="h-12 sm:h-14 object-contain" />
            </div>
            <p className="text-gray-500 text-sm font-medium mb-4">
              Empowering students with real-world skills and practical experience through industry-recognized internships.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.linkedin.com/in/lgs-technologies-397110423/" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/lgs_technologies/" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#internships" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition">Tech Internships</Link></li>
              <li><Link href="/#internships" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition">Non-Tech Internships</Link></li>
              <li><Link href="/verify" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition">Verify Certificate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition">About Us</Link></li>
              <li><Link href="/#footer" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Connect With Us</h3>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-600 w-4 h-4" />
                <a href="mailto:lgstechnologiess@gmail.com" className="hover:text-blue-600 transition">lgstechnologiess@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <FaLinkedin className="text-blue-600 w-4 h-4" />
                <a href="https://www.linkedin.com/in/lgs-technologies-397110423/" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">LinkedIn Page</a>
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram className="text-pink-600 w-4 h-4" />
                <a href="https://www.instagram.com/lgs_technologies/" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition">Instagram Profile</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">&copy; {new Date().getFullYear()} LGS Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/lgs-technologies-397110423/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/lgs_technologies/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
