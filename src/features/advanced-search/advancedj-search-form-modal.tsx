import { useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { FieldName, getField, getFieldBySeq } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { splitByWhitespace } from "@/utils/text";

import { parseQuery } from "../search/parse-query";
import { stringifyQuery } from "../search/stringify-query";
import { FieldFilterItem, FilterItem } from "../search/types";

import { AdvancedSearchForm, AdvancedSearchParams } from "./advanced-search-form";
import { AdvancedSearchItem, AdvancedSearchOperatorKind, advancedSearchOperatorOptions } from "./constants";




type AdvancedSearchFormModalProps = {
	query: string;
	onChange: (query: string) => void;
	onClose: () => void;
};

export function AdvancedSearchFormModal({
  query,
  onChange,
  onClose,
}: AdvancedSearchFormModalProps) {
  const [params, setParams] = useState<AdvancedSearchParams>(() => {
    const parsed = parseQuery(query);
    if (parsed.kind === "ERROR") {
      return {
        keyword: "",
        exclude: "",
        items: [],
      };
    }
    return {
      keyword: parsed.value.filter(item => !item.operator && !item.negative).map(item => item.value).join(" "),
      exclude: parsed.value.filter(item => !item.operator && item.negative).map(item => item.value).join(" "),
      items: parsed.value
        .filter((item): item is FieldFilterItem => item.operator !== undefined)
        .map(convertFilterItemToAdvancedSearchItem)
        .filter((item): item is AdvancedSearchItem => item !== undefined),
    };
  });

  const handleOk = () => {
    const filterItems: FilterItem[] = [
      ...splitByWhitespace(params.keyword).map(value => ({
        negative: false,
        value,
      })),
      ...splitByWhitespace(params.exclude).map(value => ({
        negative: true,
        value,
      })),
      ...params.items.map(item => convertAdvancedSearchItemToFilterItem(item)),
    ];
    onChange(stringifyQuery(filterItems));
    onClose();
  };

  // Commend+Enter or Ctrl+Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleOk();
    }
  };

  return (
    <Modal
      title="詳細検索"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      footer={(
        <>
          <Button onClick={handleOk}>検索</Button>
        </>
      )}
    >
      <AdvancedSearchForm value={params} onChange={setParams} />
    </Modal>
  );
}

function convertFilterItemToAdvancedSearchItem(filterItem: FieldFilterItem): AdvancedSearchItem | undefined {
  const [value, ...restValues] = filterItem.operator === ":" ? filterItem.value.split(",").filter(Boolean) : [filterItem.value];
  const operatorKind: AdvancedSearchOperatorKind = (() => {
    if (!filterItem.negative) {
      switch (filterItem.operator) {
      case ":": return restValues.length > 0 ? "in" : "eq";
      case ":>": return "gt";
      case ":>=": return "gte";
      case ":<": return "lt";
      case ":<=": return "lte";
      }
    }
    switch (filterItem.operator) {
    case ":": return restValues.length > 0 ? "not-in" : "not-eq";
    case ":>": return "lte";
    case ":>=": return "lt";
    case ":<": return "gte";
    case ":<=": return "gt";
    }
  })();

  const field = getField(filterItem.fieldKey as FieldName) ?? getFieldBySeq(+filterItem.fieldKey);
  if (!field) return undefined;

  return {
    field: field.name as FieldName,
    operatorKind,
    value,
    restValues,
  };
}

function convertAdvancedSearchItemToFilterItem(item: AdvancedSearchItem): FieldFilterItem {
  const option = advancedSearchOperatorOptions.find(option => option.kind === item.operatorKind)!;
  return option.toFieldFilterItem(item);
}