import { twMerge } from 'tailwind-merge'
import { IconProps } from "./icon-props";

export function ChevronRightIcon({ className }: IconProps) {
	return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={twMerge("h-5 w-5 text-gray-500", className)}>
		<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
	</svg>
}
