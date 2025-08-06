import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { THistory } from "../types";
import { STORAGE_NAME } from "../constants";

interface THistoryState {
  history: THistory[];
  add: (hist: THistory) => void;
  remove: (hist: THistory) => void;
  clear: () => void;
}

export const useHistoryStore = create<THistoryState>()(
  persist(
    (set, _get) => ({
      history: [],
      clear: () => set({ ..._get(), history: [] }),
      add: (hist) => set({ ..._get(), history: [hist, ..._get().history] }),
      remove: (hist) =>
        set({
          ..._get(),
          history: [..._get().history.filter((f) => f.id !== hist.id)],
        }),
    }),
    {
      name: STORAGE_NAME.HISTORY,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
