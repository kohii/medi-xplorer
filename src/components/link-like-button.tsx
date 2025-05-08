import { twMerge } from "tailwind-merge";

export type LinkLikeButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function LinkLikeButton({ children, className, onClick }: LinkLikeButtonProps) {
  return (
    <button
      className={twMerge(
        "text-blue-700 hover:text-blue-800 focus:text-blue-800 focus:outline-hidden text-sm",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
