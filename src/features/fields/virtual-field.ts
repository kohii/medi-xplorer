import { ColorChipColor } from "@/utils/color-chip-color";

export type VirtualField = {
  name: string;
  value(row: string[]): string;
  colorize?(value: string): ColorChipColor | undefined;
  columnWidth?: number;
};
