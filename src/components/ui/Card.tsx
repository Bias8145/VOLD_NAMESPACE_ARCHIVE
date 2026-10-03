import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)' } : {}}
      transition={{ duration: 0.2 }}
      className={`bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4e] border border-[#3a3a5e] rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
