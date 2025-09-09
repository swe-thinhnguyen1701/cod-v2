import { create } from "zustand";
import type SkillEntity from "../entities/SkillEntity";

interface SkillStore {
  selectedSkill: SkillEntity | null;
  isHeroSkill: boolean;
  isArtifactSkill: boolean;
  isPetSkill: boolean;
  setHeroSkill: (skill: SkillEntity) => void;
  setArtifactSkill: (skill: SkillEntity) => void;
  setPetSkill: (skill: SkillEntity) => void;
}

const useSkillStore = create<SkillStore>((set) => ({
  selectedSkill: null,
  isHeroSkill: false,
  isArtifactSkill: false,
  isPetSkill: false,
  setHeroSkill: (skill: SkillEntity) =>
    set({
      selectedSkill: skill,
      isHeroSkill: true,
      isArtifactSkill: false,
      isPetSkill: false,
    }),
  setArtifactSkill: (skill: SkillEntity) =>
    set({
      selectedSkill: skill,
      isHeroSkill: false,
      isArtifactSkill: true,
      isPetSkill: false,
    }),
  setPetSkill: (skill: SkillEntity) =>
    set({
      selectedSkill: skill,
      isHeroSkill: false,
      isArtifactSkill: false,
      isPetSkill: true,
    }),
}));

export default useSkillStore;
