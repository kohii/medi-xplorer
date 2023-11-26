import { twMerge } from "tailwind-merge";

type SubHeadingProps = {
	children: React.ReactNode;
	className?: string;
};

export function SubHeading({ children, className }: SubHeadingProps) {
	return (
		<h5 className={twMerge("text-base font-medium text-slate-600 tracking-wider mt-2 mb-1", className)}>
			{children}
		</h5>
	);
}
