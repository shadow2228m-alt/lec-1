"use client";

import { useEffect, useRef } from "react";
import { useLessonStore } from "@/lib/store/lesson-store";

/**
 * Ambient audio manager — procedurally generated evolving drones.
 * Different "moods" for different scroll positions.
 * Crossfades smoothly between moods.
 */

type Mood = "calm" | "curious" | "nostalgic" | "playful" | "uplifting" | "tense";

const moodConfig: Record<
  Mood,
  { freqs: number[]; type: OscillatorType; filterFreq: number; lfoFreq: number }
> = {
  calm: { freqs: [65.41, 98, 130.81], type: "sine", filterFreq: 400, lfoFreq: 0.08 },
  curious: { freqs: [65.41, 98, 164.81], type: "sine", filterFreq: 600, lfoFreq: 0.12 },
  nostalgic: { freqs: [55, 82.4, 130.81], type: "triangle", filterFreq: 350, lfoFreq: 0.06 },
  playful: { freqs: [130.81, 196, 261.63], type: "sine", filterFreq: 800, lfoFreq: 0.18 },
  uplifting: { freqs: [130.81, 164.81, 196], type: "sine", filterFreq: 1000, lfoFreq: 0.15 },
  tense: { freqs: [55, 58.27, 82.4], type: "sawtooth", filterFreq: 250, lfoFreq: 0.2 },
};

export function AmbientAudioManager() {
  const { audioEnabled, volume } = useLessonStore();
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const currentMoodRef = useRef<Mood>("calm");
  const startedRef = useRef(false);

  // Set the active mood (defined early so it can be called from other effects)
  function setMood(mood: Mood) {
    const ctx = ctxRef.current;
    const filter = filterRef.current;
    const lfo = lfoRef.current;
    if (!ctx || !filter || !lfo) return;

    const config = moodConfig[mood];
    currentMoodRef.current = mood;

    // Smoothly update filter and LFO
    filter.frequency.linearRampToValueAtTime(config.filterFreq, ctx.currentTime + 1.5);
    lfo.frequency.linearRampToValueAtTime(config.lfoFreq, ctx.currentTime + 1.5);

    // Stop existing oscillators with fade out
    const oldOscs = [...oscillatorsRef.current];
    oscillatorsRef.current = [];
    oldOscs.forEach((osc) => {
      try {
        osc.stop(ctx.currentTime + 1);
      } catch {
        // already stopped
      }
    });

    // Create new oscillators with fade in
    config.freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = config.type;
      osc.frequency.value = freq;
      osc.detune.value = (i - 1) * 5;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.3 / config.freqs.length, ctx.currentTime + 2);

      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      oscillatorsRef.current.push(osc);
    });
  }

  // Initialize audio context on first user interaction
  useEffect(() => {
    if (startedRef.current) return;
    const start = () => {
      if (startedRef.current) return;
      try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        ctxRef.current = ctx;

        // Master gain
        const master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
        masterGainRef.current = master;

        // Low-pass filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = moodConfig.calm.filterFreq;
        filter.Q.value = 1;
        filter.connect(master);
        filterRef.current = filter;

        // LFO to slowly modulate filter cutoff (evolving texture)
        const lfo = ctx.createOscillator();
        lfo.frequency.value = moodConfig.calm.lfoFreq;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 100;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        lfoRef.current = lfo;
        lfoGainRef.current = lfoGain;

        // Create initial oscillators (calm mood)
        setMood("calm");

        startedRef.current = true;
      } catch {
        // Audio not supported — silent fallback
      }
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  // Update master volume + enable state
  useEffect(() => {
    if (!masterGainRef.current || !ctxRef.current) return;
    const target = audioEnabled ? volume * 0.15 : 0;
    masterGainRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime);
    masterGainRef.current.gain.linearRampToValueAtTime(target, ctxRef.current.currentTime + 0.5);
  }, [audioEnabled, volume]);

  // Track scroll position to set mood
  useEffect(() => {
    const setMoodFromScroll = () => {
      if (!ctxRef.current) return;
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      let mood: Mood;
      if (scrollPercent < 0.1) mood = "calm";
      else if (scrollPercent < 0.3) mood = "curious";
      else if (scrollPercent < 0.5) mood = "nostalgic";
      else if (scrollPercent < 0.7) mood = "playful";
      else if (scrollPercent < 0.9) mood = "uplifting";
      else mood = "uplifting";

      if (mood !== currentMoodRef.current) {
        setMood(mood);
      }
    };

    window.addEventListener("scroll", setMoodFromScroll, { passive: true });
    setMoodFromScroll();
    return () => window.removeEventListener("scroll", setMoodFromScroll);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // already stopped
        }
      });
      try {
        lfoRef.current?.stop();
      } catch {
        // already stopped
      }
      ctxRef.current?.close();
    };
  }, []);

  return null;
}
