import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_PREMIUM } from '../../lib/motion';

export interface HeroTextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
  wordDelay?: number;
  as?: 'h1' | 'h2' | 'div' | 'span';
}

/**
 * HeroTextReveal: Splits text into words and reveals each word sequentially
 * using smooth cubic-bezier easing [0.22, 1, 0.36, 1].
 * Preserves whitespace and avoids layout shifting.
 */
export const HeroTextReveal: React.FC<HeroTextRevealProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightClassName = 'text-[#FF2B1A]',
  delay = 0.05,
  wordDelay = 0.08,
  as = 'h1',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    const Component = as as any;
    return <Component className={className}>{text}</Component>;
  }

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 24, // reduced for mobile-safe displacement
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: EASE_PREMIUM,
      },
    },
  };

  const Component = (motion as any)[as] || motion.h1;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${className} inline-flex flex-wrap`}
      style={{ overflowWrap: 'break-word' }}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === word.toLowerCase().replace(/[^a-z0-9]/gi, '')
        );

        return (
          <span
            key={`${word}-${index}`}
            className="inline-block whitespace-pre mr-[0.28em] overflow-hidden"
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block ${isHighlighted ? highlightClassName : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
};

export default HeroTextReveal;
