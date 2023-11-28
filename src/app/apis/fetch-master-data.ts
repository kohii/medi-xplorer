import { Parser } from "csv-string/dist/Parser";

export async function fetchMasterData(): Promise<string[][]> {
	const res = await fetch("/master-data/s/s_ALL20231101.csv", {
		cache: "force-cache"
	});
	if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

	const arrayBuffer = await res.arrayBuffer();
	const text = new TextDecoder("shift_jis").decode(arrayBuffer);

	const csv = new Parser(text);
	return csv.File();
}
