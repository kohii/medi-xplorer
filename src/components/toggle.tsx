import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { ChevronRightIcon } from "./icons/chevron-right-icon";

type ToggleProps = {
	label: string;
	className?: string;
	open?: boolean;
	onToggle?: (open: boolean) => void;
};

export function Toggle({ label, className, open, onToggle }: ToggleProps) {
  return (
    <div className={className}>
      <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm" onClick={() => onToggle?.(!open)}>
        <ChevronRightIcon className={twMerge("h-3 w-3", open ? "transform rotate-90" : "")} />
        {label}
      </button>
    </div>
  );
}

type UncontrolledToggleProps = Omit<ToggleProps, "open" | "onToggle"> & {
	children: (open: boolean) => React.ReactNode;
};

export function UncontrolledToggle({ label, className, children }: UncontrolledToggleProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Toggle label={label} className={className} open={open} onToggle={setOpen} />
      {open && <div className="ml-4 my-2">{children(open)}</div>}
    </>
  );
}