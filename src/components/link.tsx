import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

type LinkProps = {
	children: React.ReactNode;
	className?: string;
	href: string;
	target?: string;
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function Link({ children, className, ...rest }: LinkProps) {
	return (
		<NextLink
			className={twMerge("text-blue-500 hover:text-blue-700 text-small", className)}
			{...rest}
		>
			{children}
		</NextLink>
	);
}
