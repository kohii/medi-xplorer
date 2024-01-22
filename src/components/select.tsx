import { twMerge } from "tailwind-merge";

export type Option<T> = {
  value: T;
  label: string;
};

export type SelectProps<T extends string> = {
  className?: string;
  value?: T;
  options: Option<T>[];
  onChange?: (value: T) => void;
};

export function Select<T extends string>({ className, value, options, onChange }: SelectProps<T>) {
  return (
    <select
      className={twMerge("bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2", className)}
      value={value}
      onChange={(event) => onChange?.(event.target.value as T)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

