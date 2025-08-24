export default interface SkillEntity {
    name: string,
    description: string,
    image: string,
    previews: [string],
    rage_cost: number | null
}