import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import type { MetricCardProps } from '../../types';

export function MetricCard({ title, value, change, prefix = '', suffix = '', icon, delay = 0 }: MetricCardProps) {
  const { displayValue } = useAnimatedCounter({ end: value, duration: 2000, decimals: suffix === '%' ? 2 : 0 });
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass rounded-xl p-5 border border-space-700 hover:border-electric-400/30 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-space-800 text-electric-400 group-hover:bg-electric-400/10 transition-colors">{icon}</div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{change.toFixed(1)}%
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <p className="font-mono text-2xl font-bold text-gray-100">{prefix}{displayValue}{suffix}</p>
      </div>
    </motion.div>
  );
}
