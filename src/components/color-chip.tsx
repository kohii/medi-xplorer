import { twMerge } from "tailwind-merge";

const COLOR_CHIP_COLORS = [
	"red",
	"orange",
	"yellow",
	"green",
	"blue",
	"indigo",
	"purple",
	"pink",
] as const;

export function getNthColorChipColor(n: number) {
	return COLOR_CHIP_COLORS[n % COLOR_CHIP_COLORS.length];
}

export type ColorChipProps = {
	children?: string;
	className?: string;
	color?: typeof COLOR_CHIP_COLORS[number];
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
