import { parseTsv } from "@/utils/tsv";

export async function fetchShisetsukijunData(
  shisetsuKijunFileName: string,
): Promise<[string, string][]> {
  const res = await fetch(`/master-data/${shisetsuKijunFileName}`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const text = await res.text();
  return parseTsv(text) as [string, string][];
}
