import type RoleEntity from "./RoleEntity";
import type SkillEntity from "./SkillEntity";

interface ArtifactStat {
  name: string;
  values: number[];
  image: string;
}

export interface ArtifactEntity {
  name: string;
  rarity: number;
  roles: RoleEntity[];
  skills: SkillEntity[];
  stats: ArtifactStat[];
  previews: string[];
  cooldown: string | null;
  image: string;
  is_exemplar: boolean;
}

export interface ArtifactBriefEntity {
  id: string;
  name: string;
  rarity: number;
  roles: RoleEntity[];
  is_exemplar: boolean;
  image: string;
}
