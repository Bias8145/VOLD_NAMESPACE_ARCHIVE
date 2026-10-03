import { Github, Android, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0f0f1a] border-t border-[#2a2a4e] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Android className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">VOLD_NAMESPACE Archive</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md mb-6">
              A curated repository for custom Android ROMs. Discover, download, and share custom ROMs with detailed version info, device compatibility, and developer resources.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Bias8145"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1e1e3a] hover:bg-[#2a2a4e] text-gray-400 hover:text-white rounded-lg transition-all"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Home</Link></li>
              <li><Link to="/roms" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">ROMs</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">About</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Sign In</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Developer</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/Bias8145" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">
                  Bias8145
                </a>
              </li>
              <li>
                <a href="https://github.com/Bias8145?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">
                  All Projects
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#2a2a4e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} VOLD_NAMESPACE Archive. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Bias8145
          </p>
        </div>
      </div>
    </footer>
  );
}
