import { create } from "zustand";

export const useValentineStore = create((set) => ({
    relationCheck: true,
    intro: false,
    hideRelationCheck: () => set({ relationCheck: false }),
    showIntro: () => set({ intro: true }),
    hideIntro: () => set({ intro: false}),
}))