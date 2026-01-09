import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QDE1FormData } from "@/schemas/qde1.schema";
import { QDE2FormData } from "@/schemas/qde2.schema";
import { QDE3FormData } from "@/schemas/qde3.schema";
import { QDE4FormData } from "@/schemas/qde4.schema";


type JourneyState = {
  step: number;

  qde1?: QDE1FormData;
  qde2?: QDE2FormData;
  qde3?: QDE3FormData;
  qde4?: QDE4FormData;


  setQDE1: (data: QDE1FormData) => void;
  setQDE2: (data: QDE2FormData) => void;
  setQDE3: (data: QDE3FormData) => void;
setQDE4: (data: QDE4FormData) => void;


  nextStep: () => void;
  prevStep: () => void;
  resetJourney: () => void;
};

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set) => ({
      step: 1,

      qde1: undefined,
      qde2: undefined,
      qde3: undefined,
      qde4: undefined,


      setQDE1: (data) => set({ qde1: data }),
      setQDE2: (data) => set({ qde2: data }),
      setQDE3: (data) => set({ qde3: data }),
setQDE4: (data) => set({ qde4: data }),


      nextStep: () =>
        set((state) => ({ step: state.step + 1 })),

      prevStep: () =>
        set((state) => ({ step: Math.max(1, state.step - 1) })),

      resetJourney: () =>
        set({
          step: 1,
          qde1: undefined,
          qde2: undefined,
        }),
    }),
    {
      name: "hdb-gold-loan-journey",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) =>
          sessionStorage.removeItem(name),
      },
    }
  )
);
