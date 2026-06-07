import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { motion } from 'framer-motion';
import type { RevenueData } from '../../types';

interface RevenueChartProps {
  data: RevenueData[];
  forecast?: RevenueData[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-space-800 border border-space-700 rounded-lg p-3 shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-electric-400 font-mono font-medium">${payload[0]?.value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export function RevenueChart({ data, forecast }: RevenueChartProps) {
  const combinedData = forecast ? [...data.slice(-6), ...forecast.map((f) => ({ ...f, isForecast: true }))] : data;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={combinedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
          <XAxis dataKey="month" stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="revenue" stroke="#00d4ff" strokeWidth={2} fill="url(#revenueGradient)" dot={false} activeDot={{ r: 6, fill: '#00d4ff', stroke: '#0a0a0f', strokeWidth: 2 }} />
          {forecast && <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} strokeDasharray="5 5" fill="transparent" dot={false} data={forecast} />}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
