import { parseTsv } from "@/utils/tsv";

export async function fetchShisetsukijunData(): Promise<[string, string][]> {
  const res = await fetch("/master-data/shisetsukijun_20231020.tsv", {
    cache: "force-cache"
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const text = await res.text();
  return parseTsv(text) as [string, string][];
}
