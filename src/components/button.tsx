type ButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
};

export function Button({
	children,
	onClick,
}: ButtonProps) {
	return <button
		data-modal-hide="default-modal"
		type="button"
		className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		onClick={onClick}
	>
		{children}
	</button>;
}