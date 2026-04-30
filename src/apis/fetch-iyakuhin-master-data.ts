import { tsvVersionMap } from "@/generated/tsv-version-map";
import { parseTsv } from "@/utils/tsv";

export async function fetchIyakuhinMasterData(version: string): Promise<string[][]> {
  const path = `y/y_ALL${version}.tsv`;
  const hash = tsvVersionMap[path];
  const res = await fetch(`/master-data/${path}${hash ? `?v=${hash}` : ""}`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const result = parseTsv(await res.text());
  return result;
}
