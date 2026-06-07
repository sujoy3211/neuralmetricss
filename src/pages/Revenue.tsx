import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, CreditCard, ArrowUpRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MetricCard } from '../components/cards/MetricCard';
import { RevenueChart } from '../components/charts/RevenueChart';
import { Badge } from '../components/ui/Badge';
import { revenueData, keyMetrics } from '../data/mockData';

const RADIAN = Math.PI / 180;

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">{`${(percent * 100).toFixed(0)}%`}</text>;
};

const mrrBreakdown = [
  { segment: 'Enterprise', mrr: 145000, percentage: 45 },
  { segment: 'Pro', mrr: 98000, percentage: 30 },
  { segment: 'Free (Add-ons)', mrr: 42000, percentage: 13 },
  { segment: 'Trial Conversions', mrr: 38992, percentage: 12 },
];

const subscriptionPlans = [
  { name: 'Free', users: 45214, percentage: 31.6, color: '#7c3aed' },
  { name: 'Pro', users: 78231, percentage: 54.8, color: '#00d4ff' },
  { name: 'Enterprise', users: 19408, percentage: 13.6, color: '#f59e0b' },
];

const paymentMethods = [
  { method: 'Credit Card', percentage: 62, transactions: 89234 },
  { method: 'PayPal', percentage: 18, transactions: 25902 },
  { method: 'Apple Pay', percentage: 12, transactions: 17268 },
  { method: 'Google Pay', percentage: 8, transactions: 11512 },
];

export function Revenue() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold text-gray-100">Revenue</h1><p className="text-gray-400 mt-1">Financial metrics and subscription analytics</p></div>
        <Badge variant="success" size="md"><ArrowUpRight className="w-3 h-3 mr-1" />+18.4% vs last month</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="MRR" value={keyMetrics.mrr} change={12.3} prefix="$" icon={<DollarSign className="w-5 h-5" />} delay={0.1} />
        <MetricCard title="ARR" value={keyMetrics.arr} change={18.4} prefix="$" icon={<TrendingUp className="w-5 h-5" />} delay={0.2} />
        <MetricCard title="LTV" value={keyMetrics.ltv} change={15.2} prefix="$" icon={<Users className="w-5 h-5" />} delay={0.3} />
        <MetricCard title="CAC" value={keyMetrics.cac} change={-8.3} prefix="$" icon={<DollarSign className="w-5 h-5" />} delay={0.4} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center justify-between mb-4">
          <div><h2 className="text-lg font-medium text-gray-200">Revenue Trend</h2><p className="text-sm text-gray-500 mt-1">Historical revenue performance</p></div>
        </div>
        <RevenueChart data={revenueData} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6 border border-space-700">
          <h2 className="text-lg font-medium text-gray-200 mb-4">Subscription Distribution</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={subscriptionPlans} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} fill="#8884d8" dataKey="users" nameKey="name">
                  {subscriptionPlans.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload;
                    return <div className="bg-space-800 border border-space-700 rounded-lg p-3"><p className="font-medium text-gray-200">{data.name}</p><p className="text-sm text-gray-400">{data.users.toLocaleString()} users ({data.percentage}%)</p></div>;
                  }
                  return null;
                }} />
                <Legend formatter={(value) => <span className="text-gray-300">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6 border border-space-700">
          <h2 className="text-lg font-medium text-gray-200 mb-4">MRR Breakdown</h2>
          <div className="space-y-4">
            {mrrBreakdown.map((segment, i) => (
              <div key={segment.segment}>
                <div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-300">{segment.segment}</span><span className="font-mono text-sm text-gray-400">${segment.mrr.toLocaleString()}</span></div>
                <div className="h-3 bg-space-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${segment.percentage}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-neural-400 to-neural-500' : i === 1 ? 'bg-gradient-to-r from-electric-400 to-electric-500' : i === 2 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-space-700">
            <div className="flex items-center justify-between"><span className="font-medium text-gray-200">Total MRR</span><span className="font-mono text-xl text-electric-400">${mrrBreakdown.reduce((sum, s) => sum + s.mrr, 0).toLocaleString()}</span></div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center justify-between mb-4">
          <div><h2 className="text-lg font-medium text-gray-200">Payment Methods</h2><p className="text-sm text-gray-500 mt-1">Distribution by payment type</p></div>
          <CreditCard className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paymentMethods.map((method, i) => (
            <motion.div key={method.method} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.1 }} className="p-4 rounded-lg bg-space-800/50 border border-space-700 hover:border-space-600 transition-colors">
              <h3 className="font-medium text-gray-200 mb-2">{method.method}</h3>
              <div className="flex items-end justify-between">
                <div><p className="text-2xl font-mono text-electric-400">{method.percentage}%</p><p className="text-xs text-gray-500 mt-1">{method.transactions.toLocaleString()} transactions</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
