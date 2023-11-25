import { twMerge } from "tailwind-merge";

export type VSplitItemProps = {
	children: React.ReactNode;
	className?: string;
	overflow?: "auto" | "hidden";
	pos: number;
};

export function VSplitItem({ children, className, overflow, pos }: VSplitItemProps) {
	return (
		<div className={className} style={{
			gridRow: pos,
			overflowY: overflow,
		}}>
			{children}
		</div>
	);
}


export type VSplitProps = {
	children: React.ReactNode;
	className?: string;
	gridTemplateRows: string;
};

export function VSplit({ children, className, gridTemplateRows }: VSplitProps) {
	return (
		<div className={twMerge("grid h-full overflow-hidden", className)} style={{
			gridTemplateRows,
		}}>
			{children}
		</div>
	);
}