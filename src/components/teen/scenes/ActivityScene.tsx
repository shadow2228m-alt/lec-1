"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { activityContent } from "@/lib/content/teen-lesson-1";
import { ScrollReveal, ScrollDivider } from "./IntroScene";
import { playSound } from "@/lib/audio";
import { useLessonStore } from "@/lib/store/lesson-store";
import { cn } from "@/lib/utils";

export function ActivityScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  // Prevent hydration mismatch: dnd-kit generates dynamic aria-describedby IDs
  // that differ between server and client. Only render DnD on the client.
  // Using useSyncExternalStore-like pattern via lazy init to avoid setState-in-effect.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Defer to next tick to avoid synchronous setState in effect
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Shuffled initial order
  const [order, setOrder] = useState(
    ["show-result", "validate", "read-email", "check-empty", "read-pass"],
  );
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
  );

  const stepsById = activityContent.steps.reduce((acc, s) => {
    acc[s.id] = s;
    return acc;
  }, {} as Record<string, typeof activityContent.steps[0]>);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
      playSound("pop");
    }
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    setOrder((items) => arrayMove(items, i, i - 1));
    playSound("click");
  };
  const moveDown = (i: number) => {
    if (i === order.length - 1) return;
    setOrder((items) => arrayMove(items, i, i + 1));
    playSound("click");
  };

  const check = () => {
    const correct = order.every((id, i) => stepsById[id].order === i + 1);
    setIsCorrect(correct);
    setChecked(true);
    playSound(correct ? "success" : "error");
    // Trigger aha moment if correct
    if (correct) {
      const { showAha, hasShown } = useLessonStore.getState();
      if (!hasShown("activity-solved")) {
        setTimeout(() => showAha("activity-solved"), 600);
      }
    }
  };

  const reset = () => {
    setOrder(["show-result", "validate", "read-email", "check-empty", "read-pass"]);
    setChecked(false);
    setIsCorrect(false);
    playSound("click");
  };

  return (
    <section ref={ref} id="activity" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {activityContent.eyebrow}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{activityContent.title}</ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-3xl leading-relaxed mb-8 font-body">
            {activityContent.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="p-6 rounded-2xl bg-[#0a84ff]/[0.06] border border-[#0a84ff]/20 mb-16">
            <p className="text-sm md:text-base text-ink-soft leading-relaxed">
              {activityContent.intro}
            </p>
          </div>
        </ScrollReveal>

        <ScrollDivider />

        {/* Drag & drop list */}
        <ScrollReveal delay={0}>
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-xs text-ink-faint tracking-wider uppercase">
              اسحب أو استخدم الأسهم
            </span>
            <span className="font-mono text-xs text-ink-faint">{order.length} خطوات</span>
          </div>
        </ScrollReveal>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="space-y-3 mb-8">
              {mounted ? (
                order.map((id, i) => (
                  <SortableStep
                    key={id}
                    id={id}
                    step={stepsById[id]}
                    position={i + 1}
                    isCorrect={checked && stepsById[id].order === i + 1}
                    isWrong={checked && stepsById[id].order !== i + 1}
                    disabled={checked && isCorrect}
                    onMoveUp={() => moveUp(i)}
                    onMoveDown={() => moveDown(i)}
                    canMoveUp={i > 0}
                    canMoveDown={i < order.length - 1}
                  />
                ))
              ) : (
                // SSR placeholder — prevents hydration mismatch from dnd-kit's
                // dynamic aria-describedby IDs (DndDescribedBy-N differs server vs client)
                order.map((id, i) => (
                  <StaticStep
                    key={id}
                    step={stepsById[id]}
                    position={i + 1}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          {!isCorrect && (
            <motion.button
              onClick={check}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-xl bg-[#0a84ff] text-white font-display font-bold transition-colors hover:bg-[#64d2ff]"
            >
              تحقّق من الترتيب
            </motion.button>
          )}
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3.5 rounded-xl bg-white/[0.06] text-ink font-display font-bold border border-white/[0.08] hover:bg-white/[0.1] transition-colors"
          >
            ↻ إعادة
          </motion.button>
        </div>

        {/* Result */}
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "p-6 rounded-2xl border",
                isCorrect
                  ? "bg-[#30d158]/[0.08] border-[#30d158]/20"
                  : "bg-[#ff9f0a]/[0.08] border-[#ff9f0a]/20",
              )}
            >
              <div className={cn("text-lg font-display font-bold mb-2", isCorrect ? "text-[#30d158]" : "text-[#ff9f0a]")}>
                {isCorrect ? "✓ ممتاز!" : "🤔 مش تمام بعد"}
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                {isCorrect ? activityContent.successMessage : "في خطوة في المكان الغلط. شوف الترتيب المنطقي — إيه اللي لازم يحصل الأول؟"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SortableStep({
  id,
  step,
  position,
  isCorrect,
  isWrong,
  disabled,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  id: string;
  step: typeof activityContent.steps[0];
  position: number;
  isCorrect: boolean;
  isWrong: boolean;
  disabled: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  } as React.CSSProperties;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border touch-none",
        isCorrect && "bg-[#30d158]/10 border-[#30d158]/30",
        isWrong && "bg-[#ff375f]/10 border-[#ff375f]/30",
        !isCorrect && !isWrong && "glass-card",
        isDragging && "ring-2 ring-[#0a84ff] shadow-glow-blue",
      )}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-ink-faint hover:text-ink-soft transition-colors"
      >
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <circle cx="3" cy="4" r="1.3" fill="currentColor" />
          <circle cx="11" cy="4" r="1.3" fill="currentColor" />
          <circle cx="3" cy="9" r="1.3" fill="currentColor" />
          <circle cx="11" cy="9" r="1.3" fill="currentColor" />
          <circle cx="3" cy="14" r="1.3" fill="currentColor" />
          <circle cx="11" cy="14" r="1.3" fill="currentColor" />
        </svg>
      </div>

      {/* Position */}
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full font-mono text-sm font-bold shrink-0",
        isCorrect ? "bg-[#30d158] text-black" : isWrong ? "bg-[#ff375f] text-white" : "bg-[#0a84ff] text-white",
      )}>
        {position}
      </div>

      {/* Emoji + label */}
      <span className="text-2xl shrink-0">{step.emoji}</span>
      <span className="flex-1 text-sm md:text-base text-ink">{step.label}</span>

      {/* Arrow buttons */}
      {!disabled && (
        <div className="flex gap-1 shrink-0">
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-ink-soft transition-colors"
          >
            ↑
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-ink-soft transition-colors"
          >
            ↓
          </button>
        </div>
      )}

      {/* Status icon */}
      {isCorrect && <span className="text-[#30d158]">✓</span>}
      {isWrong && <span className="text-[#ff375f]">✗</span>}
    </motion.div>
  );
}

/* ====== Static placeholder for SSR (no dnd-kit, no dynamic IDs) ====== */
function StaticStep({
  step,
  position,
}: {
  step: typeof activityContent.steps[0];
  position: number;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border glass-card">
      {/* Empty drag handle slot */}
      <div className="w-[14px] shrink-0" />

      {/* Position */}
      <div className="flex items-center justify-center w-8 h-8 rounded-full font-mono text-sm font-bold shrink-0 bg-[#0a84ff] text-white">
        {position}
      </div>

      {/* Emoji + label */}
      <span className="text-2xl shrink-0">{step.emoji}</span>
      <span className="flex-1 text-sm md:text-base text-ink">{step.label}</span>
    </div>
  );
}
