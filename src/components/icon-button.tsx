type IconButtonProps = {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
	className?: string;
};

export function IconButton({
	icon,
	label,
	onClick,
	className,
}: IconButtonProps) {
	return (
		<button
			className={`p-1 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none ${className ?? ""}`}
			onClick={onClick}
		>
			<span className="sr-only">{label}</span>
			{icon}
		</button>
	);
}