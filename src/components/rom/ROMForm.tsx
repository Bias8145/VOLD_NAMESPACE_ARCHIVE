import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import type { ROM } from '../../lib/types';

interface ROMFormProps {
  onSubmit: (data: Omit<ROM, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  initialData?: Partial<ROM>;
  onCancel: () => void;
}

export default function ROMForm({ onSubmit, initialData, onCancel }: ROMFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    android_version: initialData?.android_version || '',
    download_url: initialData?.download_url || '',
    device_support: initialData?.device_support || [],
    developer: initialData?.developer || '',
    github_url: initialData?.github_url || '',
    features: initialData?.features || [],
    status: initialData?.status || 'stable' as const,
    size_mb: initialData?.size_mb || undefined,
    changelog: initialData?.changelog || ''
  });
  const [deviceInput, setDeviceInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };
  
  const addDevice = () => {
    if (deviceInput.trim()) {
      setFormData(prev => ({
        ...prev,
        device_support: [...prev.device_support, deviceInput.trim()]
      }));
      setDeviceInput('');
    }
  };
  
  const removeDevice = (index: number) => {
    setFormData(prev => ({
      ...prev,
      device_support: prev.device_support.filter((_, i) => i !== index)
    }));
  };
  
  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };
  
  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="ROM Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., LineageOS 21"
          required
        />
        <Input
          label="Developer"
          value={formData.developer}
          onChange={(e) => setFormData(prev => ({ ...prev, developer: e.target.value }))}
          placeholder="Developer name"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Android Version"
          value={formData.android_version}
          onChange={(e) => setFormData(prev => ({ ...prev, android_version: e.target.value }))}
          placeholder="e.g., 14.0"
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ROM['status'] }))}
            className="w-full bg-[#1e1e3a] border border-[#3a3a5e] rounded-xl px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="stable">Stable</option>
            <option value="beta">Beta</option>
            <option value="alpha">Alpha</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the ROM features and highlights..."
          rows={3}
          className="w-full bg-[#1e1e3a] border border-[#3a3a5e] rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          required
        />
      </div>
      
      <Input
        label="Download URL"
        value={formData.download_url}
        onChange={(e) => setFormData(prev => ({ ...prev, download_url: e.target.value }))}
        placeholder="https://example.com/rom.zip"
        type="url"
        required
      />
      
      <Input
        label="GitHub URL (Optional)"
        value={formData.github_url}
        onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
        placeholder="https://github.com/..."
        type="url"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Size (MB, Optional)"
          value={formData.size_mb || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, size_mb: e.target.value ? Number(e.target.value) : undefined }))}
          placeholder="e.g., 1200"
          type="number"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Supported Devices</label>
        <div className="flex gap-2 mb-3">
          <Input
            value={deviceInput}
            onChange={(e) => setDeviceInput(e.target.value)}
            placeholder="Add device name"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDevice())}
          />
          <Button type="button" onClick={addDevice} size="sm" className="shrink-0">
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.device_support.map((device, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2a2a4e] text-gray-300 text-sm rounded-lg">
              {device}
              <button type="button" onClick={() => removeDevice(idx)} className="text-gray-500 hover:text-red-400">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
        <div className="flex gap-2 mb-3">
          <Input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="Add feature"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} size="sm" className="shrink-0">
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.features.map((feature, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2a2a4e] text-gray-300 text-sm rounded-lg">
              {feature}
              <button type="button" onClick={() => removeFeature(idx)} className="text-gray-500 hover:text-red-400">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Changelog (Optional)</label>
        <textarea
          value={formData.changelog}
          onChange={(e) => setFormData(prev => ({ ...prev, changelog: e.target.value }))}
          placeholder="What's new in this version..."
          rows={3}
          className="w-full bg-[#1e1e3a] border border-[#3a3a5e] rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? 'Update ROM' : 'Add ROM'}
        </Button>
      </div>
    </form>
  );
}
