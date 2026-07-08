"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { introContent } from "@/lib/content/teen-lesson-1";
import { playSound } from "@/lib/audio";
import { useLessonStore } from "@/lib/store/lesson-store";
import { cn } from "@/lib/utils";

export function IntroScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  return (
    <section ref={ref} id="intro" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Eyebrow */}
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {introContent.eyebrow}
          </p>
        </ScrollReveal>

        {/* Title */}
        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{introContent.title}</ScrollReveal>
        </motion.h2>

        {/* Subtitle */}
        <ScrollReveal delay={0.25}>
          <p className="text-lg md:text-2xl text-ink-soft max-w-3xl leading-relaxed mb-16 font-body">
            {introContent.subtitle}
          </p>
        </ScrollReveal>

        {/* Intro paragraphs */}
        <div className="space-y-6 mb-20">
          {introContent.introParagraphs.map((para, i) => (
            <ScrollReveal key={i} delay={0.4 + i * 0.1}>
              <p className="text-base md:text-lg text-ink-soft leading-relaxed font-body">
                {para}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollDivider />

        {/* Objectives */}
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {introContent.objectivesTitle}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-ink mb-10">
            هنتعلم إيه؟
          </h3>
        </ScrollReveal>

        <div className="space-y-3 mb-20">
          {introContent.objectives.map((obj, i) => (
            <ScrollReveal key={i} delay={0.2 + i * 0.08}>
              <ObjectiveRow num={i + 1} text={obj} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollDivider />

        {/* What we'll learn */}
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {introContent.whatWellLearnTitle}
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-3 mb-20">
          {introContent.whatWellLearn.map((item, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl glass-card flex items-center gap-4"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm md:text-base text-ink">{item.q}</span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollDivider />

        {/* Interactive quiz */}
        <IntroQuiz />
      </div>
    </section>
  );
}

/* ====== Quiz component ====== */
function IntroQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const { showAha, hasShown } = useLessonStore();

  const handleSelect = (id: string) => {
    if (answered) return;
    setSelected(id);
    setAnswered(true);
    const opt = introContent.quizOptions.find((o) => o.id === id);
    playSound(opt?.correct ? "success" : "error");
    // Trigger aha moment if correct
    if (opt?.correct && !hasShown("intro-quiz")) {
      setTimeout(() => showAha("intro-quiz"), 800);
    }
  };

  return (
    <div>
      <ScrollReveal delay={0}>
        <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
          {introContent.quizTitle}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h3 className="text-2xl md:text-4xl font-display font-bold text-ink mb-8 leading-tight">
          {introContent.quizQuestion}
        </h3>
      </ScrollReveal>

      <div className="space-y-3 mb-6">
        {introContent.quizOptions.map((opt, i) => (
          <ScrollReveal key={opt.id} delay={0.2 + i * 0.08}>
            <motion.button
              onClick={() => handleSelect(opt.id)}
              whileHover={!answered ? { scale: 1.02, x: -4 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              className={cn(
                "w-full text-right p-5 rounded-2xl border flex items-center justify-between transition-all",
                !answered && "glass-card hover:border-[#0a84ff]/40",
                answered && selected === opt.id && opt.correct && "bg-[#30d158]/10 border-[#30d158]/40",
                answered && selected === opt.id && !opt.correct && "bg-[#ff375f]/10 border-[#ff375f]/40",
                answered && selected !== opt.id && "opacity-40 glass-card",
              )}
            >
              <span className="text-sm md:text-base text-ink">{opt.label}</span>
              {answered && selected === opt.id && (
                <span className="text-xl">{opt.correct ? "✓" : "✗"}</span>
              )}
            </motion.button>
          </ScrollReveal>
        ))}
      </div>

      {/* Feedback */}
      {answered && selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-5 rounded-2xl border text-sm md:text-base leading-relaxed",
            introContent.quizOptions.find((o) => o.id === selected)?.correct
              ? "bg-[#30d158]/[0.08] border-[#30d158]/20 text-[#30d158]"
              : "bg-[#ff9f0a]/[0.08] border-[#ff9f0a]/20 text-[#ff9f0a]",
          )}
        >
          {introContent.quizOptions.find((o) => o.id === selected)?.feedback}
        </motion.div>
      )}

      {/* Reset */}
      {answered && (
        <motion.button
          onClick={() => {
            setSelected(null);
            setAnswered(false);
            playSound("click");
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-xs text-ink-faint hover:text-ink-soft font-mono transition-colors"
        >
          ↻ جرّب تاني
        </motion.button>
      )}
    </div>
  );
}

/* ====== Objective row ====== */
function ObjectiveRow({ num, text }: { num: number; text: string }) {
  return (
    <motion.div
      whileHover={{ x: -4 }}
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors"
    >
      <span className="font-mono text-sm text-[#0a84ff] w-8 shrink-0">
        {String(num).padStart(2, "0")}.
      </span>
      <span className="text-sm md:text-base text-ink-soft leading-relaxed">{text}</span>
    </motion.div>
  );
}

/* ====== Reusable scroll reveal ====== */
export function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ====== Scroll divider ====== */
export function ScrollDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.5"],
  });
  return (
    <div ref={ref} className="my-20 md:my-32 h-px relative">
      <div className="absolute inset-0 bg-white/[0.06]" />
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-0 origin-right bg-gradient-to-l from-[#0a84ff] to-transparent"
      />
    </div>
  );
}
