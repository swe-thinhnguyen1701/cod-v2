export default interface SkillEntity {
  name: string;
  description: string[];
  image: string;
  previews: string[];
  rage_cost: number | null;
  additional_effect: string | null;
  exemplar_effect: string | null;
  cooldown: string | null;
  scaling_values: number[][] | null;
  attribute: string | null;
  is_rage: boolean | null;
  is_talent: boolean | null;
}
