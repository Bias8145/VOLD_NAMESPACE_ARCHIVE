interface BadgeProps {
  children: React.ReactNode;
  variant?: 'stable' | 'beta' | 'alpha' | 'default';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    stable: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    beta: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    alpha: 'bg-red-500/20 text-red-400 border-red-500/30',
    default: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
