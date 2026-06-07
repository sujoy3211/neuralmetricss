import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle, Activity, Shield, ChevronRight, ChevronDown } from 'lucide-react';
import type { AIInsightCardProps } from '../../types';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Revenue: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  Churn: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  Growth: { bg: 'bg-electric-400/10', text: 'text-electric-400', border: 'border-electric-400/30' },
  Security: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
  Performance: { bg: 'bg-neural-400/10', text: 'text-neural-400', border: 'border-neural-400/30' },
};

export function AIInsightCard({ insight, delay = 0 }: AIInsightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const colors = categoryColors[insight.category] || categoryColors.Growth;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }} className="glass rounded-xl p-4 border border-space-700 hover:border-space-600 transition-all">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} flex-shrink-0`}>{iconMap[insight.icon] || <Activity className="w-5 h-5" />}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-200 truncate">{insight.title}</h4>
            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{new Date(insight.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}>{insight.category}</span>
            <span className="text-xs text-gray-500">Confidence: <span className="text-gray-300 font-mono">{insight.confidence}%</span></span>
          </div>
          <div className="h-1.5 bg-space-800 rounded-full overflow-hidden mb-2">
            <motion.div initial={{ width: 0 }} animate={{ width: `${insight.confidence}%` }} transition={{ duration: 0.8, delay: delay + 0.2 }} className={`h-full rounded-full ${insight.confidence >= 90 ? 'bg-emerald-400' : insight.confidence >= 70 ? 'bg-amber-400' : 'bg-red-400'}`} />
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                <p className="text-sm text-gray-400 mt-2 mb-3">{insight.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-xs text-electric-400 hover:text-electric-300 transition-colors">
            {expanded ? <><ChevronDown className="w-3 h-3" />Show less</> : <><ChevronRight className="w-3 h-3" />View details</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
