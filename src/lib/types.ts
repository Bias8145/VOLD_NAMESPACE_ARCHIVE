export interface ROM {
  id: string;
  name: string;
  description: string;
  android_version: string;
  download_url: string;
  device_support: string[];
  developer: string;
  github_url?: string;
  features: string[];
  status: 'stable' | 'beta' | 'alpha';
  created_at: string;
  updated_at: string;
  size_mb?: number;
  changelog?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}
