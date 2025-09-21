import { create } from "zustand";
import type { PetEntity, PetAttribute } from "../entities/PetEntity";
import type SkillEntity from "../entities/SkillEntity";

interface SelectedSkillSet {
  idx: number;
  skills: SkillEntity[];
}

interface SelectedSkill {
  idx: number;
  skill: SkillEntity;
}

interface PetStore {
  pet: PetEntity | null;
  petAttributes: PetAttribute[];
  numOfSkillSets: SkillEntity[][];
  selectedNumOfSkills: number;
  selectedSkillSet: SelectedSkillSet;
  selectedSkill: SelectedSkill | null;
  initializePetAttributes: (attributes: PetAttribute[]) => void;
  setPet: (pet: PetEntity) => void;
  setAttributeAt: (idx: number, value: number) => void;
  setSelectedNumOfSkills: (numOfSkills: number) => void;
  setSelectedSkillSet: (skillSetOption: number) => void;
  setSelectedSkill: (skillOption: number) => void;
  reset: () => void;
}

const usePetStore = create<PetStore>((set) => ({
  pet: null,
  petAttributes: [],
  numOfSkillSets: [],
  selectedNumOfSkills: 4,
  selectedSkillSet: { idx: 0, skills: [] },
  selectedSkill: null,
  setPet: (pet: PetEntity) => set({ pet }),
  initializePetAttributes: (attributes: PetAttribute[]) =>
    set((state) => {
      if (!state.pet) return {};

      const newAttributes = attributes.map((attr) => (attr));
      const numOfSkillSets = state.pet?.recommended_skills.filter(
        (skillList) => skillList.length === 4
      );

      return {
        petAttributes: newAttributes,
        numOfSkillSets: numOfSkillSets,
        selectedSkillSet: {
          idx: 0,
          skills: numOfSkillSets[0],
        },
        selectedSkill: {
          idx: 0,
          skill: numOfSkillSets[0][0],
        },
      };
    }),
  setAttributeAt: (idx: number, value: number) =>
    set((state) => {
      const newAttributes = [...state.petAttributes];
      newAttributes[idx] = { ...newAttributes[idx], value };
      return { petAttributes: newAttributes };
    }),

  /**
   * Updates the selected number of skills and presets the matching skill sets.
   *
   * Example:
   *   If available options are [4, 8] and the user selects 4,
   *   this function will filter and set only the recommended
   *   skill sets that contain exactly 4 skills.
   *
   * @param numOfSkills - The number of skills chosen by the user.
   */
  setSelectedNumOfSkills: (numOfSkills: number) =>
    set((state) => {
      // if (!state.pet) return { selectedNumOfSkills: 4, numOfSkillSets: [] };
      const numOfSkillSets = state.pet?.recommended_skills.filter(
        (skillList) => skillList.length === numOfSkills
      );
      // console.log(`number of skill sets: ${numOfSkillSets}`);
      return {
        selectedNumOfSkills: numOfSkills,
        numOfSkillSets: numOfSkillSets,
      };
    }),

  /**
   * Updates the selected skill set
   *
   * @param skillSetOption - The skill set chosen by the user
   */
  setSelectedSkillSet: (skillSetOption: number) =>
    set((state) => {
      if (skillSetOption > state.numOfSkillSets.length) return {};

      const skillSet: SkillEntity[] = state.numOfSkillSets[skillSetOption];
      return {
        selectedSkillSet: {
          idx: skillSetOption,
          skills: skillSet,
        },
      };
    }),
  setSelectedSkill: (skillOption: number) =>
    set((state) => {
      if (skillOption > state.selectedSkillSet.skills.length) return {};

      const skill: SkillEntity = state.selectedSkillSet.skills[skillOption];
      return {
        selectedSkill: {
          idx: skillOption,
          skill: skill,
        },
      };
    }),
  reset: () =>
    set({
      pet: null,
      petAttributes: [],
      numOfSkillSets: [],
      selectedNumOfSkills: 4,
      selectedSkillSet: { idx: 0, skills: [] },
    }),
}));

export default usePetStore;
