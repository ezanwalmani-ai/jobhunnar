import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export interface CountUpNumberProps {
  value: number;
  duration?: number; // ms, default 1000ms
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

// Ease out cubic [0.22, 1, 0.36, 1] approximation function for JS raf
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(shouldReduceMotion ? value : 0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          const startTimestamp = performance.now();
          const startVal = 0;
          const endVal = value;

          const step = (now: number) => {
            const elapsed = now - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = startVal + (endVal - startVal) * easedProgress;

            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(endVal);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration, shouldReduceMotion]);

  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString();

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default CountUpNumber;
