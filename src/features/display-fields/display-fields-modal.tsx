import { useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";

import { DEFAULT_DISPLAY_FIELDS } from "./constants";
import { DisplayFieldsForm } from "./display-fields-form";
import { DisplayFieldConfig, IdentifiedDisplayFieldConfig } from "./types";

type DisplayFieldsModalProps = {
  fields: DisplayFieldConfig[];
  onOk: (fields: DisplayFieldConfig[]) => void;
  onClose: () => void;
}

export function DisplayFieldsModal({
  fields: initialFields,
  onOk,
  onClose,
}: DisplayFieldsModalProps) {
  const [fields, setFields] = useState<IdentifiedDisplayFieldConfig[]>(() => initialFields.map((field) => ({
    ...field,
    id: crypto.randomUUID(),
  })));

  const handleOk = () => {
    onOk(fields);
  };
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
      title="表示する列変更"
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