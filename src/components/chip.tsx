import { twMerge } from "tailwind-merge";

type ChipProps = {
	children?: string;
	className?: string;
};

export function Chip({
	children,
	className,
}: ChipProps) {
	return (
		<div className={twMerge(
			"rounded-md bg-gray-100 text-gray-700 text-sm inline-block overflow-hidden py-0.5 px-2",
			className
		)}>
			{children}
		</div>
	);
}
