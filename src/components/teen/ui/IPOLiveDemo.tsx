"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { playSound } from "@/lib/audio";
import { cn } from "@/lib/utils";

/**
 * IPOLiveDemo — الطالب يكتب اسمه، يختار نوع المعالجة،
 * يشوف الـ input بيتحوّل عبر Processing لـ Output قدام عينه.
 */

type ProcessType = "greet" | "uppercase" | "count" | "reverse";

const processes: { id: ProcessType; label: string; icon: string; code: string }[] = [
  { id: "greet", label: "تحية", icon: "👋", code: 'return "أهلًا يا " + name' },
  { id: "uppercase", label: "تكبير الحروف", icon: "🔠", code: "return name.upper()" },
  { id: "count", label: "عدّ الحروف", icon: "🔢", code: "return len(name)" },
  { id: "reverse", label: "قلب النص", icon: "🔄", code: "return name[::-1]" },
];

export function IPOLiveDemo() {
  const [name, setName] = useState("Ahmed");
  const [process, setProcess] = useState<ProcessType>("greet");
  const [hasRun, setHasRun] = useState(false);

  const run = () => {
    setHasRun(true);
    playSound("success");
  };

  // Compute output based on process type
  const getOutput = (): string => {
    if (!name) return "";
    switch (process) {
      case "greet":
        return `أهلًا يا ${name}! 👋`;
      case "uppercase":
        return name.toUpperCase();
      case "count":
        return `${name.length} حرف`;
      case "reverse":
        return name.split("").reverse().join("");
    }
  };

  return (
    <div className="my-12">
      {/* IPO visualization */}
      <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch mb-6">
        {/* INPUT */}
        <IPOBox
          title="Input"
          subtitle="المدخلات"
          color="cyan"
          delay={0}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setHasRun(false);
            }}
            dir="ltr"
            placeholder="اكتب اسمك..."
            className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-ink font-mono text-sm text-center focus:outline-none focus:border-[#64d2ff] transition-colors"
          />
          <div className="mt-2 font-mono text-[11px] text-[#64d2ff] text-center truncate">
            name = "{name || "..."}"
          </div>
        </IPOBox>

        {/* Arrow */}
        <ArrowConnector active={hasRun} delay={0.6} />

        {/* PROCESSING */}
        <IPOBox
          title="Processing"
          subtitle="المعالجة"
          color="violet"
          delay={0.4}
        >
          <div className="grid grid-cols-2 gap-2">
            {processes.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => {
                  setProcess(p.id);
                  setHasRun(false);
                  playSound("click");
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "p-2 rounded-lg border text-xs transition-all flex flex-col items-center gap-1",
                  process === p.id
                    ? "bg-[#bf5af2]/15 border-[#bf5af2]/40 text-ink"
                    : "bg-white/[0.04] border-white/[0.06] text-ink-soft hover:border-[#bf5af2]/30",
                )}
              >
                <span className="text-lg">{p.icon}</span>
                <span className="text-[10px]">{p.label}</span>
              </motion.button>
            ))}
          </div>
          <div className="mt-2 font-mono text-[11px] text-[#bf5af2] text-center truncate">
            {processes.find((p) => p.id === process)?.code}
          </div>
        </IPOBox>

        {/* Arrow */}
        <ArrowConnector active={hasRun} delay={1.0} />

        {/* OUTPUT */}
        <IPOBox
          title="Output"
          subtitle="النتيجة"
          color="mint"
          delay={1.4}
        >
          <div className="px-3 py-2.5 rounded-lg bg-black/40 border border-white/[0.06] min-h-[42px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {hasRun ? (
                <motion.div
                  key={process + name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-sm font-mono text-[#30d158] text-center break-all"
                >
                  {getOutput()}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-ink-faint italic"
                >
                  اضغط Run
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-2 font-mono text-[11px] text-[#30d158] text-center">
            result = {hasRun ? "✓" : "..."}
          </div>
        </IPOBox>
      </div>

      {/* Run button */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={run}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0a84ff] text-white font-display font-bold transition-colors hover:bg-[#64d2ff]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2 L11 7 L3 12 Z" fill="currentColor" />
          </svg>
          Run
        </motion.button>
      </div>

      {/* Insight */}
      <div className="p-5 rounded-xl bg-[#0a84ff]/[0.06] border border-[#0a84ff]/20 text-sm text-ink-soft leading-relaxed text-center">
        💡 كل ما تغيّر الـ <span className="text-[#64d2ff] font-mono">input</span> أو الـ <span className="text-[#bf5af2] font-mono">processing</span>، الـ <span className="text-[#30d158] font-mono">output</span> بيتغيّر.
        ده بالظبط إزاي كل برنامج بيشتغل.
      </div>
    </div>
  );
}

/* ====== IPO Box ====== */
function IPOBox({
  title,
  subtitle,
  color,
  delay,
  children,
}: {
  title: string;
  subtitle: string;
  color: "cyan" | "violet" | "mint";
  delay: number;
  children: React.ReactNode;
}) {
  const colors = {
    cyan: {
      border: "border-[#64d2ff]/30",
      bg: "bg-[#64d2ff]/[0.04]",
      title: "text-[#64d2ff]",
      dot: "bg-[#64d2ff]",
    },
    violet: {
      border: "border-[#bf5af2]/30",
      bg: "bg-[#bf5af2]/[0.04]",
      title: "text-[#bf5af2]",
      dot: "bg-[#bf5af2]",
    },
    mint: {
      border: "border-[#30d158]/30",
      bg: "bg-[#30d158]/[0.04]",
      title: "text-[#30d158]",
      dot: "bg-[#30d158]",
    },
  };
  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative p-5 rounded-2xl border backdrop-blur-md", c.border, c.bg)}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
        <span className={cn("font-mono text-[11px] uppercase tracking-[0.15em]", c.title)}>
          {title}
        </span>
      </div>
      <div className="text-xs text-ink-soft mb-4">{subtitle}</div>
      {children}
    </motion.div>
  );
}

/* ====== Arrow with pulse when active ====== */
function ArrowConnector({ active, delay }: { active: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="hidden lg:flex items-center justify-center"
    >
      <motion.svg
        width="50"
        height="20"
        viewBox="0 0 50 20"
        fill="none"
        animate={active ? { x: [0, 4, 0] } : {}}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
      >
        <motion.path
          d="M 2 10 L 40 10"
          stroke={active ? "#0a84ff" : "#48484a"}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        />
        <motion.path
          d="M 36 5 L 42 10 L 36 15"
          stroke={active ? "#0a84ff" : "#48484a"}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.8 }}
        />
      </motion.svg>
    </motion.div>
  );
}
