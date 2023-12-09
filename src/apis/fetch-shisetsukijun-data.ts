import { Parser } from "csv-string/dist/Parser";

export async function fetchShisetsukijunData(): Promise<[string, string][]> {
  const res = await fetch("/master-data/shisetsukijun_20231020.csv", {
    cache: "force-cache"
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const text = await res.text();
  const csv = new Parser(text);
  return csv.File() as [string, string][];
}
