"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useLessonStore } from "@/lib/store/lesson-store";
import { ahaMoments } from "@/lib/content/teen-lesson-1";
import { playSound } from "@/lib/audio";

/**
 * AhaMoment — cinematic insight overlay shown after successful interactions.
 * Reads `active` from the lesson store. Only shows each aha moment once.
 */
export function AhaMoment() {
  const { active, dismissAha } = useLessonStore();

  const aha = active ? ahaMoments[active] : null;

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (!aha) return;
    playSound("success");
    const t = setTimeout(() => dismissAha(), 4000);
    return () => clearTimeout(t);
  }, [aha, dismissAha]);

  return (
    <AnimatePresence>
      {aha && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={dismissAha}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 cursor-pointer"
          style={{ background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)" }}
        >
          {/* Glow background */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(10,132,255,0.3), transparent 70%)" }}
          />

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.2 }}
              className="text-6xl md:text-7xl mb-6"
            >
              💡
            </motion.div>

            {/* Main text — word by word reveal */}
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-4 text-gradient-blue"
            >
              {aha.text}
            </motion.h2>

            {/* Subtext */}
            {aha.subtext && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-base md:text-xl text-ink-soft leading-relaxed font-body max-w-xl mx-auto"
              >
                {aha.subtext}
              </motion.p>
            )}

            {/* Progress bar (auto-dismiss indicator) */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-0.5 origin-left bg-[#0a84ff]/40"
            />

            {/* Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-xs text-ink-faint font-mono"
            >
              اضغط للمتابعة
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
