import { twMerge } from "tailwind-merge";

type SplitChipProps = {
	label?: string;
	children?: string;
	className?: string;
};

export function SplitChip({
  label,
  children,
  className,
}: SplitChipProps) {
  return (
    <div className={twMerge(
      "rounded-md bg-gray-100 text-gray-700 text-sm inline-block border border-gray-300 overflow-hidden",
      className
    )}>
      <div className="flex items-center">
        {label && <div className="py-0.5 px-2">{label}</div>}
        <div className="bg-white py-0.5 px-2 h-full">{children || "-"}</div>
      </div>
    </div>
  );
}
