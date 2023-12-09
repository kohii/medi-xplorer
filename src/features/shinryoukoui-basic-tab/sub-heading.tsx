import { twMerge } from "tailwind-merge";

type SubHeadingProps = {
	children: React.ReactNode;
	className?: string;
};

export function SubHeading({ children, className }: SubHeadingProps) {
  return (
    <h5 className={twMerge("text-base font-medium text-slate-600 tracking-wider mt-3 mb-0.5", className)}>
      {children}
    </h5>
  );
}
