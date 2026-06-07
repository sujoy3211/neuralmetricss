import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from '../../types';

const variants = {
  primary: 'bg-gradient-to-r from-electric-400 to-neural-500 hover:from-electric-500 hover:to-neural-600 text-white shadow-lg shadow-neural-500/25',
  secondary: 'bg-space-700 hover:bg-space-600 text-gray-200 border border-space-600',
  ghost: 'bg-transparent hover:bg-space-800 text-gray-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, onClick, disabled = false, className, type = 'button', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-electric-400 focus:ring-offset-2 focus:ring-offset-space-950',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variants[variant],
            sizes[size],
            className
          )
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
