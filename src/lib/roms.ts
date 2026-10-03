import { supabase } from './supabase';
import type { ROM } from './types';

export async function getROMs(): Promise<ROM[]> {
  const { data, error } = await supabase
    .from('roms')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getROMById(id: string): Promise<ROM | null> {
  const { data, error } = await supabase
    .from('roms')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) return null;
  return data;
}

export async function createROM(rom: Omit<ROM, 'id' | 'created_at' | 'updated_at'>): Promise<ROM> {
  const { data, error } = await supabase
    .from('roms')
    .insert([rom])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateROM(id: string, updates: Partial<ROM>): Promise<ROM> {
  const { data, error } = await supabase
    .from('roms')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteROM(id: string): Promise<void> {
  const { error } = await supabase
    .from('roms')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
