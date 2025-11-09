import React from 'react';
import { motion } from 'framer-motion';
interface GlobeProps {
  launchSite: string;
  destinationOrbit: string;
}
export function Globe({ launchSite, destinationOrbit }: GlobeProps) {
  const globeSize = 200;
  const center = globeSize / 2;
  const radius = globeSize / 2 - 10;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <svg viewBox={`0 0 ${globeSize} ${globeSize}`} width="100%" height="100%" style={{ maxHeight: '200px' }}>
        <defs>
          <radialGradient id="globeGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#6dd5ed" />
            <stop offset="100%" stopColor="#2193b0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Globe Body */}
        <circle cx={center} cy={center} r={radius} fill="url(#globeGradient)" opacity={0.6} />
        {/* Grid Lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse
            key={`lat-${i}`}
            cx={center}
            cy={center}
            rx={radius * Math.cos((i * Math.PI) / 14)}
            ry={radius / 4}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={`lon-${i}`}
            cx={center}
            cy={center}
            rx={radius / 4}
            ry={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="0.5"
            transform={`rotate(${i * 15}, ${center}, ${center})`}
          />
        ))}
        {/* Orbital Path */}
        <motion.path
          d={`M ${center - radius - 5}, ${center} a ${radius + 5} ${radius / 2} 0 1 0 ${2 * (radius + 5)} 0 a ${radius + 5} ${radius / 2} 0 1 0 -${2 * (radius + 5)} 0`}
          fill="none"
          stroke="#f39c12"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -16 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Satellite */}
        <motion.g>
          <motion.circle
            r="3"
            fill="#f39c12"
            filter="url(#glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ offsetPath: `path("M ${center - radius - 5}, ${center} a ${radius + 5} ${radius / 2} 0 1 0 ${2 * (radius + 5)} 0 a ${radius + 5} ${radius / 2} 0 1 0 -${2 * (radius + 5)} 0")` }}
          />
        </motion.g>
      </svg>
      <div className="text-center mt-4">
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-200">Launch Site:</span> {launchSite}
        </p>
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-200">Destination:</span> {destinationOrbit}
        </p>
      </div>
    </div>
  );
}