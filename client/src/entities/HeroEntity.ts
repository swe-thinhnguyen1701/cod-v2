import type RoleEntity from "./RoleEntity";

export default interface HeroEntity {
    id: string,
    name: string,
    description: string,
    skills: [string],
    rarity: number,
    title: string,
    roles: [RoleEntity]
}

export default interface HeroBriefEntity {
    id: string,
    name: string,
    roles: [RoleEntity],
    rarity: number
}