"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { conditionsContent } from "@/lib/content/teen-lesson-1";
import { ScrollReveal, ScrollDivider } from "./IntroScene";
import { playSound } from "@/lib/audio";
import { useLessonStore } from "@/lib/store/lesson-store";
import { cn } from "@/lib/utils";

export function ConditionsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  return (
    <section ref={ref} id="conditions" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {conditionsContent.eyebrow}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{conditionsContent.title}</ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-3xl leading-relaxed mb-8 font-body">
            {conditionsContent.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="p-6 rounded-2xl bg-[#0a84ff]/[0.06] border border-[#0a84ff]/20 mb-20">
            <p className="text-sm md:text-base text-ink-soft leading-relaxed">
              {conditionsContent.intro}
            </p>
          </div>
        </ScrollReveal>

        <ScrollDivider />

        {/* Real-world examples */}
        <ScrollReveal delay={0}>
          <h3 className="text-2xl md:text-4xl font-display font-bold text-ink mb-10">
            أمثلة من الحياة اليومية
          </h3>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4 mb-20">
          {conditionsContent.examples.map((ex, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl glass-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{ex.icon}</span>
                  <span className="text-sm text-ink-faint font-mono">{ex.scenario}</span>
                </div>
                <code className="block font-mono text-sm text-[#64d2ff] mb-3 ltr:text-left" dir="ltr">
                  {ex.condition}
                </code>
                <p className="text-sm text-ink-soft leading-relaxed">{ex.result}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollDivider />

        {/* Interactive builder */}
        <ScrollReveal delay={0}>
          <h3 className="text-2xl md:text-4xl font-display font-bold text-ink mb-3">
            {conditionsContent.builderTitle}
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-sm md:text-lg text-ink-soft mb-10">
            {conditionsContent.builderSubtitle}
          </p>
        </ScrollReveal>

        <ConditionBuilder />
      </div>
    </section>
  );
}

/* ====== Interactive if/else builder ====== */
function ConditionBuilder() {
  const [score, setScore] = useState(85);
  const [threshold, setThreshold] = useState(50);
  const [trueMsg, setTrueMsg] = useState("مبروك! عدّيت");
  const [falseMsg, setFalseMsg] = useState("للأسف، رسبت");
  const [hasInteracted, setHasInteracted] = useState(false);
  const { showAha } = useLessonStore();

  const isTrue = score >= threshold;

  // Generic wrapper: passes the event through to fn, then triggers aha on first interaction
  const handleInteract = <E,>(fn: (e: E) => void) => (e: E) => {
    fn(e);
    if (!hasInteracted) {
      setHasInteracted(true);
      // Trigger aha after a short delay
      setTimeout(() => showAha("condition-built"), 800);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* LEFT: Controls */}
      <ScrollReveal delay={0.2}>
        <div className="p-6 md:p-8 rounded-2xl glass-card">
          <div className="space-y-6">
            {/* Score slider */}
            <div>
              <label className="block font-mono text-xs text-ink-faint mb-2 tracking-wider uppercase">
                Score (درجة الطالب)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={score}
                onChange={handleInteract((e: React.ChangeEvent<HTMLInputElement>) => {
                  setScore(Number(e.target.value));
                  playSound("type");
                })}
                className="w-full accent-[#0a84ff]"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-ink-faint">0</span>
                <span className="font-mono text-sm text-[#0a84ff]">{score}</span>
                <span className="text-xs text-ink-faint">100</span>
              </div>
            </div>

            {/* Threshold slider */}
            <div>
              <label className="block font-mono text-xs text-ink-faint mb-2 tracking-wider uppercase">
                Threshold (درجة النجاح)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={threshold}
                onChange={handleInteract((e: React.ChangeEvent<HTMLInputElement>) => {
                  setThreshold(Number(e.target.value));
                  playSound("type");
                })}
                className="w-full accent-[#bf5af2]"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-ink-faint">0</span>
                <span className="font-mono text-sm text-[#bf5af2]">{threshold}</span>
                <span className="text-xs text-ink-faint">100</span>
              </div>
            </div>

            {/* Messages */}
            <div>
              <label className="block font-mono text-xs text-ink-faint mb-2 tracking-wider uppercase">
                رسالة لو نجح
              </label>
              <input
                type="text"
                value={trueMsg}
                onChange={(e) => setTrueMsg(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.06] text-ink text-sm focus:outline-none focus:border-[#30d158] transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-ink-faint mb-2 tracking-wider uppercase">
                رسالة لو رسب
              </label>
              <input
                type="text"
                value={falseMsg}
                onChange={(e) => setFalseMsg(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.06] text-ink text-sm focus:outline-none focus:border-[#ff375f] transition-colors"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* RIGHT: Generated code + result */}
      <ScrollReveal delay={0.3}>
        <div className="flex flex-col gap-4">
          {/* Code preview */}
          <div className="bg-[#0d1117] rounded-2xl overflow-hidden border border-white/[0.06]">
            <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
              <span className="font-mono text-[11px] text-ink-faint">condition.py</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-ink-soft">PYTHON</span>
            </div>
            <div dir="ltr" className="p-5 font-mono text-[13px] leading-relaxed">
              <div>
                <span className="text-[#ff7b72]">if</span>{" "}
                <span className="text-[#ffa657]">score</span>{" "}
                <span className="text-[#ff7b72]">&gt;=</span>{" "}
                <span className="text-[#79c0ff]">{threshold}</span>
                <span className="text-ink">:</span>
              </div>
              <div className="pl-4">
                <span className="text-[#ff7b72]">print</span>
                <span className="text-ink">(</span>
                <span className="text-[#a5d6ff]">"{trueMsg}"</span>
                <span className="text-ink">)</span>
              </div>
              <div className={cn("transition-colors", !isTrue && "bg-[#ff375f]/10")}>
                <span className="text-[#ff7b72]">else</span>
                <span className="text-ink">:</span>
              </div>
              <div className="pl-4">
                <span className="text-[#ff7b72]">print</span>
                <span className="text-ink">(</span>
                <span className="text-[#a5d6ff]">"{falseMsg}"</span>
                <span className="text-ink">)</span>
              </div>
            </div>
          </div>

          {/* Live result */}
          <motion.div
            key={isTrue ? "true" : "false"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "p-6 rounded-2xl border text-center",
              isTrue
                ? "bg-[#30d158]/10 border-[#30d158]/30"
                : "bg-[#ff375f]/10 border-[#ff375f]/30",
            )}
          >
            <div className="text-3xl mb-2">{isTrue ? "✓" : "✗"}</div>
            <div className={cn("text-lg font-display font-bold", isTrue ? "text-[#30d158]" : "text-[#ff375f]")}>
              {isTrue ? trueMsg : falseMsg}
            </div>
            <div className="mt-2 text-xs text-ink-faint font-mono">
              لأن score ({score}) {isTrue ? ">=" : "<"} threshold ({threshold})
            </div>
          </motion.div>

          {/* Split-screen comparison: both branches visualized */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div
              className={cn(
                "p-4 rounded-xl border transition-all",
                isTrue
                  ? "bg-[#30d158]/10 border-[#30d158]/30 opacity-100"
                  : "bg-white/[0.02] border-white/[0.06] opacity-40",
              )}
            >
              <div className="font-mono text-[10px] text-[#30d158] mb-1">if TRUE</div>
              <div className="text-sm text-ink truncate">{trueMsg}</div>
            </div>
            <div
              className={cn(
                "p-4 rounded-xl border transition-all",
                !isTrue
                  ? "bg-[#ff375f]/10 border-[#ff375f]/30 opacity-100"
                  : "bg-white/[0.02] border-white/[0.06] opacity-40",
              )}
            >
              <div className="font-mono text-[10px] text-[#ff375f] mb-1">if FALSE</div>
              <div className="text-sm text-ink truncate">{falseMsg}</div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
