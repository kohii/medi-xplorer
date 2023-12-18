import { twMerge } from "tailwind-merge";

type LabeledChipProps = {
  label: string;
  children?: string;
  className?: string;
};

export function LabeledChip({
  label,
  children,
  className,
}: LabeledChipProps) {
  return (
    <div className={twMerge(
      "rounded-md bg-gray-100 text-gray-700 text-sm inline-block border border-gray-300 overflow-hidden flex items-center",
      className
    )}>
      <div className="py-0.5 px-2">{label}</div>
      <div className="bg-white py-0.5 px-2 h-full">{children || "-"}</div>
    </div>
  );
}
