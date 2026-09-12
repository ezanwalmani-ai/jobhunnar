/**
 * ABHI JOBS — Centralized Global Premium Animation System
 *
 * Strict Principles:
 * - Preferred easing: [0.22, 1, 0.36, 1]
 * - Micro interactions: 150–200ms
 * - Button/card hover: 200–300ms
 * - Normal reveal: 400–700ms
 * - Hero animation: 600–900ms
 * - Page transitions: 300–500ms
 * - Viewport trigger: once: true (no repeated animation triggers on slight scroll)
 * - Accessibility: full prefers-reduced-motion support (disables translation, uses simple opacity)
 * - No layout shifts, no horizontal overflow.
 */

import { Variants, Transition } from 'motion/react';

// Premium Cubic-Bezier Easing
export const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

// Standard Durations (in seconds for Motion)
export const DURATION = {
  micro: 0.18,
  hover: 0.25,
  page: 0.35,
  normal: 0.55,
  hero: 0.75,
  countUp: 1.0,
} as const;

// Viewport trigger settings for scroll reveals
export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.15,
} as const;

export const VIEWPORT_CARD_ONCE = {
  once: true,
  amount: 0.08,
} as const;

// Standard Transition Configs
export const transitionPremium = (duration = DURATION.normal, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_PREMIUM,
});

export const transitionFast = (delay = 0): Transition => ({
  duration: DURATION.micro,
  delay,
  ease: EASE_OUT,
});

// Reusable Variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    transition: {
      duration: custom?.duration ?? DURATION.normal,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom?: { delay?: number; duration?: number; distance?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? DURATION.normal,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? DURATION.normal,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? DURATION.normal,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? DURATION.normal,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? DURATION.normal,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

export const blurRevealVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 16 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: custom?.duration ?? DURATION.normal,
      delay: custom?.delay ?? 0,
      ease: EASE_PREMIUM,
    },
  }),
};

// Stagger Group for Cards (70ms between children)
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { stagger?: number; delay?: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.stagger ?? 0.07,
      delayChildren: custom?.delay ?? 0.05,
    },
  }),
};

export const staggerCardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: EASE_PREMIUM,
    },
  },
};

// Hero Headline Word Reveal Variants
export const heroWordContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: (custom?: { stagger?: number; delay?: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.stagger ?? 0.08,
      delayChildren: custom?.delay ?? 0.1,
    },
  }),
};

export const heroWordItemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_PREMIUM,
    },
  },
};

// Modal & Dialog Motion
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: EASE_IN_OUT },
  },
};

export const modalDialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.26, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 6,
    transition: { duration: 0.18, ease: EASE_IN_OUT },
  },
};

// Dropdown & Popover Motion
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -3,
    transition: { duration: 0.15, ease: EASE_IN_OUT },
  },
};

// Notification Toast Motion
export const toastNotificationVariants: Variants = {
  hiddenDesktop: { opacity: 0, x: 20, y: 0 },
  visibleDesktop: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.3, ease: EASE_PREMIUM },
  },
  exitDesktop: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2, ease: EASE_IN_OUT },
  },
  hiddenMobile: { opacity: 0, y: -16, x: 0 },
  visibleMobile: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.3, ease: EASE_PREMIUM },
  },
  exitMobile: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.2, ease: EASE_IN_OUT },
  },
};

// Reduced Motion Alternative (simple opacity transition without displacement)
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

// Re-export motion components for centralized access
export { ScrollReveal } from '../components/motion/ScrollReveal';
export { HeroTextReveal } from '../components/motion/HeroTextReveal';
export { TextMaskReveal } from '../components/motion/TextMaskReveal';
export { ScrollProgress } from '../components/motion/ScrollProgress';
export { StaggerGroup, StaggerItem } from '../components/motion/StaggerGroup';
export { CountUpNumber } from '../components/motion/CountUpNumber';
export { AnimatedProgressBar } from '../components/motion/AnimatedProgress';
export { ImageReveal } from '../components/motion/ImageReveal';

