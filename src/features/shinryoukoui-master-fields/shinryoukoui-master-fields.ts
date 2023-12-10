import { Field } from "@/features/fields/types";

// https://shinryohoshu.mhlw.go.jp/shinryohoshu/file/spec/R04rec.pdf
import _shinryokouiMasterFields from "./shinryoukoui-master-fields.json" assert { type: "json" };

export const shinryokouiMasterFields = _shinryokouiMasterFields;

export type FieldName = typeof shinryokouiMasterFields[number]["name"];

const nameToField = new Map<FieldName, Field>(
  shinryokouiMasterFields.map(field => [field.name, field])
);

const seqToField: Field[] = [];
for (const field of shinryokouiMasterFields) {
  seqToField[field.seq] = field;
}

export function getField(name: FieldName): Field {
  return nameToField.get(name)!;
}

export function getFieldOrUndefined(name: string): Field | undefined {
  return nameToField.get(name as FieldName);
}

export function getFieldBySeq(seq: number): Field | undefined {
  return seqToField[seq];
}

export function getFields(names: FieldName[]): Field[] {
  return names.map(name => {
    const f = getField(name);
    if (!f) throw new Error(`Field ${name} not found`);
    return f;
  });
}
