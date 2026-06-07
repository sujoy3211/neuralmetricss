import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, Legend } from 'recharts';
import { motion } from 'framer-motion';
import type { GrowthData } from '../../types';

interface UserGrowthChartProps {
  data: GrowthData[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-space-800 border border-space-700 rounded-lg p-3 shadow-xl">
        <p className="text-gray-400 text-xs mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="font-mono text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="newUsersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="returningUsersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
          <XAxis dataKey="month" stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: 10 }} formatter={(value) => <span className="text-gray-400 text-sm">{value}</span>} />
          <Area type="monotone" dataKey="returningUsers" name="Returning" stackId="1" stroke="#7c3aed" strokeWidth={2} fill="url(#returningUsersGradient)" />
          <Area type="monotone" dataKey="newUsers" name="New" stackId="1" stroke="#00d4ff" strokeWidth={2} fill="url(#newUsersGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
