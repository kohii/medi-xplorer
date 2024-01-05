import { ColorChipColor } from "@/components/color-chip";

export type VirtualField = {
  name: string;
  value(row: string[]): string;
  colorize?(value: string): ColorChipColor | undefined;
  columnWidth?: number;
};
