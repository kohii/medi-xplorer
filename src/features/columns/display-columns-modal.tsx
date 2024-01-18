import { useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";

import { DEFAULT_COLUMN_CONFIGS } from "./constants";
import { DisplayColumnsForm } from "./display-columns-form";
import { DisplayColumnConfig, IdentifiedDisplayColumnConfig } from "./types";

type DisplayColumnsModalProps = {
  columns: DisplayColumnConfig[];
  onOk: (columns: DisplayColumnConfig[]) => void;
  onClose: () => void;
}

export function DisplayColumnsModal({
  columns: initialColumns,
  onOk,
  onClose,
}: DisplayColumnsModalProps) {
  const [columns, setColumns] = useState<IdentifiedDisplayColumnConfig[]>(() => initialColumns.map((column) => ({
    ...column,
    id: crypto.randomUUID(),
  })));

  const handleOk = () => {
    onOk(columns);
  };
  const handleReset = () => {
    setColumns(DEFAULT_COLUMN_CONFIGS.map((column) => ({
      ...column,
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
      <DisplayColumnsForm columns={columns} onChange={setColumns} />
    </Modal>
  );
}