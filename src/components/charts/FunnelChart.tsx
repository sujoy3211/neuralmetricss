import { motion } from 'framer-motion';
import type { FunnelStep } from '../../types';

interface FunnelChartProps {
  data: FunnelStep[];
}

export function FunnelChart({ data }: FunnelChartProps) {
  const maxValue = data[0]?.value || 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full">
      <div className="space-y-3">
        {data.map((step, index) => {
          const width = (step.value / maxValue) * 100;
          const colors = ['from-electric-400 to-electric-500', 'from-neural-400 to-neural-500', 'from-amber-400 to-amber-500', 'from-emerald-400 to-emerald-500'];

          return (
            <motion.div key={step.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-300">{step.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-gray-400">{step.value.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">({step.percentage.toFixed(1)}%)</span>
                </div>
              </div>
              <div className="h-10 bg-space-800 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-lg flex items-center justify-end pr-3`}
                >
                  {width > 20 && <span className="text-sm font-medium text-white">{step.percentage.toFixed(0)}%</span>}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-space-800/50 rounded-lg border border-space-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><p className="text-xs text-gray-500 mb-1">Visit → Signup</p><p className="font-mono text-lg text-electric-400">17.1%</p></div>
          <div><p className="text-xs text-gray-500 mb-1">Signup → Trial</p><p className="font-mono text-lg text-neural-400">43.5%</p></div>
          <div><p className="text-xs text-gray-500 mb-1">Trial → Paid</p><p className="font-mono text-lg text-amber-400">44.9%</p></div>
        </div>
      </div>
    </motion.div>
  );
}
