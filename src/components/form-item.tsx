type FormItemProps = {
	children: React.ReactNode;
};

export function FormItem({
	children,
}: FormItemProps) {
	return (
		<div className="mb-2">
			{children}
		</div>
	);
}