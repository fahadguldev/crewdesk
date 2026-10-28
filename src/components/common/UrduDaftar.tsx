import React from 'react';

interface UrduDaftarProps {
  className?: string;
  withHub?: boolean;
}

export const UrduDaftar: React.FC<UrduDaftarProps> = ({ className = '', withHub = false }) => {
  return (
    <span className="inline-flex items-baseline gap-1">
      {withHub && <span className="font-extrabold text-white">Hub</span>}
      <span
        dir="rtl"
        lang="ur"
        style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
        className={`text-emerald-400 font-bold inline-block px-1 leading-normal ${className}`}
      >
        دفتر
      </span>
    </span>
  );
};
