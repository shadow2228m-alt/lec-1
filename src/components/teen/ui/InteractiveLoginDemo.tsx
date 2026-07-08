"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { playSound } from "@/lib/audio";
import { useLessonStore } from "@/lib/store/lesson-store";

/**
 * InteractiveLoginDemo — الطالب يكتب email/password بنفسه،
 * يضغط Run، يشوف الكود بينفّذ خطوة بخطوة والـ output الحقيقي.
 *
 * This is the centerpiece: hands-on, real programming feedback.
 */

const VALID_EMAIL = "ahmed@code.academy";
const VALID_PASSWORD = "1234";

type RunState = "idle" | "running" | "success" | "error" | "empty";

interface ExecutionStep {
  code: string;
  result: string;
  type: "check" | "compare" | "decision";
}

export function InteractiveLoginDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<RunState>("idle");
  const [currentStep, setCurrentStep] = useState(-1);
  const [output, setOutput] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const runSequence = () => {
    if (state === "running") return;
    setState("running");
    setOutput([]);
    setCurrentStep(-1);
    playSound("click");

    // Build execution steps based on input
    const steps: ExecutionStep[] = [];
    const outputs: string[] = [];

    // Step 1: Read inputs
    steps.push({
      code: 'email = "' + (email || "") + '"',
      result: `→ email: "${email || ""}"`,
      type: "check",
    });
    outputs.push(`→ email: "${email || ""}"`);

    steps.push({
      code: 'password = "' + "*".repeat(password.length) + '"',
      result: `→ password: "${"*".repeat(password.length)}"`,
      type: "check",
    });
    outputs.push(`→ password: "${"*".repeat(password.length)}"`);

    // Step 2: Check empty
    if (!email || !password) {
      steps.push({
        code: "if not email or not password:",
        result: "→ True (في حقول فاضية)",
        type: "decision",
      });
      outputs.push("→ True (في حقول فاضية)");
      steps.push({
        code: '    return "من فضلك املأ كل الحقول"',
        result: "✗ من فضلك املأ كل الحقول",
        type: "decision",
      });
      outputs.push("✗ من فضلك املأ كل الحقول");
    } else {
      steps.push({
        code: "if not email or not password:",
        result: "→ False (كل الحقول مليانة)",
        type: "decision",
      });
      outputs.push("→ False (كل الحقول مليانة)");

      // Step 3: Validate
      const emailOk = email === VALID_EMAIL;
      const passOk = password === VALID_PASSWORD;

      steps.push({
        code: `if email == "${VALID_EMAIL}" and password == "****":`,
        result: `→ ${emailOk && passOk ? "True" : "False"} (email: ${emailOk ? "✓" : "✗"}, password: ${passOk ? "✓" : "✗"})`,
        type: "compare",
      });
      outputs.push(
        `→ ${emailOk && passOk ? "True" : "False"} (email: ${emailOk ? "✓" : "✗"}, password: ${passOk ? "✓" : "✗"})`,
      );

      if (emailOk && passOk) {
        steps.push({
          code: '    return "أهلًا يا أحمد! تم تسجيل الدخول ✓"',
          result: "✓ أهلًا يا أحمد! تم تسجيل الدخول",
          type: "decision",
        });
        outputs.push("✓ أهلًا يا أحمد! تم تسجيل الدخول");
      } else {
        steps.push({
          code: '    return "البيانات غير صحيحة ✕"',
          result: "✗ البيانات غير صحيحة",
          type: "decision",
        });
        outputs.push("✗ البيانات غير صحيحة");
      }
    }

    // Animate through steps
    let i = 0;
    const stepDelay = 700;
    const runNext = () => {
      if (i >= steps.length) {
        const finalOutput = outputs[outputs.length - 1];
        if (finalOutput.startsWith("✓")) {
          setState("success");
          playSound("success");
          // Trigger aha moment on first successful login
          const { showAha, hasShown } = useLessonStore.getState();
          if (!hasShown("login-success")) {
            setTimeout(() => showAha("login-success"), 1000);
          }
        } else if (finalOutput.startsWith("✗")) {
          setState("error");
          playSound("error");
        } else {
          setState("idle");
        }
        return;
      }
      setCurrentStep(i);
      playSound("type");
      i++;
      setTimeout(runNext, stepDelay);
    };
    setTimeout(runNext, 400);
  };

  const reset = () => {
    setState("idle");
    setCurrentStep(-1);
    setOutput([]);
    playSound("click");
  };

  const fillExample = (type: "correct" | "wrong" | "empty") => {
    if (type === "correct") {
      setEmail(VALID_EMAIL);
      setPassword(VALID_PASSWORD);
    } else if (type === "wrong") {
      setEmail("test@test.com");
      setPassword("wrong");
    } else {
      setEmail("");
      setPassword("");
    }
    reset();
    playSound("click");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {/* LEFT: Inputs + controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl p-6 md:p-8 shadow-premium"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#0a84ff]" />
          <span className="font-mono text-xs text-ink-soft tracking-wider uppercase">
            جرّب بنفسك
          </span>
        </div>

        <h4 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2">
          ادخل بياناتك
        </h4>
        <p className="text-sm text-ink-soft mb-8 leading-relaxed">
          اكتب إيميل وكلمة مرور، ودوس Run. البرنامج هيتنفّذ خطوة بخطوة قدامك.
        </p>

        {/* Email input */}
        <div className="mb-5">
          <label className="block font-mono text-[11px] text-ink-faint mb-2 tracking-wider uppercase">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state !== "idle") reset();
            }}
            dir="ltr"
            placeholder="ahmed@code.academy"
            className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-ink font-mono text-sm focus:outline-none focus:border-[#0a84ff] focus:ring-2 focus:ring-[#0a84ff]/20 transition-all"
          />
        </div>

        {/* Password input */}
        <div className="mb-6">
          <label className="block font-mono text-[11px] text-ink-faint mb-2 tracking-wider uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (state !== "idle") reset();
            }}
            dir="ltr"
            placeholder="••••"
            className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-ink font-mono text-sm focus:outline-none focus:border-[#0a84ff] focus:ring-2 focus:ring-[#0a84ff]/20 transition-all"
          />
        </div>

        {/* Quick fill buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <QuickFillBtn onClick={() => fillExample("correct")} label="بيانات صحيحة" />
          <QuickFillBtn onClick={() => fillExample("wrong")} label="بيانات غلط" />
          <QuickFillBtn onClick={() => fillExample("empty")} label="حقول فاضية" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={runSequence}
            disabled={state === "running"}
            whileHover={{ scale: state === "running" ? 1 : 1.02 }}
            whileTap={{ scale: state === "running" ? 1 : 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0a84ff] text-white font-display font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#64d2ff]"
          >
            {state === "running" ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                بينفّذ...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 2 L11 7 L3 12 Z" fill="currentColor" />
                </svg>
                Run
              </>
            )}
          </motion.button>
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-3.5 rounded-xl bg-white/[0.06] text-ink font-display font-bold border border-white/[0.08] hover:bg-white/[0.1] transition-colors"
          >
            Reset
          </motion.button>
        </div>

        {/* Hint button */}
        <button
          onClick={() => {
            setShowHint(!showHint);
            playSound("click");
          }}
          className="mt-4 text-xs text-ink-faint hover:text-ink-soft transition-colors font-mono"
        >
          {showHint ? "✕ إخفاء التلميح" : "💡 محتاج تلميح؟"}
        </button>
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-4 rounded-xl bg-[#ff9f0a]/[0.06] border border-[#ff9f0a]/20 text-sm text-ink-soft leading-relaxed">
                جرّب: <code className="font-mono text-[#ff9f0a]">ahmed@code.academy</code> و <code className="font-mono text-[#ff9f0a]">1234</code>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* RIGHT: Live execution + output */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-5"
      >
        {/* Execution trace */}
        <div className="bg-[#0d1117] rounded-2xl overflow-hidden shadow-premium border border-white/[0.06] flex-1">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
            <span className="font-mono text-[11px] text-ink-faint ml-2">
              execution_trace.py
            </span>
          </div>
          <div dir="ltr" className="px-5 py-4 font-mono text-[12px] md:text-[13px] leading-[1.9] min-h-[200px]">
            <AnimatePresence mode="popLayout">
              {currentStep >= 0 && (
                <ExecutionTrace key="trace" stepIndex={currentStep} email={email} password={password} />
              )}
            </AnimatePresence>
            {currentStep === -1 && (
              <div className="text-ink-darker italic">
                {/* idle state */}
                {"# اضغط Run علشان تشوف التنفيذ"}
              </div>
            )}
          </div>
        </div>

        {/* Output terminal */}
        <div className="bg-[#0d1117] rounded-2xl overflow-hidden shadow-premium border border-white/[0.06]">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
            <span className="font-mono text-[11px] text-ink-faint ml-2">output</span>
            {state === "success" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded bg-[#30d158]/15 text-[#30d158]"
              >
                SUCCESS
              </motion.span>
            )}
            {state === "error" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-auto font-mono text-[10px] px-2 py-0.5 rounded bg-[#ff375f]/15 text-[#ff375f]"
              >
                ERROR
              </motion.span>
            )}
          </div>
          <div dir="ltr" className="px-5 py-4 font-mono text-[12px] md:text-[13px] leading-[1.9] min-h-[80px]">
            {state === "idle" && (
              <div className="flex items-center gap-2">
                <span className="text-[#30d158]">$</span>
                <motion.span
                  className="inline-block w-2 h-4 bg-[#0a84ff]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}
            {state === "running" && currentStep >= 0 && (
              <RunningOutput email={email} password={password} stepIndex={currentStep} />
            )}
            {(state === "success" || state === "error") && (
              <FinalOutput email={email} password={password} state={state} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ====== Execution trace — shows the current line being executed ====== */
function ExecutionTrace({
  stepIndex,
  email,
  password,
}: {
  stepIndex: number;
  email: string;
  password: string;
}) {
  const lines = [
    { code: `email = "${email || ""}"`, type: "var" },
    { code: `password = "${"*".repeat(password.length)}"`, type: "var" },
  ];

  if (!email || !password) {
    lines.push({ code: "if not email or not password:", type: "kw" });
    lines.push({ code: '    return "من فضلك املأ كل الحقول"', type: "str" });
  } else {
    const emailOk = email === VALID_EMAIL;
    const passOk = password === VALID_PASSWORD;
    lines.push({ code: "if not email or not password:", type: "kw" });
    lines.push({
      code: `if email == "${VALID_EMAIL}" and password == "****":`,
      type: "kw",
    });
    if (emailOk && passOk) {
      lines.push({ code: '    return "أهلًا يا أحمد! ✓"', type: "str" });
    } else {
      lines.push({ code: '    return "البيانات غير صحيحة ✕"', type: "str" });
    }
  }

  const tokenColor: Record<string, string> = {
    var: "text-[#ffa657]",
    kw: "text-[#ff7b72]",
    str: "text-[#a5d6ff]",
  };

  return (
    <div>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{
            opacity: i <= stepIndex ? 1 : 0.25,
            x: 0,
            backgroundColor: i === stepIndex ? "rgba(10, 132, 255, 0.08)" : "rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.2 }}
          className="px-2 -mx-2 rounded flex"
        >
          <span className="inline-block w-6 text-ink-darker/60 select-none text-right shrink-0">
            {i + 1}
          </span>
          <span className={`flex-1 whitespace-pre ${tokenColor[line.type]}`}>
            {line.code}
          </span>
          {i === stepIndex && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-[#0a84ff] mr-2"
            >
              ←
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ====== Running output — shows progressive output as steps execute ====== */
function RunningOutput({
  email,
  password,
  stepIndex,
}: {
  email: string;
  password: string;
  stepIndex: number;
}) {
  const outputs: { text: string; color: string }[] = [
    { text: `→ email: "${email || ""}"`, color: "text-ink-soft" },
    { text: `→ password: "${"*".repeat(password.length)}"`, color: "text-ink-soft" },
  ];

  if (!email || !password) {
    outputs.push({ text: "→ True (حقول فاضية)", color: "text-[#ff9f0a]" });
    outputs.push({ text: "✗ من فضلك املأ كل الحقول", color: "text-[#ff375f]" });
  } else {
    const emailOk = email === VALID_EMAIL;
    const passOk = password === VALID_PASSWORD;
    outputs.push({ text: "→ False (كل الحقول مليانة)", color: "text-[#30d158]" });
    outputs.push({
      text: `→ ${emailOk && passOk ? "True" : "False"} (email: ${emailOk ? "✓" : "✗"}, password: ${passOk ? "✓" : "✗"})`,
      color: emailOk && passOk ? "text-[#30d158]" : "text-[#ff375f]",
    });
    if (emailOk && passOk) {
      outputs.push({ text: "✓ أهلًا يا أحمد! تم تسجيل الدخول", color: "text-[#30d158]" });
    } else {
      outputs.push({ text: "✗ البيانات غير صحيحة", color: "text-[#ff375f]" });
    }
  }

  return (
    <div>
      {outputs.slice(0, stepIndex + 1).map((o, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={o.color}
        >
          {o.text}
        </motion.div>
      ))}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[#30d158]">$</span>
        <motion.span
          className="inline-block w-2 h-4 bg-[#0a84ff]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

/* ====== Final output — when execution completes ====== */
function FinalOutput({
  email,
  password,
  state,
}: {
  email: string;
  password: string;
  state: "success" | "error";
}) {
  const outputs: { text: string; color: string }[] = [
    { text: `→ email: "${email || ""}"`, color: "text-ink-soft" },
    { text: `→ password: "${"*".repeat(password.length)}"`, color: "text-ink-soft" },
  ];

  if (!email || !password) {
    outputs.push({ text: "→ True (حقول فاضية)", color: "text-[#ff9f0a]" });
    outputs.push({ text: "✗ من فضلك املأ كل الحقول", color: "text-[#ff375f]" });
  } else {
    const emailOk = email === VALID_EMAIL;
    const passOk = password === VALID_PASSWORD;
    outputs.push({ text: "→ False (كل الحقول مليانة)", color: "text-[#30d158]" });
    outputs.push({
      text: `→ ${emailOk && passOk ? "True" : "False"} (email: ${emailOk ? "✓" : "✗"}, password: ${passOk ? "✓" : "✗"})`,
      color: emailOk && passOk ? "text-[#30d158]" : "text-[#ff375f]",
    });
    if (emailOk && passOk) {
      outputs.push({ text: "✓ أهلًا يا أحمد! تم تسجيل الدخول", color: "text-[#30d158]" });
    } else {
      outputs.push({ text: "✗ البيانات غير صحيحة", color: "text-[#ff375f]" });
    }
  }

  return (
    <div>
      {outputs.map((o, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={o.color}
        >
          {o.text}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: outputs.length * 0.1 }}
        className={`mt-2 pt-2 border-t border-white/[0.06] font-bold ${
          state === "success" ? "text-[#30d158]" : "text-[#ff375f]"
        }`}
      >
        {state === "success" ? "✓ Process finished — exit code 0" : "✗ Process finished — exit code 1"}
      </motion.div>
    </div>
  );
}

/* ====== Quick fill button ====== */
function QuickFillBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-ink-soft hover:text-ink hover:bg-white/[0.08] transition-colors font-mono"
    >
      {label}
    </motion.button>
  );
}
