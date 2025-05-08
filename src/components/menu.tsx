import { useEffect, useRef } from "react";

type MenuItemProps = {
  children?: React.ReactNode;
  onClick?: () => void;
}

export function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <div
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

type MenuProps = {
  className?: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  anchorOrigin?: "left" | "right";
};

export function Menu({
  anchorEl,
  open,
  onClose,
  children,
  anchorOrigin = "left"
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      menuRef.current?.focus();
    }
  }, [open]);

  if (!open || !anchorEl) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
    if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  const anchorRect = anchorEl.getBoundingClientRect();

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
      onKeyDown={handleKeyDown}
    >
      <div className="fixed inset-0" onClick={onClose} />
      <div
        className="py-1 mt-1 w-48 absolute z-50 rounded-xs shadow-lg bg-white ring-1 ring-black/5 focus:outline-hidden"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        style={{
          top: anchorRect.top + anchorRect.height,
          left: anchorOrigin === "left" ? anchorRect.left : undefined,
          right: anchorOrigin === "right" ? window.innerWidth - anchorRect.right : undefined,
        }}
        tabIndex={-1}
        ref={menuRef}
      >
        {children}
      </div>
    </div >
  );
}