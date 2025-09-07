import type RoleEntity from "./RoleEntity";
import type SkillEntity from "./SkillEntity";

export default interface ArtifactEntity {
  name: string;
  rarity: number;
  roles: [RoleEntity];
  skills: [SkillEntity];
  previews: [string];
  cooldown: string | null;
  image: string;
  is_exemplar: boolean;
}

export default interface ArtifactBriefEntity {
  id: string;
  name: string;
  rarity: number;
  roles: [RoleEntity];
  is_exemplar: boolean;
  image: string;
}
