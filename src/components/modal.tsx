type ModalProps = {
	title: string;
	children: React.ReactNode;
	footer: React.ReactNode;
	onClose: () => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export function Modal({
	title,
	children,
	footer,
	onClose,
	onKeyDown,
}: ModalProps) {
	return <div
		tabIndex={-1}
		aria-hidden="true"
		className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
		onKeyDown={onKeyDown}
	>
		<div className="absolute inset-0 bg-gray-950 opacity-40" onClick={onClose} />
		<div className="relative p-4 w-full max-w-[1080px] max-h-full mx-auto">
			<div className="relative bg-white rounded-lg shadow">
				<div className="flex items-center justify-between p-4 border-b rounded-t">
					<h3 className="text-xl font-medium text-gray-900">
						{title}
					</h3>
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
						data-modal-hide="default-modal"
						onClick={onClose}
					>
						<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
						<span className="sr-only">Close modal</span>
					</button>
				</div>
				<div className="p-4 space-y-4">
					{children}
				</div>
				<div className="flex items-center p-4 border-t border-gray-200 rounded-b">
					{footer}
				</div>
			</div>
		</div>
	</div>
}
