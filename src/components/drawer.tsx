import { on } from "events";
import { IconButton } from "./icon-button";
import { CloseIcon } from "./icons/close-icon";

type DrawerProps = {
	children: React.ReactNode;
	onClose: () => void;
	title: string;
};

export function Drawer({
	children,
	onClose,
	title
}: DrawerProps) {
	return (
		<div
			className=" grid fixed overflow-hidden z-50 right-0 top-0 bg-white h-screen max-w-full w-[1000px] shadow-2xl"
			style={{
				gridTemplateRows: "64px minmax(0, 1fr)",
			}}
		>
			<div style={{ gridRow: 1 }} className="flex items-center pl-2">
				<IconButton onClick={onClose} icon={<CloseIcon className="h-6 w-6" />} label="Close" />
				<h3 className="text-l text-gray-900 ml-2">
					{title}
				</h3>
			</div>
			<div style={{ gridRow: 2 }} className="overflow-x-auto">
				{children}
			</div>
		</div>
	);
}