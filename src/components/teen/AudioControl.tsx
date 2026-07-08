"use client";

import { motion } from "framer-motion";
import { useLessonStore } from "@/lib/store/lesson-store";

/**
 * AudioControl — minimal floating control for ambient sound.
 * Toggle mute + volume slider.
 */
export function AudioControl() {
  const { audioEnabled, toggleAudio, volume, setVolume } = useLessonStore();

  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-3 glass-card rounded-full px-4 py-2.5">
      <button
        onClick={() => {
          toggleAudio();
        }}
        aria-label={audioEnabled ? "كتم الصوت" : "تشغيل الصوت"}
        className="text-ink-soft hover:text-ink transition-colors"
      >
        {audioEnabled ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M11 5 L6 9 H3 V15 H6 L11 19 V5 Z" fill="currentColor" />
            <path d="M15.5 8.5 Q17.5 12 15.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M18 6 Q21 12 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M11 5 L6 9 H3 V15 H6 L11 19 V5 Z" fill="currentColor" />
            <path d="M16 9 L20 15 M20 9 L16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {audioEnabled && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 accent-[#0a84ff]"
            aria-label="مستوى الصوت"
          />
        </motion.div>
      )}
    </div>
  );
}
