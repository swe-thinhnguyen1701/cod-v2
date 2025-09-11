const { Artifact, Skill, Role } = require("../models");
const db = require("../config/db-connection");
const artifacts = require("../database/artifacts.json");
const expandStats = require("../utils/expandStats.ts");

const ARTIFACT_IMAGE_URL = "https://d3bhl6gkk81cq1.cloudfront.net/artifacts/"

const seedArtifacts = async () => {
    db.once("open", async () => {
        try {
            await Artifact.deleteMany({});
            for (let artifact of artifacts) {
                const artifactSkill = await Skill.findOne({ owner: artifact.name });
                artifact.skills = artifactSkill?._id;

                artifact.roles = await Promise.all(
                    artifact.roles.map(async (roleName) => {
                        const role = await Role.findOne({ name: roleName });
                        if (!role)
                            throw new Error(`Role not found for artifact: ${artifact.name}`);

                        return role._id;
                    })
                )

                // Expands stats dynamically
                artifact.stats = expandStats(artifact.stats, artifact.rarity);
                artifact.image = `${ARTIFACT_IMAGE_URL}${artifact.name}.webp`;

                // debug log
                // if (artifact.name === "Spiritbone Torc") {
                //     console.log(`add skill: ${artifactSkill}`);
                //     console.log(artifact);
                // }
                await Artifact.create(artifact);
            }
        } catch (error) {
            console.error("Error seeding artifacts ❌:", error);
            process.exit(1);
        }
        console.log("ARTIFACTS seeded SUCCESSFULLY ☘️");
        process.exit(0);
    });
}

seedArtifacts();