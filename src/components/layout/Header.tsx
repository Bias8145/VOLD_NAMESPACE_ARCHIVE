import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Menu, X, Android, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/roms', label: 'ROMs' },
    { path: '/about', label: 'About' }
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0f0f1a]/80 backdrop-blur-xl border-b border-[#2a2a4e]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl"
            >
              <Android className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              VOLD_NAMESPACE
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-[#2a2a4e] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1e1e3a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Bias8145"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a4e] rounded-lg transition-colors"
            >
              <Github size={20} />
            </a>
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e3a] rounded-lg">
                      <UserIcon size={16} className="text-indigo-400" />
                      <span className="text-sm text-gray-300 max-w-[120px] truncate">
                        {user.name || user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#2a2a4e] rounded-lg transition-colors"
                      title="Sign Out"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button size="sm">Sign In</Button>
                  </Link>
                )}
              </>
            )}
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-[#2a2a4e]"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'bg-[#2a2a4e] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#1e1e3a]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 px-4 py-3">
                        <UserIcon size={16} className="text-indigo-400" />
                        <span className="text-sm text-gray-300">{user.name || user.email}</span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-[#1e1e3a] rounded-lg"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-center font-medium"
                    >
                      Sign In
                    </Link>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
