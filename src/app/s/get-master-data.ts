import { Parser } from "csv-string/dist/Parser";

async function _getMasterData(): Promise<string[][]> {
	const res = await fetch("/master-data/s/s_ALL20231101.csv", {
		cache: "force-cache"
	});
	if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

	const arrayBuffer = await res.arrayBuffer();
	const text = new TextDecoder("shift_jis").decode(arrayBuffer);

	const csv = new Parser(text);
	return csv.File();
}

// TODO: Context / Provider に移動する
let promise: Promise<string[][]> | null = null;

export async function getMasterData(): Promise<string[][]> {
	if (!promise) {
		promise = _getMasterData();
	}
	return promise;
}
