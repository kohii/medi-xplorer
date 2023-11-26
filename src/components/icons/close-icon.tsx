import { twMerge } from "tailwind-merge";

import { IconProps } from "./icon-props";

export function CloseIcon({ className }: IconProps) {
	return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={twMerge("h-5 w-5", className)}>
		<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
	</svg>;
}