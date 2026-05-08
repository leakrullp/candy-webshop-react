import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Product } from "../types/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "src/data/data.json");

interface Data {
  products: Product[];
}

let cache: Data | null = null; //avoids redundant server calls

export const getData = () => {
  if (!cache) {
    cache = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  }
  return cache;
};

// export const saveData = (data: JSON) => {
//   fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
//   cache = data;
// };
