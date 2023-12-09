import React from "react";
import { twMerge } from "tailwind-merge";

type HStackProps = {
	children: React.ReactNode;
	className?: string;
};

export function HStack({ children, className }: HStackProps) {
  return <div className={twMerge("flex flex-wrap gap-1", className)}>{children}</div>;
}
