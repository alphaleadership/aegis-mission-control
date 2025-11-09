import React, { useState, useEffect } from 'react';
import { differenceInSeconds, formatDuration, intervalToDuration } from 'date-fns';
import { useInterval } from '@/hooks/use-interval';
interface CountdownProps {
  launchDate: string;
}
const formatSegment = (value: number | undefined) => String(value || 0).padStart(2, '0');
export function Countdown({ launchDate }: CountdownProps) {
  const [remaining, setRemaining] = useState(differenceInSeconds(new Date(launchDate), new Date()));
  useEffect(() => {
    setRemaining(differenceInSeconds(new Date(launchDate), new Date()));
  }, [launchDate]);
  useInterval(() => {
    setRemaining(r => r > 0 ? r - 1 : 0);
  }, 1000);
  const duration = intervalToDuration({ start: 0, end: remaining * 1000 });
  const segments = [
    { label: 'Days', value: duration.days },
    { label: 'Hours', value: duration.hours },
    { label: 'Mins', value: duration.minutes },
    { label: 'Secs', value: duration.seconds },
  ];
  if (remaining <= 0) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest">Countdown</h2>
        <div className="text-6xl lg:text-8xl font-mono font-bold text-green-400 animate-pulse">LIFTOFF</div>
      </div>
    );
  }
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-cyan-400 uppercase tracking-widest mb-4">Time to Launch</h2>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {segments.map(segment => (
          <div key={segment.label} className="flex flex-col items-center p-2 md:p-4 bg-slate-900/50 rounded-lg border border-slate-800">
            <span className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-slate-50 tabular-nums">
              {formatSegment(segment.value)}
            </span>
            <span className="text-xs md:text-sm text-cyan-400/80 uppercase tracking-wider">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}