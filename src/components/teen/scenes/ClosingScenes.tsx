"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { summaryContent, skillsContent, aheadContent, finalContent } from "@/lib/content/teen-lesson-1";
import { ScrollReveal, ScrollDivider } from "./IntroScene";
import { playSound } from "@/lib/audio";
import { cn } from "@/lib/utils";

/* ====== Summary Scene ====== */
export function SummaryScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  return (
    <section ref={ref} id="summary" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {summaryContent.eyebrow}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{summaryContent.title}</ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-3xl leading-relaxed mb-20 font-body">
            {summaryContent.subtitle}
          </p>
        </ScrollReveal>

        <ScrollDivider />

        <ScrollReveal delay={0}>
          <h3 className="text-2xl md:text-4xl font-display font-bold text-ink mb-10">
            {summaryContent.conceptsTitle}
          </h3>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {summaryContent.concepts.map((c, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl glass-card h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{c.icon}</span>
                  <span className="font-mono text-xs text-[#0a84ff]">{c.num}</span>
                </div>
                <h4 className="text-lg md:text-xl font-display font-bold text-ink mb-2">
                  {c.title}
                </h4>
                <p className="text-sm text-ink-soft leading-relaxed">{c.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== Skills Scene ====== */
export function SkillsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  return (
    <section ref={ref} id="skills" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {skillsContent.eyebrow}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{skillsContent.title}</ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-3xl leading-relaxed mb-20 font-body">
            {skillsContent.subtitle}
          </p>
        </ScrollReveal>

        <ScrollDivider />

        <div className="space-y-3">
          {skillsContent.skills.map((s, i) => (
            <SkillRow key={i} skill={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillRow({ skill, index }: { skill: typeof skillsContent.skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      whileHover={{ x: -4 }}
      className="flex items-center gap-6 py-6 border-b border-white/[0.06]"
    >
      <motion.div
        style={{ opacity: numberOpacity }}
        className="font-display font-bold text-4xl md:text-6xl text-[#0a84ff] leading-none shrink-0 w-16 tabular-nums"
      >
        {skill.num}
      </motion.div>
      <div className="text-3xl shrink-0">{skill.icon}</div>
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-display font-bold text-ink mb-1">
          {skill.title}
        </h3>
        <p className="text-sm md:text-base text-ink-soft">{skill.desc}</p>
      </div>
    </motion.div>
  );
}

/* ====== Looking Ahead Scene ====== */
export function AheadScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, -60]);

  return (
    <section ref={ref} id="ahead" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <ScrollReveal delay={0}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {aheadContent.eyebrow}
          </p>
        </ScrollReveal>

        <motion.h2
          style={{ y: titleY }}
          className="text-[40px] md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient"
        >
          <ScrollReveal delay={0.1}>{aheadContent.title}</ScrollReveal>
        </motion.h2>

        <ScrollReveal delay={0.25}>
          <p className="text-base md:text-xl text-ink-soft max-w-3xl leading-relaxed mb-16 font-body">
            {aheadContent.subtitle}
          </p>
        </ScrollReveal>

        <div className="space-y-4 mb-16">
          {aheadContent.nextLesson.map((item, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.1}>
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center gap-6 p-6 rounded-2xl glass-card"
              >
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-ink mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-soft">{item.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Quote */}
        <ScrollReveal delay={0}>
          <div className="relative p-8 md:p-12 rounded-3xl bg-[#0a84ff]/[0.06] border border-[#0a84ff]/20 text-center">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-lg md:text-2xl text-ink leading-relaxed font-body italic">
              {aheadContent.quote}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ====== Final Word Scene ====== */
export function FinalScene({ onReplay }: { onReplay: () => void }) {
  return (
    <section id="final" className="relative py-32 md:py-48 px-6">
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        {/* Badge */}
        <ScrollReveal delay={0}>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#0a84ff] to-[#bf5af2] text-white font-display font-bold mb-10 shadow-glow-blue"
          >
            <span className="text-2xl">🏆</span>
            {finalContent.badge}
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-mono text-xs text-accent mb-4 tracking-[0.2em] uppercase">
            {finalContent.eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8 text-gradient-blue">
            {finalContent.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="text-lg md:text-xl text-ink-soft leading-relaxed mb-12 font-body">
            {finalContent.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="p-6 md:p-8 rounded-2xl glass-card mb-12 text-right">
            <p className="text-sm md:text-base text-ink-soft leading-relaxed font-body">
              {finalContent.finalText}
            </p>
          </div>
        </ScrollReveal>

        {/* Signature */}
        <ScrollReveal delay={0.6}>
          <div className="mb-12">
            <div className="text-2xl font-display font-bold text-ink mb-1">
              {finalContent.signature}
            </div>
            <div className="text-sm text-ink-faint font-mono">{finalContent.role}</div>
          </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={() => {
                playSound("click");
                onReplay();
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 rounded-full bg-[#0a84ff] text-white font-display font-bold shadow-glow-blue hover:bg-[#64d2ff] transition-colors"
            >
              ↻ {finalContent.replayCta}
            </motion.button>
            <motion.button
              onClick={() => {
                playSound("click");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 rounded-full bg-white/[0.06] text-ink font-display font-bold border border-white/[0.08] hover:bg-white/[0.1] transition-colors"
            >
              ↑ {finalContent.homeCta}
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
