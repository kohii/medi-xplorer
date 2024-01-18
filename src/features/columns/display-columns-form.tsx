import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { DisplayColumnItem } from "./display-column-item";
import { DisplayColumnSelect } from "./display-column-select";
import { SortableDisplayColumnItem } from "./sortable-display-column-item";
import { DisplayColumnConfig, IdentifiedDisplayColumnConfig } from "./types";

type TableColumnsEditorProps = {
  columns: IdentifiedDisplayColumnConfig[];
  onChange: (columns: IdentifiedDisplayColumnConfig[]) => void;
};

export function DisplayColumnsForm({ columns, onChange }: TableColumnsEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column.id === active.id);
      const newIndex = columns.indexOf(columns.find((column) => column.id === over.id)!);

      onChange(arrayMove(columns, oldIndex, newIndex));
    }
  };

  const handleAddColumn = (column: DisplayColumnConfig) => {
    onChange([...columns, { ...column, id: crypto.randomUUID() }]);
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
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
      </DndContext>
      <DisplayColumnSelect onChange={handleAddColumn} className="mt-2" />
    </div>
  );
}
