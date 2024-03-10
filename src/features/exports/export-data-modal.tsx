import { useState } from "react";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { FormItem } from "@/components/form-item";
import { FormLabel } from "@/components/form-label";
import { CheckIcon } from "@/components/icons/check-icon";
import { Modal } from "@/components/modal";
import { Select } from "@/components/select";
import { DisplayFieldConfig } from "@/features/display-fields/types";
import { useAutoResetState } from "@/hooks/use-auto-reset-state";

import { FieldChooser } from "./field-chooser";
import { ExportOptions } from "./types";
import { useExportData } from "./use-export-data";

type ExportDataModalProps = {
  rows: string[][];
  displayFields: DisplayFieldConfig[];
  onClose: () => void;
}

export function ExportDataModal({
  rows,
  displayFields,
  onClose,
}: ExportDataModalProps) {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    delimiter: "\t",
    includeHeader: true,
    quoteWhen: "auto",
    rowDelimiter: "\n",
  });
  const [selectedFieldIndices, setSelectedFieldIndices] = useState<Set<number>>(() => new Set(displayFields.map((_, i) => i)));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  const [copied, setCopied] = useAutoResetState(false, 2000);
  const { download, copy } = useExportData(rows, displayFields, exportOptions);

  return (
    <Modal
      title="エクスポート"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      size="md"
      footer={(
        <div className="flex gap-4">
          <Button onClick={download}>ダウンロード</Button>
          <Button
            variant="secondary"
            onClick={async () => {
              await copy();
              setCopied(true);
            }}
          >
            { copied ? <div className="flex items-center gap-1"><CheckIcon/> コピーしました</div> : "クリップボードにコピー" }
          </Button>
        </div>
      )}
    >
      <div className="grid gap-3"
        style={{
          gridTemplateColumns: "224px 1fr",
        }}>
        <div className="flex flex-col gap-1">
          <FormItem>
            <FormLabel>区切り文字</FormLabel>
            <Select
              value={exportOptions.delimiter}
              onChange={delimiter => setExportOptions({ ...exportOptions, delimiter })}
              className="py-1.5"
              options={[
                { label: "カンマ", value: "," },
                { label: "タブ", value: "\t" },
              ]}
            />
          </FormItem>
          <FormItem>
            <FormLabel>囲み文字</FormLabel>
            <Select
              value={exportOptions.quoteWhen}
              onChange={quoteWhen => setExportOptions({ ...exportOptions, quoteWhen })}
              className="py-1.5"
              options={[
                { label: "あり", value: "always" },
                { label: "なし", value: "never" },
                { label: "必要なときのみ", value: "auto" },
              ]}
            />
          </FormItem>
          <FormItem>
            <FormLabel>改行</FormLabel>
            <Select
              value={exportOptions.rowDelimiter}
              onChange={rowDelimiter => setExportOptions({ ...exportOptions, rowDelimiter })}
              className="py-1.5"
              options={[
                { label: "LF (\\n)", value: "\n" },
                { label: "CRLF (\\r\\n)", value: "\r\n" },
              ]}
            />
          </FormItem>
          <FormItem>
            <FormLabel>ヘッダー</FormLabel>
            <Checkbox
              value={exportOptions.includeHeader}
              onChange={includeHeader => setExportOptions({ ...exportOptions, includeHeader })}
              label="あり"
            />
          </FormItem>
        </div>
        <div>
          <FieldChooser
            fields={displayFields}
            selectedFieldIndices={selectedFieldIndices}
            onChange={setSelectedFieldIndices}
          />
        </div>
      </div>
    </Modal>
  );
}
