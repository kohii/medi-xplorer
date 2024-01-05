import type { FieldFilterItem } from "@/features/search/types";
import type { ShinryoukouiMasterFieldName } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { splitByWhitespace } from "@/utils/text";


export type AdvancedSearchItem = {
  field: ShinryoukouiMasterFieldName;
  operatorKind: AdvancedSearchOperatorKind;
  value: string;
  restValues?: string[];
};

type Option = {
  kind: string;
  label: string;
  operator: string;
  negative: boolean;
  toFieldFilterItem(item: AdvancedSearchItem): FieldFilterItem;
};

export const advancedSearchOperatorOptions = [{
  kind: "eq",
  label: "が次と一致する",
  operator: ":",
  negative: false,
  toFieldFilterItem(item: AdvancedSearchItem) {
    return {
      fieldKey: item.field,
      operator: ":",
      value: item.value.trim(),
      negative: false,
    };
  },
}, {
  kind: "not-eq",
  label: "が次と一致しない",
  operator: ":",
  negative: true,
  toFieldFilterItem(item: AdvancedSearchItem) {
    return {
      fieldKey: item.field,
      operator: ":",
      value: item.value.trim(),
      negative: true,
    };
  },
}, {
  kind: "in",
  label: "が次のいずれかに一致する",
  operator: ":",
  negative: false,
  toFieldFilterItem(item: AdvancedSearchItem) {
    let values = (item.restValues ? [item.value, ...item.restValues] : [item.value]);
    // migrate spaces to commas
    values = values.flatMap(value => splitByWhitespace(value)).map(value => value.trim()).filter(Boolean);
    return {
      fieldKey: item.field,
      operator: ":",
      value: values.join(","),
      negative: false,
    };
  },
}, {
  kind: "not-in",
  label: "が次のいずれでもない",
  operator: ":",
  negative: true,
  toFieldFilterItem(item: AdvancedSearchItem) {
    let values = (item.restValues ? [item.value, ...item.restValues] : [item.value]);
    // migrate spaces to commas
    values = values.flatMap(value => splitByWhitespace(value)).map(value => value.trim()).filter(Boolean);
    return {
      fieldKey: item.field,
      operator: ":",
      value: values.join(","),
      negative: true,
    };
  }
}, {
  kind: "gt",
  label: "が次より大きい",
  operator: ">",
  negative: false,
  toFieldFilterItem(item: AdvancedSearchItem) {
    return {
      fieldKey: item.field,
      operator: ":>",
      value: item.value.trim(),
      negative: false,
    };
  },
}, {
  kind: "gte",
  label: "が次以上",
  operator: ">=",
  negative: false,
  toFieldFilterItem(item: AdvancedSearchItem) {
    return {
      fieldKey: item.field,
      operator: ":>=",
      value: item.value.trim(),
      negative: false,
    };
  },
}, {
  kind: "lt",
  label: "が次より小さい",
  operator: "<",
  negative: false,
  toFieldFilterItem(item: AdvancedSearchItem) {
    return {
      fieldKey: item.field,
      operator: ":<",
      value: item.value,
      negative: false,
    };
  },
}, {
  kind: "lte",
  label: "が次以下",
  operator: "<=",
  negative: false,
  toFieldFilterItem(item: AdvancedSearchItem) {
    return {
      fieldKey: item.field,
      operator: ":<=",
      value: item.value,
      negative: false,
    };
  },
}] satisfies Option[];

export const advancedSearchItemOperatorKinds = advancedSearchOperatorOptions.map((option) => option.kind);

export type AdvancedSearchOperatorKind = typeof advancedSearchOperatorOptions[number]["kind"];
