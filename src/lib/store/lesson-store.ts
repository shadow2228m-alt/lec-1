import { create } from "zustand";

interface AhaState {
  /** Set of aha moment IDs that have been shown */
  shown: Set<string>;
  /** Currently active aha moment (or null) */
  active: string | null;
  /** Audio enabled flag */
  audioEnabled: boolean;
  /** Master volume 0-1 */
  volume: number;

  showAha: (id: string) => void;
  dismissAha: () => void;
  hasShown: (id: string) => boolean;
  toggleAudio: () => void;
  setVolume: (v: number) => void;
}

export const useLessonStore = create<AhaState>((set, get) => ({
  shown: new Set<string>(),
  active: null,
  audioEnabled: true,
  volume: 0.4,

  showAha: (id: string) => {
    const state = get();
    if (state.shown.has(id)) return; // Already shown — don't repeat
    const newShown = new Set(state.shown);
    newShown.add(id);
    set({ shown: newShown, active: id });
  },

  dismissAha: () => set({ active: null }),

  hasShown: (id: string) => get().shown.has(id),

  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),

  setVolume: (v: number) => set({ volume: Math.max(0, Math.min(1, v)) }),
}));
