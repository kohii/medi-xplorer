"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Backdrop } from "@/components/backdrop";

import { stringifyDisplayColumnConfigs } from "./stringify-display-column-config";
import { DisplayColumnConfig } from "./types";

type DisplayColumnsButtonProps = {
  initialColumnsConfigs: DisplayColumnConfig[]
};

export function DisplayColumnsButton({ initialColumnsConfigs }: DisplayColumnsButtonProps) {
  const [isOpen, setOpen] = useState(false);

  const open = () => {
    setOpen(true);
  };

  const { push } = useRouter();

  const handleOk = useCallback((columnConfigs: DisplayColumnConfig[]) => {
    const searchParams = new URLSearchParams(location.search);
    if (columnConfigs.length === 0) {
      searchParams.delete("columns");
    } else {
      searchParams.set("columns", stringifyDisplayColumnConfigs(columnConfigs));
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
      {isOpen && (<DynamicDisplayColumnsFormModal
        columns={initialColumnsConfigs}
        onOk={handleOk}
        onClose={() => setOpen(false)}
      />)}
    </>
  );
}

const DynamicDisplayColumnsFormModal = dynamic(
  () => import("./display-columns-modal").then(m => m.DisplayColumnsModal),
  { ssr: false, loading: () => <Backdrop /> },
);