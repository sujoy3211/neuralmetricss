import { motion } from 'framer-motion';
import type { HourlyTraffic } from '../../types';

interface HeatmapChartProps {
  data: HourlyTraffic[];
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getColor(value: number, max: number): string {
  const intensity = value / max;
  if (intensity < 0.2) return 'bg-space-800';
  if (intensity < 0.4) return 'bg-neural-600/60';
  if (intensity < 0.6) return 'bg-neural-500/70';
  if (intensity < 0.8) return 'bg-electric-500/80';
  return 'bg-electric-400';
}

export function HeatmapChart({ data }: HeatmapChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  const getValue = (day: number, hour: number): number => {
    const point = data.find(d => d.day === day && d.hour === hour);
    return point?.value || 0;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full">
      <div className="flex">
        <div className="w-12 flex flex-col justify-around text-xs text-gray-500 pr-2">
          {days.map(day => <div key={day} className="h-4 flex items-center">{day}</div>)}
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex mb-1">
              {Array.from({ length: 24 }, (_, hour) => (
                <div key={hour} className="w-6 text-center text-xs text-gray-500">{hour % 6 === 0 ? hour : ''}</div>
              ))}
            </div>
            {days.map((_, dayIndex) => (
              <div key={dayIndex} className="flex gap-0.5 mb-0.5">
                {Array.from({ length: 24 }, (_, hour) => (
                  <motion.div
                    key={hour}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (dayIndex * 24 + hour) * 0.002 }}
                    className={`w-5 h-4 rounded-sm ${getColor(getValue(dayIndex, hour), maxValue)} cursor-pointer hover:ring-1 hover:ring-white/30`}
                    title={`${days[dayIndex]} ${hour}:00 - ${getValue(dayIndex, hour).toLocaleString()} sessions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-4 gap-2">
        <span className="text-xs text-gray-500">Less</span>
        <div className="flex gap-0.5">
          <div className="w-4 h-3 rounded-sm bg-space-800" />
          <div className="w-4 h-3 rounded-sm bg-neural-600/60" />
          <div className="w-4 h-3 rounded-sm bg-neural-500/70" />
          <div className="w-4 h-3 rounded-sm bg-electric-500/80" />
          <div className="w-4 h-3 rounded-sm bg-electric-400" />
        </div>
        <span className="text-xs text-gray-500">More</span>
      </div>
    </motion.div>
  );
}
