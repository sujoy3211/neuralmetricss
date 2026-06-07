import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { BadgeProps } from '../../types';

const variants = {
  default: 'bg-space-700 text-gray-300',
  success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  error: 'bg-red-500/20 text-red-400 border border-red-500/30',
  info: 'bg-electric-400/20 text-electric-400 border border-electric-400/30',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export function Badge({ variant = 'default', size = 'sm', children, className }: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={twMerge(clsx('inline-flex items-center rounded-full font-medium', variants[variant], sizes[size], className))}
    >
      {children}
    </motion.span>
  );
}
