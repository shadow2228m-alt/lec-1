import type { Variants, Transition } from "framer-motion";

/* ====== Easing presets ====== */
export const easeOutCine: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeInOutCine: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 1,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.8,
};

/* ====== Scroll-triggered entrance ====== */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOutCine },
  },
};

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutCine },
  },
};

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutCine },
  },
};

/* ====== Stagger containers ====== */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

/* ====== Items inside stagger ====== */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springSnappy,
  },
};

export const scaleInItem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSnappy,
  },
};

/* ====== Hero entrance ====== */
export const heroBadge: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutCine },
  },
};

export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutCine, delay: 0.15 },
  },
};

export const heroSub: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutCine, delay: 0.45 },
  },
};

export const heroMeta: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutCine, delay: 0.65 },
  },
};

export const heroButton: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSnappy,
  },
};

/* ====== Button hover ====== */
export const buttonHover = {
  whileHover: { y: -2, transition: { duration: 0.2 } },
  whileTap: { scale: 0.97 },
};

/* ====== Code line typing reveal ====== */
export const codeLine: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      delay: 0.4 + i * 0.1,
      ease: easeOutCine,
    },
  }),
};

/* ====== Card hover lift ====== */
export const cardLift = {
  whileHover: { y: -6, transition: springSnappy },
};
