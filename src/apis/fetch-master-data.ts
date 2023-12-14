import { parseTsv } from "@/utils/csvs";

export async function fetchMasterData(version: string): Promise<string[][]> {
  const res = await fetch(`/master-data/s/s_ALL${version}.tsv`, {
    cache: "force-cache"
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const result = parseTsv(await res.text());
  return result;
}
