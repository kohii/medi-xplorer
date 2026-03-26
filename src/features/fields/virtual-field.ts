import { ReactNode } from "react";

import { ColorChipColor } from "@/utils/color-chip-color";

export type VirtualField = {
  name: string;
  value(row: string[]): string;
  render?(row: string[]): ReactNode;
  colorize?(value: string): ColorChipColor | undefined;
  columnWidth?: number;
};
