const legendaryStats = require("../database/artifact-stats/legendary.json");
const epicStats = require("../database/artifact-stats/epic.json");
const eliteStats = require("../database/artifact-stats/elite.json");
const advancedStats = require("../database/artifact-stats/advanced.json");
const ultimateStats = require("../database/artifact-stats/ultimate.json");

interface Stat {
  template: string;
  unit?: string;
}

interface Template {
  format: string;
  values: number[];
  image: string;
}

interface StatResponse {
  name: string;
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
  let statTemplate = getStats(rarity);
  const res: StatResponse[] = [];
  for (let i = 0; i < 2; i++) {
    const template: Template = statTemplate[stats[i].template];
    if (!template) throw new Error(`Unknown template: ${stats[i].template}`);

    const stat = {
      name: template.format.replace("{unit}", stats[i].unit || ""),
      values: template.values,
      image: template.image,
    };
    res.push(stat);
  }

  statTemplate = ultimateStats;
  for (let i = 2; i < stats.length; i++) {
    const template: Template = statTemplate[stats[i].template];
    if (!template) throw new Error(`Unknown template: ${stats[i].template}`);

    const stat = {
      name: template.format.replace("{unit}", stats[i].unit || ""),
      values: template.values,
      image: template.image,
    };
    res.push(stat);
  }

  return res;
};

module.exports = expandStats;