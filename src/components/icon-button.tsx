import { twMerge } from "tailwind-merge";

type IconButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
};

export function IconButton({
  icon,
  label,
  onClick,
  className,
}: IconButtonProps) {
  return (
    <button
      className={twMerge("p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none", className)}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      {icon}
    </button>
  );
}