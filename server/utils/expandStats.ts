const legendaryStats = require("../database/artifact-stats/legendary.json");
const epicStats = require("../database/artifact-stats/epic.json");
const eliteStats = require("../database/artifact-stats/elite.json");
const advancedStats = require("../database/artifact-stats/advanced.json");

interface Stat {
  template: string;
  unit?: string;
}

interface Template {
  format: string;
  values: number[];
  image: string;
}

const getStats = (rarity: Number) => {
  switch (rarity) {
    case 1:
      return legendaryStats;
    case 2:
      return epicStats;
    case 3:
      return eliteStats;
    case 4:
      return advancedStats;
    default:
      return [];
  }
};

const expandStats = (stats: [Stat], rarity: Number) => {
  const statTemplate = getStats(rarity);

  return stats.map((stat) => {
    const template: Template = statTemplate[stat.template];
    if (!template) throw new Error(`Unknown template: ${stat.template}`);

    return {
      name: template.format.replace("{unit}", stat.unit || ""),
      values: template.values,
      image: template.image
    };
  });
};

export default expandStats;