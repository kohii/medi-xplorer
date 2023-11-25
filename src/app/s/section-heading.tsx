import { type } from "os";
import { twMerge } from "tailwind-merge";

type SectionHeadingProps = {
	children: React.ReactNode;
	className?: string;
};

export function SectionHeading({ children, className }: SectionHeadingProps) {
	return (
		<h4 className={twMerge("text-md font-medium text-gray-500 tracking-wider mt-3 mb-1", className)}>
			{children}
		</h4>
	);
}