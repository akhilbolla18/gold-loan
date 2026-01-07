import { create } from "zustand";

type JourneyState = {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const useJourneyStore = create<JourneyState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(1, s.step - 1) })),
}));
