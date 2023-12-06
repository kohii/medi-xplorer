import { readdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MASTER_FILES_DIR = `${__dirname}/../public/master-data/s/`;
const OUTPUT_FILENAME = `${__dirname}/../src/features/shinryoukoui-master-versions/shinryoukoui-master-versions.json`;

const versionKeys = readdirSync(MASTER_FILES_DIR)
	.filter(f => f.endsWith(".csv"))
	.map(file => file.match(/^s_ALL(\d{8})\.csv$/)![1])
	.sort((a, b) => b.localeCompare(a));

const versions = versionKeys.map(key => ({
	key,
	label: `${+key.slice(0, 4)}年${+key.slice(4, 6)}月${+key.slice(6, 8)}日`
}));

writeFileSync(OUTPUT_FILENAME, JSON.stringify(versions, null, 2));
