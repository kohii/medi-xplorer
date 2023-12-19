import React from "react";
import { twMerge } from "tailwind-merge";

type TextInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  name?: string;
  id?: string;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput({
  onChange,
  className,
  ...props
}, ref) {
  return (
    <input
      className={twMerge(
        "bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2",
        className
      )}
      type="text"
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      ref={ref}
      {...props}
    />
  );
});
