import { writeFileSync } from "node:fs";

import fieldGroups from "../src/features/shinryoukoui-master-fields/shinryoukoui-master-field-groups.json" assert { type: "json" };
import fields from "../src/features/shinryoukoui-master-fields/shinryoukoui-master-fields.json" assert { type: "json" };

function generateFieldsTypes() {
  const output = `
import { Field} from "@/features/fields/types";

declare type _FieldName = ${fields.map((item) => `"${item.name}"`).join(" | ")};
declare const data: (Field & { name: _FieldName })[];	
export default data;
`.trimStart();
  writeFileSync("src/features/shinryoukoui-master-fields/shinryoukoui-master-fields.d.json.ts", output);
}

function generateFieldGroupsTypes() {
  const output = `
import { FieldGroup } from "@/features/fields/types";
declare type _FieldGroupName = ${fieldGroups.map((item) => `"${item.name}"`).join(" | ")};
declare const data: (FieldGroup & { name: _FieldGroupName })[];
export default data;
`.trimStart();
  writeFileSync("src/features/shinryoukoui-master-fields/shinryoukoui-master-field-groups.d.json.ts", output);
}

generateFieldsTypes();
generateFieldGroupsTypes();
