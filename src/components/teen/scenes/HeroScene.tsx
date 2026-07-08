"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { heroContent } from "@/lib/content/teen-lesson-1";
import { playSound } from "@/lib/audio";

interface HeroSceneProps {
  onStart: () => void;
}

export function HeroScene({ onStart }: HeroSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scrub-tied transforms — NOT just whileInView
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const titleScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.82]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.4], [0, 16]);
  const titleFilter = useTransform(titleBlur, (b) => `blur(${b}px)`);

  const subY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const metaOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const buttonOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const badgeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[120vh]"
    >
      {/* Spotlight background — Apple style */}
      <div className="sticky top-0 h-screen overflow-hidden bg-spotlight">

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_0%,#000_100%)] opacity-60" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          {/* Badge */}
          <motion.div
            style={{ opacity: badgeOpacity }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#30d158]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 6px #30d158" }}
            />
            <span className="font-mono text-[11px] text-ink-soft tracking-[0.2em]">
              {heroContent.badge}
            </span>
          </motion.div>

          {/* Title — MASSIVE, Apple style */}
          <motion.h1
            style={{ y: titleY, scale: titleScale, opacity: titleOpacity, filter: titleFilter }}
            className="font-display font-bold tracking-tight leading-[0.95] mb-8"
          >
            {heroContent.titleLines.map((line, i) => (
              <LineMaskReveal
                key={i}
                text={line}
                delay={0.4 + i * 0.18}
                className="text-[44px] sm:text-6xl md:text-7xl lg:text-[112px] block"
                gradient={i === 1}
              />
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            style={{ y: subY, opacity: subOpacity }}
            className="text-lg md:text-2xl text-ink-soft mb-10 max-w-2xl mx-auto leading-relaxed font-body font-normal px-4"
          >
            <WordFadeIn text={heroContent.subtitle} delay={1.6} />
          </motion.p>

          {/* Meta row */}
          <motion.div
            style={{ y: metaY, opacity: metaOpacity }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-12 font-mono text-[11px] md:text-xs text-ink-faint"
          >
            {heroContent.meta.map((m, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + i * 0.08, duration: 0.6 }}
                className="flex items-center gap-2"
              >
                {m.label}
                {i < heroContent.meta.length - 1 && (
                  <span className="text-ink-darker">·</span>
                )}
              </motion.span>
            ))}
          </motion.div>

          {/* Magnetic CTA button */}
          <motion.div style={{ y: buttonY, opacity: buttonOpacity }}>
            <MagneticButton onClick={onStart}>
              {heroContent.cta}
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator — minimal, fades on scroll */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-ink-faint"
          >
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path d="M6 2 V18 M2 14 L6 18 L10 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ====== Line mask reveal — slides up from behind mask (Apple style) ====== */
function LineMaskReveal({
  text,
  delay,
  className,
  gradient,
}: {
  text: string;
  delay: number;
  className: string;
  gradient?: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`block ${className} ${gradient ? "text-gradient-blue" : "text-gradient"}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ====== Word fade-in for subtitle ====== */
function WordFadeIn({ text, delay }: { text: string; delay: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mx-[0.2em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/* ====== Magnetic button — Apple style micro-interaction ====== */
function MagneticButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    x.set(dx);
    y.set(dy);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => {
        playSound("click");
        onClick();
      }}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#2997ff] text-white font-display font-bold text-lg shadow-glow-blue transition-colors hover:bg-[#64d2ff] no-select"
    >
      <span>{children}</span>
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="rtl:scale-x-[-1]"
        animate={{ x: [0, -3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </motion.button>
  );
}
