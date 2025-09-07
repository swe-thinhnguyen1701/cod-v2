import type FactionEntity from "./FactionEntity";
import type RoleEntity from "./RoleEntity";
import type SkillEntity from "./SkillEntity";

export default interface HeroEntity {
    id: string,
    name: string,
    description: string,
    skills: [SkillEntity],
    rarity: number,
    title: string,
    roles: [RoleEntity],
    faction: FactionEntity,
    artifacts: [string],
    pets: [string],
    partners: [string]
    is_flying: boolean
    image: string
}

export default interface HeroBriefEntity {
    id: string,
    name: string,
    roles: [RoleEntity],
    rarity: number
    image: string
}