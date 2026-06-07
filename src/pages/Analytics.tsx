import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { BarChart3D } from '../components/three/BarChart3D';
import { HeatmapChart } from '../components/charts/HeatmapChart';
import { FunnelChart } from '../components/charts/FunnelChart';
import { Badge } from '../components/ui/Badge';
import { MetricCard } from '../components/cards/MetricCard';
import { hourlyTraffic, funnelData, revenueData, keyMetrics } from '../data/mockData';

const dateRanges = [{ label: 'Last 7d', value: '7d' }, { label: 'Last 30d', value: '30d' }, { label: 'Last 90d', value: '90d' }, { label: 'Custom', value: 'custom' }];
const barData = revenueData.slice(-6).map(d => ({ label: d.month, value: d.revenue, color: d.revenue > 280000 ? '#10b981' : d.revenue > 240000 ? '#f59e0b' : '#ef4444' }));

export function Analytics() {
  const [selectedRange, setSelectedRange] = useState('30d');

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Month,Revenue,Expenses,Profit\n' + revenueData.map(d => `${d.month},${d.revenue},${d.expenses},${d.profit}`).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'analytics_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-100">Analytics</h1>
          <p className="text-gray-400 mt-1">Detailed insights into your platform performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-space-800 rounded-lg">
            {dateRanges.map(range => (
              <button key={range.value} onClick={() => setSelectedRange(range.value)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedRange === range.value ? 'bg-electric-400/20 text-electric-400' : 'text-gray-400 hover:text-gray-200'}`}>{range.label}</button>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-space-800 hover:bg-space-700 rounded-lg text-gray-300 hover:text-gray-100 transition-colors">
            <Download className="w-4 h-4" />Export CSV
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Page Views" value={145892} change={15.3} icon={<Activity className="w-5 h-5" />} delay={0.1} />
        <MetricCard title="Unique Visitors" value={89234} change={8.7} icon={<Users className="w-5 h-5" />} delay={0.2} />
        <MetricCard title="Avg. Session Duration" value={432} change={12.4} suffix="s" icon={<TrendingUp className="w-5 h-5" />} delay={0.3} />
        <MetricCard title="Revenue per User" value={3247} change={5.2} prefix="$" icon={<DollarSign className="w-5 h-5" />} delay={0.4} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-200">Revenue by Month</h2>
            <p className="text-sm text-gray-500 mt-1">3D visualization of monthly revenue performance</p>
          </div>
          <div className="flex items-center gap-2"><Badge variant="success">Performing</Badge><span className="text-sm text-gray-400">vs target</span></div>
        </div>
        <BarChart3D data={barData} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6 border border-space-700">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-200">Traffic Heatmap</h2>
            <p className="text-sm text-gray-500 mt-1">Hourly activity patterns throughout the week</p>
          </div>
          <HeatmapChart data={hourlyTraffic} />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6 border border-space-700">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-200">Conversion Funnel</h2>
            <p className="text-sm text-gray-500 mt-1">User journey from visit to payment</p>
          </div>
          <FunnelChart data={funnelData} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-xl p-6 border border-space-700">
        <h2 className="text-lg font-medium text-gray-200 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-space-800/50"><p className="text-sm text-gray-400 mb-1">Total Sessions</p><p className="font-mono text-2xl font-bold text-electric-400">{(keyMetrics.activeUsers * 1.8).toLocaleString()}</p></div>
          <div className="p-4 rounded-lg bg-space-800/50"><p className="text-sm text-gray-400 mb-1">Bounce Rate</p><p className="font-mono text-2xl font-bold text-neural-400">32.4%</p></div>
          <div className="p-4 rounded-lg bg-space-800/50"><p className="text-sm text-gray-400 mb-1">Pages per Session</p><p className="font-mono text-2xl font-bold text-amber-400">4.7</p></div>
          <div className="p-4 rounded-lg bg-space-800/50"><p className="text-sm text-gray-400 mb-1">Return Rate</p><p className="font-mono text-2xl font-bold text-emerald-400">68%</p></div>
        </div>
      </motion.div>
    </div>
  );
}
