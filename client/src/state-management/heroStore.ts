import { create } from "zustand";
import type {HeroEntity} from "../entities/HeroEntity";

interface HeroStore {
  hero: HeroEntity | null;
  setHero: (hero: HeroEntity) => void;
}

const useHeroStore = create<HeroStore>((set) => ({
  hero: null,
  setHero: (hero: HeroEntity) => set({ hero })
}));

export default useHeroStore;
