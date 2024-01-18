"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Backdrop } from "@/components/backdrop";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { DEFAULT_DISPLAY_FIELDS } from "./constants";
import { stringifyDisplayFieldConfigs } from "./stringify-display-field-config";
import { DisplayFieldConfig } from "./types";

type DisplayFieldsButtonProps = {
  initialFieldsConfigs: DisplayFieldConfig[]
};

export function DisplayFieldsButton({ initialFieldsConfigs: initialFieldsConfigs }: DisplayFieldsButtonProps) {
  const [isOpen, setOpen] = useState(false);

  const open = () => {
    setOpen(true);
  };

  const { push } = useRouter();

  const handleOk = useCallback((fieldConfigs: DisplayFieldConfig[]) => {
    const searchParams = new URLSearchParams(location.search);
    if (fieldConfigs.length === 0) {
      searchParams.delete(SEARCH_PARAM_NAMES.FIELDS);
    } else {
      const s = stringifyDisplayFieldConfigs(fieldConfigs);
      const defaults = stringifyDisplayFieldConfigs(DEFAULT_DISPLAY_FIELDS);
      if (s === defaults) {
        searchParams.delete(SEARCH_PARAM_NAMES.FIELDS);
      } else {
        searchParams.set(SEARCH_PARAM_NAMES.FIELDS, s);
      }
    }

    setOpen(false);
    push(`/s?${searchParams.toString()}`);
  }, [push]);

  return (
    <>
      <button
        onClick={open}
        className="text-blue-600 hover:text-blue-800 text-sm">
        表示する列を変更
      </button>
      {isOpen && (<DynamicDisplayFieldsFormModal
        fields={initialFieldsConfigs}
        onOk={handleOk}
        onClose={() => setOpen(false)}
      />)}
    </>
  );
}

const DynamicDisplayFieldsFormModal = dynamic(
  () => import("./display-fields-modal").then(m => m.DisplayFieldsModal),
  { ssr: false, loading: () => <Backdrop /> },
);