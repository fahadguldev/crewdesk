import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatCommas?: boolean;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  className = '',
  formatCommas = true
}) => {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, { stiffness: 120, damping: 18 });
  const displayVal = useTransform(springVal, (current) => {
    const rounded = Math.round(current);
    return `${prefix}${formatCommas ? rounded.toLocaleString() : rounded}${suffix}`;
  });

  const prevValue = useRef(value);

  useEffect(() => {
    motionVal.set(value);
    prevValue.current = value;
  }, [value, motionVal]);

  return <motion.span className={className}>{displayVal}</motion.span>;
};
