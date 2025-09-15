import { create } from "zustand";
import type { PetEntity } from "../entities/PetEntity";

interface PetStore {
  pet: PetEntity | null;
  setPet: (pet: PetEntity) => void;
  reset: () => void;
}

const usePetStore = create<PetStore>((set) => ({
  pet: null,
  setPet: (pet: PetEntity) => set({ pet }),
  reset: () => set({ pet: null }),
}));

export default usePetStore;
