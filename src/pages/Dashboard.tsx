import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, UserMinus, ArrowRight, TrendingUp as TrendingUpIcon, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { MetricCard } from '../components/cards/MetricCard';
import { GlobeScene } from '../components/three/GlobeScene';
import { DataParticles } from '../components/three/DataParticles';
import { RevenueChart } from '../components/charts/RevenueChart';
import { UserGrowthChart } from '../components/charts/UserGrowthChart';
import { Badge } from '../components/ui/Badge';
import { revenueData, userGrowthData, regionalSessions, aiInsights } from '../data/mockData';
import { useDashboardStore } from '../store/dashboardStore';

export function Dashboard() {
  const { metrics, settings } = useDashboardStore();
  const firstName = settings.name.split(' ')[0];

  return (
    <div className="space-y-6 relative">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative rounded-2xl overflow-hidden glass border border-space-700">
        <DataParticles />
        <div className="relative z-10 p-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl font-display font-bold text-gray-100 mb-2">Welcome back, {firstName}!</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-gray-400">Here's what's happening with your business today.</motion.p>
        </div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 pt-0">
          <MetricCard title="Total Revenue" value={metrics.totalRevenue} change={18.4} prefix="$" icon={<DollarSign className="w-5 h-5" />} delay={0.1} />
          <MetricCard title="Active Users" value={metrics.activeUsers} change={12.1} icon={<Users className="w-5 h-5" />} delay={0.2} />
          <MetricCard title="Conversion Rate" value={473} change={0.8} suffix="%" icon={<TrendingUp className="w-5 h-5" />} delay={0.3} />
          <MetricCard title="Churn Rate" value={120} change={-0.3} suffix="%" icon={<UserMinus className="w-5 h-5" />} delay={0.4} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6 border border-space-700">
          <h2 className="text-lg font-medium text-gray-200 mb-4">Global Activity</h2>
          <GlobeScene />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6 border border-space-700">
          <h2 className="text-lg font-medium text-gray-200 mb-4">Active Sessions by Region</h2>
          <div className="space-y-4">
            {regionalSessions.slice(0, 5).map((region, i) => (
              <div key={region.region} className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-400 truncate">{region.region}</div>
                <div className="flex-1 h-8 bg-space-800 rounded-lg overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${region.percentage * 2}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full bg-gradient-to-r from-electric-400/80 to-electric-400/40 rounded-lg" />
                </div>
                <div className="flex items-center gap-2 w-24">
                  <span className="font-mono text-sm text-gray-200">{region.sessions.toLocaleString()}</span>
                  <Badge variant={region.trend >= 0 ? 'success' : 'error'} size="sm">{region.trend >= 0 ? '+' : ''}{region.trend.toFixed(1)}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6 border border-space-700">
          <h2 className="text-lg font-medium text-gray-200 mb-4">Revenue Trend</h2>
          <RevenueChart data={revenueData} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-xl p-6 border border-space-700">
          <h2 className="text-lg font-medium text-gray-200 mb-4">User Growth</h2>
          <UserGrowthChart data={userGrowthData} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass rounded-xl p-6 border border-space-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-200">AI Insights</h2>
          <a href="/insights" className="text-sm text-electric-400 hover:text-electric-300 transition-colors flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
          {aiInsights.slice(0, 4).map((insight, i) => (
            <motion.div key={insight.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }} className="flex-shrink-0 w-80 p-4 rounded-lg bg-space-800/50 hover:bg-space-800 transition-colors cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${insight.category === 'Revenue' ? 'bg-emerald-500/10 text-emerald-400' : insight.category === 'Churn' ? 'bg-amber-500/10 text-amber-400' : insight.category === 'Growth' ? 'bg-electric-400/10 text-electric-400' : 'bg-neural-400/10 text-neural-400'}`}>
                  {insight.icon === 'TrendingUp' && <TrendingUpIcon className="w-4 h-4" />}
                  {insight.icon === 'AlertTriangle' && <AlertTriangle className="w-4 h-4" />}
                  {insight.icon === 'CheckCircle' && <CheckCircle className="w-4 h-4" />}
                  {insight.icon === 'Zap' && <Zap className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">{insight.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
