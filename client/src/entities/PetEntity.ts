import type RoleEntity from "./RoleEntity";
import type SkillEntity from "./SkillEntity";

export interface PetAttribute {
    name: string,
    value: number
}
export interface PetEntity {
    id: string,
    name: string,
    attributes: PetAttribute[],
    description: string,
    roles: RoleEntity[],
    recommended_skills: SkillEntity[][],
    is_flying: boolean
    image: string
}

export interface PetBriefEntity {
    id: string,
    name: string,
    attributes: PetAttribute[],
    roles: RoleEntity[],
    image: string
    rarity: number
}