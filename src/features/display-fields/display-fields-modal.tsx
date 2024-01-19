import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { DEFAULT_DISPLAY_FIELDS } from "./constants";
import { DisplayFieldsForm } from "./display-fields-form";
import { stringifyDisplayFieldConfigs } from "./stringify-display-field-config";
import { DisplayFieldConfig, IdentifiedDisplayFieldConfig } from "./types";

type DisplayFieldsModalProps = {
  fields: DisplayFieldConfig[];
  onClose: () => void;
}

export function DisplayFieldsModal({
  fields: initialFields,
  onClose,
}: DisplayFieldsModalProps) {
  const [fields, setFields] = useState<IdentifiedDisplayFieldConfig[]>(() => initialFields.map((field) => ({
    ...field,
    id: crypto.randomUUID(),
  })));

  const { push } = useRouter();

  const handleOk = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    if (fields.length === 0) {
      searchParams.delete(SEARCH_PARAM_NAMES.FIELDS);
    } else {
      const s = stringifyDisplayFieldConfigs(fields);
      const defaults = stringifyDisplayFieldConfigs(DEFAULT_DISPLAY_FIELDS);
      if (s === defaults) {
        searchParams.delete(SEARCH_PARAM_NAMES.FIELDS);
      } else {
        searchParams.set(SEARCH_PARAM_NAMES.FIELDS, s);
      }
    }

    push(`/s?${searchParams.toString()}`);

    onClose();
  }, [fields, onClose, push]);

  const handleReset = () => {
    setFields(DEFAULT_DISPLAY_FIELDS.map((field) => ({
      ...field,
      id: crypto.randomUUID(),
    })));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // Commend+Enter or Ctrl+Enter to submit
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      e.stopPropagation();
      handleOk();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  return (
    <Modal
      title="表示する列を変更"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      size="lg"
      footer={(
        <div className="flex gap-3">
          <Button onClick={handleOk}>確定</Button>
          <Button variant="secondary" onClick={handleReset}>リセット</Button>
        </div>
      )}
    >
      <DisplayFieldsForm fields={fields} onChange={setFields} />
    </Modal>
  );
}