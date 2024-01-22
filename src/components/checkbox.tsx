import { useId } from "react";
import { twMerge } from "tailwind-merge";

export type CheckboxProps = {
  value: boolean;
  label?: React.ReactNode;
  onChange: (value: boolean) => void;
  className?: string;
};

export function Checkbox({ value, label, onChange, className }: CheckboxProps) {
  const id = useId();
  return (
    <div className={twMerge("block flex items-center gap-1.5 py-1", className)} >
      <input
        className="inline-block"
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        id={id}
      />
      {!!label && (<label
        className="inline-block pl-[0.15rem] hover:cursor-pointer text-sm"
        htmlFor={id}
      >
        {label}
      </label>)}
    </ div >

  );
}