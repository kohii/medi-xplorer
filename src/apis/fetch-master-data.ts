import { parseCsv } from "@/utils/csvs";

export async function fetchMasterData(version: string): Promise<string[][]> {
  const res = await fetch(`/master-data/s/s_ALL${version}.csv`, {
    cache: "force-cache"
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const arrayBuffer = await res.arrayBuffer();
  const text = new TextDecoder("shift_jis").decode(arrayBuffer);
  return parseCsv(text);
}
