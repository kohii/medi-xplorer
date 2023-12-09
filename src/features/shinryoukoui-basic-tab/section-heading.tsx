import React from "react";
import { twMerge } from "tailwind-merge";

type SectionHeadingProps = {
	children: React.ReactNode;
	className?: string;
};

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h4 className={twMerge("text-lg font-medium text-slate-600 tracking-wider mt-5 mb-1.5", className)}>
      {children}
    </h4>
  );
}
