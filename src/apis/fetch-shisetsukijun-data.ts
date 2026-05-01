import { tsvVersionMap } from "@/generated/tsv-version-map";
import { parseTsv } from "@/utils/tsv";

export async function fetchShisetsukijunData(
  shisetsuKijunFileName: string,
): Promise<[string, string][]> {
  const hash = tsvVersionMap[shisetsuKijunFileName];
  const res = await fetch(`/master-data/${shisetsuKijunFileName}${hash ? `?v=${hash}` : ""}`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const text = await res.text();
  return parseTsv(text) as [string, string][];
}
