import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads a JSON file from the database folder and parses its content.
 *
 * @param {string} fileName - The name of the JSON file inside the database folder.
 * @returns {any} The parsed JSON object.
 * @throws {Error} Throws an error if the file cannot be read or if the JSON is invalid.
 *
 * @example
 * import readJSON from "./readJSON.js";
 * const data = readJSON("skill-hero.json");
 * console.log(data);
 */
const readJSON = (fileName) => {
    const DATABASE_PATH = "../database/";
    const FILE_PATH = path.join(DATABASE_PATH, fileName);

    return JSON.parse(fs.readFileSync(path.join(__dirname, FILE_PATH), "utf-8"));
}

export default readJSON;