import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
interface DataCardProps {
  title: string;
  value?: string | number;
  unit?: string;
  className?: string;
  valueClassName?: string;
  children?: React.ReactNode;
}
export function DataCard({ title, value, unit, className, valueClassName, children }: DataCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex flex-col justify-between backdrop-blur-sm",
        className
      )}
    >
      <div>
        <h3 className="text-sm font-medium text-cyan-400/80 uppercase tracking-wider">{title}</h3>
        {children ? (
          <div className="mt-2">{children}</div>
        ) : (
          <p className={cn("text-3xl lg:text-4xl font-mono font-bold text-slate-50", valueClassName)}>
            {value}
            {unit && <span className="text-lg text-slate-400 ml-2">{unit}</span>}
          </p>
        )}
      </div>
    </motion.div>
  );
}