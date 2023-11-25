import { ChevronRightIcon } from "./icons/chevron-right-icon";
import { twMerge } from "tailwind-merge";

type ToggleProps = {
	label: string;
	children: React.ReactNode;
	className?: string;
	open?: boolean;
	onToggle?: (open: boolean) => void;
};

export function Toggle({ label, children, className, open, onToggle }: ToggleProps) {
	return (
		<div className={className}>
			<button className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm" onClick={() => onToggle(!open)}>
				<ChevronRightIcon className={twMerge("h-3 w-3", open ? "transform rotate-90" : "")} />
				{label}
			</button>
			{open && children}
		</div>
	);
}
