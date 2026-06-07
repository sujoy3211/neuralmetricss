import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TooltipProps } from '../../types';

const positions = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`absolute z-50 ${positions[position]}`}
          >
            <div className="bg-space-800 text-gray-200 text-xs px-2.5 py-1.5 rounded-lg shadow-lg border border-space-700 whitespace-nowrap">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
