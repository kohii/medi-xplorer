import { twMerge } from "tailwind-merge";

import { ColorChipColor } from "@/utils/color-chip-color";

export type ColorChipProps = {
  children?: string;
  className?: string;
  color?: ColorChipColor;
};

export function ColorChip({ children, className, color }: ColorChipProps) {
  return (
    <div className={twMerge(
      "px-1.5 py-0 rounded-md bg-gray-100 text-sm inline-block",
      className,
      color ? `bg-${color}-100 text-${color}-700` : "",
    )}>
      {children}
    </div>
  );
}
