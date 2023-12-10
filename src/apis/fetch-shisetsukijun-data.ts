import { parseCsv } from "@/utils/csvs";

export async function fetchShisetsukijunData(): Promise<[string, string][]> {
  const res = await fetch("/master-data/shisetsukijun_20231020.csv", {
    cache: "force-cache"
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const text = await res.text();
  return parseCsv(text) as [string, string][];
}
