import { on } from "events";
import { IconButton } from "./icon-button";
import { CloseIcon } from "./icons/close-icon";
import { VSplit, VSplitItem } from "./v-split";

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
		<VSplit
			className=" fixed z-50 right-0 top-0 bg-white h-screen max-w-full w-[1000px] shadow-2xl"
			gridTemplateRows="min-content minmax(0, 1fr)"
		>
			<VSplitItem pos={1}>
				<div className="flex items-center p-2 pb-1">
					<IconButton onClick={onClose} icon={<CloseIcon className="h-6 w-6" />} label="Close" />
					<h3 className="text-l text-gray-900 ml-2">
						{title}
					</h3>
				</div>
			</VSplitItem>
			<VSplitItem pos={2}>
				{children}
			</VSplitItem>
		</VSplit>
	);
}