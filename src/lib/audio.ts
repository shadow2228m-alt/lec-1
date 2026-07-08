/**
 * Lightweight Web Audio API for tech-style SFX.
 * Subtle, non-intrusive sounds suitable for a teen learning platform.
 */

import { useEffect, useRef } from "react";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioCtx = new Ctx();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}

type SoundType =
  | "hover"
  | "click"
  | "pop"
  | "step"
  | "type"
  | "success"
  | "error"
  | "reveal"
  | "whoosh"
  | "beep"
  | "celebrate";

interface ToneOpts {
  freq: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  delay?: number;
  freqEnd?: number;
}

function playTone({
  freq,
  duration,
  type = "sine",
  volume = 0.12,
  delay = 0,
  freqEnd,
}: ToneOpts) {
  const ctx = getCtx();
  if (!ctx) return;

  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (freqEnd) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), start + duration);
  }

  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.04);
}

export function playSound(type: SoundType) {
  switch (type) {
    case "hover":
      playTone({ freq: 880, duration: 0.04, type: "sine", volume: 0.04 });
      break;
    case "click":
      playTone({ freq: 540, duration: 0.06, type: "triangle", volume: 0.1 });
      playTone({ freq: 720, duration: 0.04, type: "sine", volume: 0.06, delay: 0.02 });
      break;
    case "step":
      playTone({ freq: 440, duration: 0.07, type: "triangle", volume: 0.08 });
      break;
    case "type":
      playTone({ freq: 660, duration: 0.02, type: "square", volume: 0.04 });
      break;
    case "success":
      playTone({ freq: 523, duration: 0.1, type: "sine", volume: 0.1 });
      playTone({ freq: 784, duration: 0.16, type: "sine", volume: 0.12, delay: 0.08 });
      playTone({ freq: 1047, duration: 0.2, type: "sine", volume: 0.14, delay: 0.16 });
      break;
    case "error":
      playTone({ freq: 280, freqEnd: 140, duration: 0.22, type: "sawtooth", volume: 0.08 });
      break;
    case "reveal":
      playTone({ freq: 320, freqEnd: 640, duration: 0.18, type: "sine", volume: 0.08 });
      break;
    case "whoosh":
      playTone({ freq: 180, freqEnd: 540, duration: 0.3, type: "sine", volume: 0.06 });
      break;
    case "pop":
      playTone({ freq: 520, freqEnd: 760, duration: 0.12, type: "sine", volume: 0.16 });
      break;
    case "beep":
      playTone({ freq: 880, duration: 0.06, type: "square", volume: 0.08 });
      playTone({ freq: 1320, duration: 0.06, type: "square", volume: 0.06, delay: 0.04 });
      break;
    case "celebrate":
      playTone({ freq: 523, duration: 0.12, type: "triangle", volume: 0.16 });
      playTone({ freq: 659, duration: 0.12, type: "triangle", volume: 0.16, delay: 0.12 });
      playTone({ freq: 784, duration: 0.12, type: "triangle", volume: 0.16, delay: 0.24 });
      playTone({ freq: 1047, duration: 0.3, type: "triangle", volume: 0.18, delay: 0.36 });
      break;
  }
}

export function primeAudio() {
  getCtx();
}

/** Hook to prime audio on first interaction */
export function useAudioPrimer() {
  const primed = useRef(false);
  useEffect(() => {
    const prime = () => {
      if (primed.current) return;
      primeAudio();
      primed.current = true;
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
    window.addEventListener("pointerdown", prime);
    window.addEventListener("keydown", prime);
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
  }, []);
}
