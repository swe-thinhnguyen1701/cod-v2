import { create } from "zustand";
import type SkillEntity from "../entities/SkillEntity";

interface SkillStore {
    selectedSkill: SkillEntity | null;
    setSelectedSkill: (skill: SkillEntity) => void;
}

const useSkillStore = create<SkillStore>((set) => ({
    selectedSkill: null,
    setSelectedSkill: (skill: SkillEntity) => set({ selectedSkill: skill })
}));

export default useSkillStore