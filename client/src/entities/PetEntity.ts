import type RoleEntity from "./RoleEntity";
// import type SkillEntity from "./SkillEntity";

interface PetAttribute {
    name: string,
    value: number
}

// update pet entity later when pet skill data is ready
// temporarily use string to describe pet skill
export default interface PetEntity {
    id: string,
    name: string,
    description: string,
    skills: string[][],
    roles: RoleEntity[],
    is_flying: boolean
    image: string
}

// set rarity = 1 as a default value
export default interface PetBriefEntity {
    id: string,
    name: string,
    attributes: PetAttribute[],
    roles: RoleEntity[],
    image: string
    rarity: number
}