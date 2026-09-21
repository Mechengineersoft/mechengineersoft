import React from 'react';

interface MESLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export default function MESLogo({ size = 40, animated = false, className = '' }: MESLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MechEngineerSoft MES logo"
      role="img"
    >
      <defs>
        <linearGradient id="mes-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0052CC" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>
        <linearGradient id="mes-gradient-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A7BFF" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>
        <filter id="mes-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left bracket arm */}
      <path
        d="M20 15 L8 50 L20 85"
        stroke="url(#mes-gradient-stroke)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#mes-glow)"
        className={animated ? 'mes-stroke' : ''}
      />

      {/* Right bracket arm */}
      <path
        d="M80 15 L92 50 L80 85"
        stroke="url(#mes-gradient-stroke)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#mes-glow)"
        className={animated ? 'mes-stroke' : ''}
        style={animated ? { animationDelay: '0.3s' } : {}}
      />

      {/* Center horizontal bar top */}
      <line
        x1="30"
        y1="35"
        x2="70"
        y2="35"
        stroke="url(#mes-gradient)"
        strokeWidth="5"
        strokeLinecap="round"
        className={animated ? 'mes-stroke' : ''}
        style={animated ? { animationDelay: '0.6s' } : {}}
      />

      {/* Center horizontal bar middle */}
      <line
        x1="30"
        y1="50"
        x2="70"
        y2="50"
        stroke="url(#mes-gradient)"
        strokeWidth="5"
        strokeLinecap="round"
        className={animated ? 'mes-stroke' : ''}
        style={animated ? { animationDelay: '0.8s' } : {}}
      />

      {/* Center horizontal bar bottom */}
      <line
        x1="30"
        y1="65"
        x2="70"
        y2="65"
        stroke="url(#mes-gradient)"
        strokeWidth="5"
        strokeLinecap="round"
        className={animated ? 'mes-stroke' : ''}
        style={animated ? { animationDelay: '1s' } : {}}
      />

      {/* Diagonal accent */}
      <line
        x1="38"
        y1="28"
        x2="62"
        y2="72"
        stroke="#00C2FF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
        className={animated ? 'mes-stroke' : ''}
        style={animated ? { animationDelay: '1.1s' } : {}}
      />
    </svg>
  );
}