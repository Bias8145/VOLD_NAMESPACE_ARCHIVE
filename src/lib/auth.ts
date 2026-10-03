import { supabase } from './supabase';
import type { User } from './types';

export async function signUp(email: string, password: string, name?: string): Promise<User> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${window.location.origin}/`
    }
  });
  
  if (error) throw error;
  
  if (!data.user) {
    throw new Error('Failed to create user');
  }
  
  return {
    id: data.user.id,
    email: data.user.email!,
    name: name || undefined
  };
}

export async function signIn(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  
  if (!data.user) {
    throw new Error('Failed to sign in');
  }
  
  return {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.user_metadata?.name
  };
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email!,
    name: user.user_metadata?.name
  };
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    setTimeout(() => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name
        });
      } else {
        callback(null);
      }
    }, 0);
  });
}
