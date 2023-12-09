import { Loading } from "./loading";

export function Backdrop() {
	return (
		<div className="fixed inset-0 bg-black opacity-40 z-50 flex items-center justify-center">
			<Loading />
		</div>
	);
}