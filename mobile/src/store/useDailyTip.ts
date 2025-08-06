import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { zustandStorage } from "./storage";
import { STORAGE_NAME } from "../constants";
import { tips } from "../constants/tips";
type TTip = {
  id: number;
  text: string;
};
interface TTipState {
  tip: TTip;
  update: (tip: TTip) => void;
  restore: () => void;
}

export const useDailyTipStore = create<TTipState>()(
  persist(
    (set, _get) => ({
      tip: tips[0],
      update: (tip) => set({ ..._get(), tip }),
      restore: () => set({ ..._get(), tip: tips[0] }),
    }),
    {
      name: STORAGE_NAME.DAILY_TIP,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
