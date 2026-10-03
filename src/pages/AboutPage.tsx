import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Users, GitBranch, Heart, Shield, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

export default function AboutPage() {
  const techStack = [
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Supabase',
    'Vite'
  ];
  
  const keyFeatures = [
    {
      icon: GitBranch,
      title: 'Version Tracking',
      description: 'Track Android versions and ROM updates easily.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by the community, for the community.'
    },
    {
      icon: Heart,
      title: 'Open Source',
      description: '100% open source and free to use forever.'
    }
  ];
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6"
            >
              <Code className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">About VOLD_NAMESPACE Archive</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A modern, open-source repository for custom Android ROMs built with passion for the Android community.
            </p>
          </div>
          
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4e] border border-[#3a3a5e] rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              VOLD_NAMESPACE Archive aims to provide a centralized, user-friendly platform for discovering and sharing custom Android ROMs. We believe in the power of open-source software and want to make it easier for enthusiasts to find the perfect ROM for their devices.
            </p>
          </motion.div>
          
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {keyFeatures.map((feature, idx) => (
                <div key={idx} className="p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4e] border border-[#3a3a5e] rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Built With</h2>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-[#1a1a2e] border border-[#3a3a5e] text-gray-300 rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
          
          {/* Developer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4e] border border-[#3a3a5e] rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Developer</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Github className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold text-white mb-2">Bias8145</h3>
                <p className="text-gray-400 mb-4">
                  Open-source enthusiast and Android developer passionate about creating tools for the community.
                </p>
                <a
                  href="https://github.com/Bias8145"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" className="gap-2">
                    <Github size={18} />
                    View GitHub Profile
                    <ExternalLink size={14} />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-white font-semibold">Disclaimer</span>
            </div>
            <p className="text-gray-400 text-sm">
              VOLD_NAMESPACE Archive is not responsible for any damage caused to your device by installing custom ROMs. 
              Always ensure you have proper backups and follow the installation instructions carefully.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
