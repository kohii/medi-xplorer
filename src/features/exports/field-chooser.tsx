import { Checkbox } from "@/components/checkbox";
import { FormLabel } from "@/components/form-label";
import { LinkLikeButton } from "@/components/link-like-button";
import { VSplit, VSplitItem } from "@/components/v-split";
import { DisplayFieldConfig } from "@/features/display-fields/types";
import { getFieldBySeq } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { assertUnreachable } from "@/utils/assert-unreachable";

import { getShinryoukouiMasterVirtualField } from "../shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

type FieldChooserProps = {
  fields: DisplayFieldConfig[];
  selectedFieldIndices: Set<number>;
  onChange: (selectedFieldIndices: Set<number>) => void;
}

export function FieldChooser({
  fields,
  selectedFieldIndices,
  onChange,
}: FieldChooserProps) {
  return (
    <VSplit
      gridTemplateRows="min-content 1fr"
      className="h-full"
    >
      <VSplitItem pos={1} className="flex justify-between items-center pb-0.5">
        <FormLabel>エクスポートする列</FormLabel>
        <div className="flex gap-3">
          <LinkLikeButton onClick={() => onChange(new Set(fields.map((_, i) => i)))}>すべて選択</LinkLikeButton>
          <LinkLikeButton onClick={() => onChange(new Set())}>すべてクリア</LinkLikeButton>
        </div>
      </VSplitItem>
      <VSplitItem pos={2}>
        <div className="overflow-y-auto border h-full">
          {fields.map((field, i) => (
            <div key={i} className="py-1 px-2">
              <Checkbox
                value={selectedFieldIndices.has(i)}
                onChange={checked => {
                  const newSelectedFieldIndices = new Set(selectedFieldIndices);
                  if (checked) {
                    newSelectedFieldIndices.add(i);
                  } else {
                    newSelectedFieldIndices.delete(i);
                  }
                  onChange(newSelectedFieldIndices);
                }}
                label={(
                  <div>{(() => {
                    switch (field.kind) {
                      case "normal":
                        return getFieldBySeq(field.seq)?.name;
                      case "virtual":
                        return getShinryoukouiMasterVirtualField(field.key)?.name;
                      case "unknown":
                        return (
                          <div>
                          (unknown)
                          </div>
                        );
                      default:
                        assertUnreachable(field);
                    }
                  })()}</div>
                )}
              />
            </div>
          ))}
        </div>
      </VSplitItem>
    </VSplit>
  );
}
