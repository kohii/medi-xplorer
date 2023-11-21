import { on } from "events";

type DrawerProps = {
	children: React.ReactNode;
	onClose: () => void;
};

export function Drawer({ children, onClose }: DrawerProps) {
	return (
		<div
			className=" grid fixed overflow-hidden z-50 right-0 top-0 bg-white h-screen max-w-full w-[880px] shadow-xl"
			style={{
				gridTemplateRows: "56px minmax(0, 1fr)",
			}}
		>
			<div style={{ gridRow: 1 }} className="flex items-center pl-2">
				<button
					className="top-0 left-0 p-2"
					onClick={onClose}
				>
					<svg
						className="w-6 h-6 text-gray-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div style={{ gridRow: 2 }} className="overflow-x-auto">
				{children}
			</div>
		</div>
	);
}