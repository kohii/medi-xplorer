import { ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { IconButton } from "@/components/icon-button";
import { DeleteIcon } from "@/components/icons/delete-icon";
import { DragHandleIcon } from "@/components/icons/drag-handle-icon";
import { SparklesIcon } from "@/components/icons/sparkles-icon";

import { getFieldBySeq } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";
import { getShinryoukouiMasterVirtualField } from "../shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

import { CodeValueOptions } from "./code-value-options";
import { DisplayFieldConfig } from "./types";

function DeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton className="p-2" icon={<DeleteIcon />} label="列を削除" onClick={onClick} />
  );
}

function Container({
  label,
  options,
  className,
  onDelete,
  ...props
}: {
  label: ReactNode;
  options?: ReactNode;
  className?: string
  onDelete?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div className={twMerge("flex gap-2 items-center text-sm font-medium py-1 bg-white", className)}>
      <div className="cursor-grab"  {...props}>
        <DragHandleIcon className="text-gray-400" />
      </div>
      <div className="font-semibold flex-auto">{label}</div>
      {options}
      <div>
        <DeleteButton onClick={onDelete} />
      </div>
    </div>
  );
}

export type DisplayFieldItemProps = {
  value: DisplayFieldConfig;
  onChange?: (value: DisplayFieldConfig) => void;
  onDelete?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export const DisplayFieldItem = forwardRef<HTMLDivElement, DisplayFieldItemProps>(function DisplayFieldItem({
  value,
  onChange,
  onDelete,
  className,
  style,
  ...props
}, ref) {
  switch (value.kind) {
    case "normal": {
      const field = getFieldBySeq(value.seq)!;
      return (
        <div style={style} ref={ref}>
          <Container
            {...props}
            label={`${field.seq}: ${field.name}`}
            options={field.codes && (<CodeValueOptions
              value={value.options}
              onChange={(option) => onChange?.({ ...value, options: option })}
            />)}
            onDelete={onDelete}
            className={className} />
        </div>
      );
    }
    case "virtual": {
      const field = getShinryoukouiMasterVirtualField(value.key);
      return (
        <div style={style} ref={ref}>
          <Container
            {...props}
            label={(
              <div className="flex items-center gap-1">
                <div title="MediXplorerが独自に定義した、複数の列を組み合わせた項目です。">
                  <SparklesIcon className="text-purple-500" />
                </div>
                {field.name}
              </div>
            )}
            onDelete={onDelete}
            className={className}
          />
        </div>
      );
    }
    case "unknown": {
      return (
        <div style={style} ref={ref}>
          <Container {...props} label="(不明)" onDelete={onDelete} className={className} />
        </div>
      );
    }
  }
});
