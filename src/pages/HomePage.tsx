import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Smartphone, Github, Zap, Shield, Cpu, CheckCircle2, Radio, Code2 } from 'lucide-react';
import Button from '../components/ui/Button';

const features = [
  {
    icon: Zap,
    title: 'Fast Downloads',
    description: 'Direct download links with no waiting time or speed limits.'
  },
  {
    icon: Shield,
    title: 'Verified ROMs',
    description: 'All ROMs are verified for authenticity and safety.'
  },
  {
    icon: Cpu,
    title: 'Device Support',
    description: 'Wide range of devices supported with detailed compatibility info.'
  }
];

const stats = [
  { value: '50+', label: 'Custom ROMs' },
  { value: '100+', label: 'Devices Supported' },
  { value: '10K+', label: 'Downloads' },
  { value: '24/7', label: 'Support' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e1e3a] border border-[#3a3a5e] rounded-full mb-8"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">Open Source Repository</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                VOLD_NAMESPACE
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-300">Archive</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              A curated repository for custom Android ROMs. Discover, download, and share custom ROMs with detailed version info and device compatibility.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/roms">
                <Button size="lg" className="gap-2">
                  Browse ROMs
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="https://github.com/Bias8145" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Github size={18} />
                  View on GitHub
                </Button>
              </a>
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-[#1a1a2e]/50 backdrop-blur-sm border border-[#2a2a4e] rounded-2xl">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-[#0a0a15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose VOLD_NAMESPACE?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built with developers and enthusiasts in mind, our platform offers the best experience for discovering and sharing custom ROMs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4e] border border-[#3a3a5e] rounded-2xl hover:border-indigo-500/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 lg:p-16"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Explore?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Browse our collection of custom ROMs and find the perfect one for your device.
              </p>
              <Link to="/roms">
                <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  <Download size={18} className="mr-2" />
                  Browse All ROMs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Developer Section */}
      <section className="py-20 bg-[#0a0a15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              About the Developer
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              VOLD_NAMESPACE Archive is developed and maintained by Bias8145, an open-source enthusiast passionate about Android development.
            </p>
            <a
              href="https://github.com/Bias8145"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#1e1e3a] border border-[#3a3a5e] rounded-2xl hover:border-indigo-500/50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Bias8145</div>
                <div className="text-sm text-gray-400">View GitHub Profile</div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 ml-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
