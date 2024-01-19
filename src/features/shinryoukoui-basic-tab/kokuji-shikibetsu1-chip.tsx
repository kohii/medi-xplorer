import { ColorChip } from "@/components/color-chip";
import { getField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { formatCodeValue } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-utils";
import { getNthColorChipColor } from "@/utils/color-chip-color";

import { getValue } from "../fields/get-values";

const FIELD = getField("告示等識別区分（１）");

type KokujiShikibetsu1ChipProps = {
  row: string[];
};

export function KokujiShikibetsu1Chip({ row }: KokujiShikibetsu1ChipProps) {
  const value = getValue(row, FIELD);
  return (
    <ColorChip color={getNthColorChipColor(+value)} >
      {formatCodeValue(row, FIELD)}
    </ColorChip>
  );
}