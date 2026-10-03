import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Smartphone, Download, ExternalLink, X, AlertCircle, Loader2 } from 'lucide-react';
import ROMCard from '../components/rom/ROMCard';
import ROMForm from '../components/rom/ROMForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { ROM } from '../lib/types';

export default function ROMsPage() {
  const { user } = useAuth();
  const [roms, setRoms] = useState<ROM[]>([]);
  const [filteredROMs, setFilteredROMs] = useState<ROM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedROM, setSelectedROM] = useState<ROM | null>(null);
  const [addingROM, setAddingROM] = useState(false);

  // Fetch ROMs from Supabase
  useEffect(() => {
    fetchROMs();
  }, []);

  const fetchROMs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('roms')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        // If table doesn't exist, use mock data
        if (fetchError.code === 'PGRST116' || fetchError.message.includes('relation')) {
          console.log('ROMs table not found, using mock data');
          const mockROMs: ROM[] = [
            {
              id: '1',
              name: 'LineageOS 21',
              description: 'A free and open-source operating system for smartphones and tablet computers, based on the Android mobile platform.',
              android_version: '14.0',
              download_url: 'https://download.lineageos.org/',
              device_support: ['Pixel 7', 'Pixel 7 Pro', 'OnePlus 11', 'Samsung S23'],
              developer: 'LineageOS Team',
              github_url: 'https://github.com/LineageOS',
              features: ['Customizable UI', 'Privacy Guard', 'Theme Engine', 'Button Customization'],
              status: 'stable',
              created_at: '2024-01-15',
              updated_at: '2024-01-15',
              size_mb: 1200
            },
            {
              id: '2',
              name: 'Pixel Experience',
              description: 'A ROM that brings the Google Pixel experience to various Android devices with all Google apps and features.',
              android_version: '14.0',
              download_url: 'https://download.pixelexperience.org/',
              device_support: ['Redmi Note 12', 'Poco F5', 'Realme GT'],
              developer: 'Pixel Experience Team',
              github_url: 'https://github.com/PixelExperience',
              features: ['Pixel Launcher', 'Google Camera', 'Pixel Themes', 'Call Screening'],
              status: 'stable',
              created_at: '2024-02-10',
              updated_at: '2024-02-10',
              size_mb: 1500
            },
            {
              id: '3',
              name: 'Evolution X',
              description: 'A custom ROM based on AOSP with Pixel features and customizations. Pure Google experience with extra features.',
              android_version: '14.0',
              download_url: 'https://evolution-x.org/',
              device_support: ['Pixel 6', 'Pixel 6 Pro', 'OnePlus 9'],
              developer: 'Evolution X Team',
              github_url: 'https://github.com/Evolution-X',
              features: ['Pixel UI', 'Custom Navbar', 'Lock Screen Customization', 'Status Bar Tweaks'],
              status: 'beta',
              created_at: '2024-03-05',
              updated_at: '2024-03-05',
              size_mb: 1350
            }
          ];
          setRoms(mockROMs);
          setFilteredROMs(mockROMs);
        } else {
          throw fetchError;
        }
      } else {
        setRoms(data || []);
        setFilteredROMs(data || []);
      }
    } catch (err: any) {
      console.error('Error fetching ROMs:', err);
      setError(err.message || 'Failed to load ROMs');
    } finally {
      setLoading(false);
    }
  };
  
  // Filter ROMs
  useEffect(() => {
    let filtered = roms;
    
    if (searchQuery) {
      filtered = filtered.filter(rom =>
        rom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rom.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rom.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rom.device_support.some(device => device.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(rom => rom.status === statusFilter);
    }
    
    setFilteredROMs(filtered);
  }, [searchQuery, statusFilter, roms]);
  
  const handleAddROM = async (data: Omit<ROM, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      alert('Please sign in to add ROMs');
      return;
    }
    
    try {
      setAddingROM(true);
      
      const { error: insertError } = await supabase
        .from('roms')
        .insert([data]);
      
      if (insertError) throw insertError;
      
      setShowAddModal(false);
      fetchROMs(); // Refresh the list
    } catch (err: any) {
      console.error('Error adding ROM:', err);
      alert(err.message || 'Failed to add ROM');
    } finally {
      setAddingROM(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading ROMs...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Custom ROMs</h1>
              <p className="text-gray-400">Browse and download custom Android ROMs for your device.</p>
            </div>
            {user && (
              <Button onClick={() => setShowAddModal(true)} className="gap-2">
                <Plus size={18} />
                Add New ROM
              </Button>
            )}
          </div>
        </motion.div>
        
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
            <Button variant="ghost" size="sm" onClick={fetchROMs} className="ml-auto">
              Retry
            </Button>
          </motion.div>
        )}
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ROMs, devices, developers..."
              icon={<Search size={18} />}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-[#1e1e3a] text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('stable')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                statusFilter === 'stable'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#1e1e3a] text-gray-400 hover:text-white'
              }`}
            >
              Stable
            </button>
            <button
              onClick={() => setStatusFilter('beta')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                statusFilter === 'beta'
                  ? 'bg-amber-500 text-white'
                  : 'bg-[#1e1e3a] text-gray-400 hover:text-white'
              }`}
            >
              Beta
            </button>
            <button
              onClick={() => setStatusFilter('alpha')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                statusFilter === 'alpha'
                  ? 'bg-red-500 text-white'
                  : 'bg-[#1e1e3a] text-gray-400 hover:text-white'
              }`}
            >
              Alpha
            </button>
          </div>
        </motion.div>
        
        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-sm text-gray-400">
            Showing {filteredROMs.length} of {roms.length} ROMs
          </p>
        </motion.div>
        
        {/* ROM Grid */}
        <AnimatePresence mode="wait">
          {filteredROMs.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredROMs.map((rom, idx) => (
                <motion.div
                  key={rom.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ROMCard rom={rom} onClick={() => setSelectedROM(rom)} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-[#1e1e3a] rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No ROMs Found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters.</p>
              <Button variant="secondary" onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}>
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* ROM Detail Modal */}
        <Modal
          isOpen={!!selectedROM}
          onClose={() => setSelectedROM(null)}
          title={selectedROM?.name || 'ROM Details'}
        >
          {selectedROM && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant={selectedROM.status === 'stable' ? 'stable' : selectedROM.status === 'beta' ? 'beta' : 'alpha'}>
                    {selectedROM.status}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-2">by {selectedROM.developer}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Android {selectedROM.android_version}</div>
                  {selectedROM.size_mb && (
                    <div className="text-xs text-gray-500">{selectedROM.size_mb} MB</div>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300">{selectedROM.description}</p>
              
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Supported Devices</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedROM.device_support.map((device, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-[#1a1a2e] text-gray-300 text-sm rounded-lg">
                      {device}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedROM.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-indigo-500/20 text-indigo-400 text-sm rounded-lg">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedROM.changelog && (
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Changelog</h4>
                  <p className="text-gray-400 text-sm bg-[#1a1a2e] p-4 rounded-xl">
                    {selectedROM.changelog}
                  </p>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <a
                  href={selectedROM.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full gap-2">
                    <Download size={16} />
                    Download
                  </Button>
                </a>
                {selectedROM.github_url && (
                  <a
                    href={selectedROM.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" className="gap-2">
                      <ExternalLink size={16} />
                      GitHub
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
        
        {/* Add ROM Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New ROM"
        >
          <ROMForm
            onSubmit={handleAddROM}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
}
