import { twMerge } from "tailwind-merge";

import { IconProps } from "./icon-props";

export function CaretDownIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={twMerge("h-5 w-5", className)}>
      <path fill="currentColor" d="M10 13l6-6H4z" />
    </svg>
  );
}
