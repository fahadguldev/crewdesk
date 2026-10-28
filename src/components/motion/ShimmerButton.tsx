import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ShimmerButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  shimmerColor?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  className?: string;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      children,
      shimmerColor = '#ffffff',
      shimmerDuration = '2.5s',
      borderRadius = '9999px',
      background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          borderRadius,
          background
        }}
        className={`group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/35 cursor-pointer ${className}`}
        {...props}
      >
        {/* Shimmer sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />

        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
