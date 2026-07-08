"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Minimal top scroll progress bar — thin, accent blue, spring-smoothed.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-[#2997ff]"
    />
  );
}
