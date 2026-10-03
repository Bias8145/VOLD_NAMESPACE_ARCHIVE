import { motion } from 'framer-motion';
import { Download, ExternalLink, Smartphone, Calendar } from 'lucide-react';
import Badge from '../ui/Badge';
import type { ROM } from '../../lib/types';

interface ROMCardProps {
  rom: ROM;
  onClick?: () => void;
}

export default function ROMCard({ rom, onClick }: ROMCardProps) {
  const statusVariant = rom.status === 'stable' ? 'stable' : rom.status === 'beta' ? 'beta' : 'alpha';
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4e] border border-[#3a3a5e] rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
              {rom.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">by {rom.developer}</p>
          </div>
          <Badge variant={statusVariant}>{rom.status}</Badge>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {rom.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Smartphone size={14} className="text-indigo-400" />
            Android {rom.android_version}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} className="text-purple-400" />
            {new Date(rom.created_at).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {rom.device_support.slice(0, 3).map((device, idx) => (
            <span key={idx} className="px-2 py-1 bg-[#1a1a2e] text-gray-400 text-xs rounded-lg">
              {device}
            </span>
          ))}
          {rom.device_support.length > 3 && (
            <span className="px-2 py-1 bg-[#1a1a2e] text-indigo-400 text-xs rounded-lg">
              +{rom.device_support.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 pt-4 border-t border-[#3a3a5e]">
          <motion.a
            href={rom.download_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-xl"
          >
            <Download size={16} />
            Download
          </motion.a>
          {rom.github_url && (
            <motion.a
              href={rom.github_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 bg-[#2a2a4e] text-gray-400 hover:text-white rounded-xl transition-colors"
            >
              <ExternalLink size={16} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
