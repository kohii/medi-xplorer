import { CodeValueVariant } from "./types";

type CodeValueOptionsProps = {
  className?: string;
  value?: {
    variant?: CodeValueVariant;
  };
  onChange: (value: { variant: CodeValueVariant }) => void;
};

export function CodeValueOptions({
  className,
  value,
  onChange,
}: CodeValueOptionsProps) {
  const variant = value?.variant ?? "code-label";
  return (
    <div className={className}>
      表示内容:
      <select
        value={variant}
        onChange={(event) => onChange({ variant: event.target.value as CodeValueVariant })}
        className="border border-gray-300 rounded-md px-2 py-1 ml-1"
      >
        <option value="code-label">コードとラベル (デフォルト)</option>
        <option value="code">コードのみ</option>
        <option value="label">ラベルのみ</option>
      </select>
    </div>
  );
}
