import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface TextEffectProps {
  text: string;
  className?: string;
  delay?: number;
  wordStagger?: number;
}

export const TextEffect: React.FC<TextEffectProps> = ({
  text,
  className = '',
  delay = 0,
  wordStagger = 0.04
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordStagger,
        delayChildren: delay
      }
    }
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140
      }
    }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
