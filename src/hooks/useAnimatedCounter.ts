import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
}

export function useAnimatedCounter({ start = 0, end, duration = 2000, decimals = 0 }: UseAnimatedCounterOptions): { value: number; displayValue: string } {
  const [value, setValue] = useState(start);
  const startTime = useRef<number | null>(null);
  const startValue = useRef(start);

  useEffect(() => {
    startTime.current = null;
    startValue.current = value;
    const animate = (currentTime: number) => {
      if (startTime.current === null) startTime.current = currentTime;
      const elapsed = currentTime - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue.current + (end - startValue.current) * eased;
      setValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  const formatValue = (val: number): string => {
    if (decimals > 0) return val.toFixed(decimals);
    return Math.round(val).toLocaleString();
  };

  return { value, displayValue: formatValue(value) };
}
