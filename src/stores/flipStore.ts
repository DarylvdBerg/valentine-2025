import {create} from 'zustand';

interface FlipState {
    flippedStates: { [key: string]: boolean };
    setFlipped: (id: string, flipped: boolean) => void;
  }
  
  export const useFlipStore = create<FlipState>((set) => ({
    flippedStates: {},
    setFlipped: (id, flipped) => set((state) => ({
      flippedStates: {
        ...state.flippedStates,
        [id]: flipped,
      },
    })),
  }));