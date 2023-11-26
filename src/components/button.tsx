import { twMerge } from "tailwind-merge";

type ButtonProps = {
	type?: "button" | "submit";
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
};

export function Button({
	type = "button",
	children,
	onClick,
	className,
	disabled,
}: ButtonProps) {
	return (
		<button
			type={type}
			data-modal-hide="default-modal"
			className={
				twMerge(
					"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
					disabled && "opacity-50 cursor-not-allowed",
					className,
				)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}