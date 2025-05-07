import { twMerge } from "tailwind-merge";

type ButtonProps = {
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export function Button({
  type = "button",
  children,
  onClick,
  className,
  disabled,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      data-modal-hide="default-modal"
      className={
        twMerge(
          "focus:ring-[1px] focus:outline-hidden font-medium rounded-sm text-sm px-4 py-2 text-center",
          variant === "primary" && "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
          variant === "secondary" && "border border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-300",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}