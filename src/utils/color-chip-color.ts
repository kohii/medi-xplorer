const COLOR_CHIP_COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
  "stone",
  "cyan",
  "lime",
  "violet",
  "slate",
  "amber",
] as const;

export type ColorChipColor = typeof COLOR_CHIP_COLORS[number];

export function getNthColorChipColor(n: number) {
  return COLOR_CHIP_COLORS[n % COLOR_CHIP_COLORS.length];
}
