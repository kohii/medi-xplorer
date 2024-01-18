import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { DisplayColumnItem } from "./display-column-item";
import { DisplayColumnSelect } from "./display-column-select";
import { SortableDisplayColumnItem } from "./sortable-display-column-item";
import { DisplayColumnConfig, IdentifiedDisplayColumnConfig } from "./types";

type TableColumnsEditorProps = {
  columns: IdentifiedDisplayColumnConfig[];
  onChange: (columns: IdentifiedDisplayColumnConfig[]) => void;
};

export function DisplayColumnsForm({ columns, onChange }: TableColumnsEditorProps) {
  const [activeColumn, setActiveColumn] = useState<IdentifiedDisplayColumnConfig | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    const column = columns.find((column) => column.id === active.id)!;
    setActiveColumn(column);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column.id === active.id);
      const newIndex = columns.indexOf(columns.find((column) => column.id === over.id)!);

      onChange(arrayMove(columns, oldIndex, newIndex));
    }

    setActiveColumn(null);
  };

  const handleAddColumn = (column: DisplayColumnConfig) => {
    onChange([...columns, { ...column, id: crypto.randomUUID() }]);
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns}
          strategy={verticalListSortingStrategy}
        >
          {columns.map((column, index) => (
            <SortableDisplayColumnItem
              key={index}
              id={column.id}
              value={column}
              onChange={value => {
                const newColumns = [...columns];
                newColumns[index] = { ...value, id: column.id };
                onChange(newColumns);
              }}
              onDelete={() => {
                const newColumns = [...columns];
                newColumns.splice(index, 1);
                onChange(newColumns);
              }}
              className="border-b border-gray-200"
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeColumn ? <DisplayColumnItem value={activeColumn} className="shadow-md" /> : null}
        </DragOverlay>
      </DndContext>
      <DisplayColumnSelect onChange={handleAddColumn} className="mt-2" />
    </div>
  );
}
