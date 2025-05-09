import { twMerge } from "tailwind-merge";

import { IconButton } from "./icon-button";
import { CloseIcon } from "./icons/close-icon";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  onClose: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export function Modal({
  title,
  children,
  footer,
  size = "md",
  onClose,
  onKeyDown,
}: ModalProps) {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
      onKeyDown={onKeyDown}
    >
      <div className="fixed inset-0 bg-gray-950 opacity-40" onClick={onClose} />
      <div className={twMerge(
        "relative p-4 w-full max-h-full mx-auto",
        size === "sm" && "max-w-[640px]",
        size === "md" && "max-w-[768px]",
        size === "lg" && "max-w-[832px]",
        size === "xl" && "max-w-[1080px]",
      )}>
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b rounded-t">
            <h3 className="text-xl font-medium text-gray-900">
              {title}
            </h3>
            <IconButton onClick={onClose} icon={<CloseIcon className="h-6 w-6" />} label="Close" />
          </div>
          <div className="p-4 space-y-4">
            {children}
          </div>
          <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
