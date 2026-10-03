import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Android, ArrowLeft, Eye, EyeOff, Info } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase } from '../lib/supabase';

const DEFAULT_PASSWORD = '81458145';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: DEFAULT_PASSWORD
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { name: formData.name },
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (signUpError) throw signUpError;
        
        if (data.user && !data.session) {
          setSuccess('Account created! Please check your email to verify your account.');
        } else {
          navigate('/');
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        
        if (signInError) throw signInError;
        
        navigate('/');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (err.message.includes('already registered')) {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.message.includes('Password')) {
        setError('Password must be at least 6 characters.');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const fillDefaultPassword = () => {
    setFormData(prev => ({ ...prev, password: DEFAULT_PASSWORD }));
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4e] border border-[#3a3a5e] rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4"
            >
              <Android className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isSignUp
                ? 'Sign up to start sharing your ROMs'
                : 'Sign in to your VOLD_NAMESPACE account'}
            </p>
          </div>
          
          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm"
            >
              {success}
            </motion.div>
          )}
          
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}
          
          {/* Default Password Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-indigo-300 mb-2">
                  Default password is set to: <code className="px-2 py-0.5 bg-indigo-500/20 rounded font-mono">{DEFAULT_PASSWORD}</code>
                </p>
                <button
                  type="button"
                  onClick={fillDefaultPassword}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                >
                  Click to use default password
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                icon={<User size={18} />}
                required
              />
            )}
            
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="you@example.com"
              icon={<Mail size={18} />}
              required
            />
            
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                icon={<Lock size={18} />}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <p className="text-xs text-gray-500">
              Password must be at least 6 characters. Default: <span className="text-indigo-400 font-mono">{DEFAULT_PASSWORD}</span>
            </p>
            
            <Button type="submit" loading={loading} className="w-full mt-6">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>
          
          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
          
          {/* Developer Info */}
          <div className="mt-8 pt-6 border-t border-[#3a3a5e]">
            <p className="text-center text-xs text-gray-500">
              Developed by{' '}
              <a
                href="https://github.com/Bias8145"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Bias8145
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
