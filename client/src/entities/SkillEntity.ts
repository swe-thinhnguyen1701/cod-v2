export default interface SkillEntity {
    name: string,
    description: [string],
    image: string,
    previews: [string],
    rage_cost: number | null
    additonal_effect: string | null
    exemplar_effect: string | null
    cooldown: string | null
}