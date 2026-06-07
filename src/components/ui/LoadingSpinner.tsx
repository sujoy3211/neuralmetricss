import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <motion.div className={twMerge(clsx('relative', sizes[size], className))} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
      <div className="absolute inset-0 border-2 border-space-700 rounded-full" />
      <div className="absolute inset-0 border-2 border-transparent border-t-electric-400 rounded-full" />
    </motion.div>
  );
}
