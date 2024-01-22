import dynamic from "next/dynamic";
import { useState } from "react";

import { Backdrop } from "@/components/backdrop";
import { CaretDownIcon } from "@/components/icons/caret-down-icon";
import { Menu, MenuItem } from "@/components/menu";

import { DisplayFieldConfig } from "../../features/display-fields/types";

type SearchResultMenuAnchorProps = {
  displayFields: DisplayFieldConfig[];
  rows: string[][];
};

export function SearchResultMenuAnchor({ displayFields, rows }: SearchResultMenuAnchorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [displayFieldsFormModalOpen, setDisplayFieldsFormModalOpen] = useState(false);
  const handleCustomizeDisplayFields = () => {
    setDisplayFieldsFormModalOpen(true);
    handleClose();
  };

  const [exportModalOpen, setExportModalOpen] = useState(false);
  const handleExport = () => {
    setExportModalOpen(true);
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-0.5">
        表示オプション
        <CaretDownIcon className="h-3 w-3" />
      </button>
      <Menu
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin="right"
      >
        <MenuItem onClick={handleCustomizeDisplayFields}>表示する列を変更</MenuItem>
        <MenuItem onClick={handleExport}>エクスポート</MenuItem>
      </Menu>
      {displayFieldsFormModalOpen && (
        <DynamicDisplayFieldsFormModal
          fields={displayFields}
          onClose={() => setDisplayFieldsFormModalOpen(false)}
        />)}
      {exportModalOpen && (
        <DynamicExportDataModal
          rows={rows}
          displayFields={displayFields}
          onClose={() => setExportModalOpen(false)}
        />)}
    </>
  );
}


const DynamicDisplayFieldsFormModal = dynamic(
  () => import("@/features/display-fields/display-fields-modal").then(m => m.DisplayFieldsModal),
  { ssr: false, loading: () => <Backdrop /> },
);

const DynamicExportDataModal = dynamic(
  () => import("@/features/exports/export-data-modal").then(m => m.ExportDataModal),
  { ssr: false, loading: () => <Backdrop /> },
);
