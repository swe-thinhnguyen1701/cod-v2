import type RoleEntity from "./RoleEntity";
// import type SkillEntity from "./SkillEntity";

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

export default interface PetBriefEntity {
    id: string,
    name: string,
    attirbutes: number[],
    roles: RoleEntity[],
    image: string
}