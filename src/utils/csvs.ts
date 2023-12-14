export function parseTsv(text: string): string[][] {
  return text.split("\n").map(line => line.split("\t"));
}
