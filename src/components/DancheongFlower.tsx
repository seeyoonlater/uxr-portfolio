import React from 'react';

interface DancheongFlowerProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const DancheongFlower: React.FC<DancheongFlowerProps> = ({ size = 48, className = '', onClick }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`select-none hover:rotate-45 transition-transform duration-700 ease-out shrink-0 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* 8 Green Background Leaves, pointing outward at 0, 45, 90, 135, 180, 225, 270, 315 deg */}
      <g transform="translate(50, 50)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={`leaf-${angle}`}
            d="M 0,-10 C -12,-18 -15,-38 0,-47 C 15,-38 12,-18 0,-10 Z"
            fill="#15803D" // Forest Green
            stroke="#14532D"
            strokeWidth="1.5"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Darker green inner rib for the leaves */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={`rib-${angle}`}
            x1="0"
            y1="-10"
            x2="0"
            y2="-44"
            stroke="#14532D"
            strokeWidth="1"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>

      {/* 8 Pink-Orange Outer Petals, rotated by 22.5 deg relative to leaves to alternate nicely */}
      <g transform="translate(50, 50)">
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
          <g key={`petal-group-${angle}`} transform={`rotate(${angle})`}>
            {/* Darker outer border outline */}
            <path
              d="M 0,-5 C -18,-12 -22,-32 0,-42 C 22,-32 18,-12 0,-5 Z"
              fill="#FB7185" // Warm Pink-Rose outer
              stroke="#BE123C"
              strokeWidth="1"
            />
            {/* Coral-Peach inner body */}
            <path
              d="M 0,-5 C -14,-11 -17,-28 0,-37 C 17,-28 14,-11 0,-5 Z"
              fill="#FCA5A5" // light peach
            />
            {/* Bright red center core */}
            <path
              d="M 0,-5 C -8,-9 -10,-20 0,-26 C 10,-20 8,-9 0,-5 Z"
              fill="#E11D48" // Rose accent at base
            />
          </g>
        ))}
      </g>

      {/* Blue Inner Flower Layer (8 smaller blue petals) */}
      <g transform="translate(50, 50)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={`blue-${angle}`}
            d="M 0,-3 C -8,-7 -10,-18 0,-21 C 10,-18 8,-7 0,-3 Z"
            fill="#3B82F6" // Classic Blue
            stroke="#1E40AF"
            strokeWidth="1"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Inner light-lavender blossom layer */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={`inner-blue-${angle}`}
            d="M 0,-2 C -5,-5 -6,-12 0,-14 C 5,-12 4,-5 0,-2 Z"
            fill="#93C5FD" // Soft Light Blue
            transform={`rotate(${angle})`}
          />
        ))}
      </g>

      {/* Central Yellow Emblem with White and Dark Borders */}
      <circle cx="50" cy="50" r="11" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
      <circle cx="50" cy="50" r="9" fill="#FBBF24" /> {/* Golden yellow disk */}
      <circle cx="50" cy="50" r="5" fill="#F59E0B" /> {/* Core amber point */}
    </svg>
  );
};
