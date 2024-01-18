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

import { DisplayFieldItem } from "./display-field-item";
import { DisplayFieldSelect } from "./display-field-select";
import { SortableDisplayFieldItem } from "./sortable-display-field-item";
import { DisplayFieldConfig, IdentifiedDisplayFieldConfig } from "./types";

type DisplayFieldsFormProps = {
  fields: IdentifiedDisplayFieldConfig[];
  onChange: (fields: IdentifiedDisplayFieldConfig[]) => void;
};

export function DisplayFieldsForm({ fields, onChange }: DisplayFieldsFormProps) {
  const [activeField, setActiveField] = useState<IdentifiedDisplayFieldConfig | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    const field = fields.find((f) => f.id === active.id)!;
    setActiveField(field);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.indexOf(fields.find((f) => f.id === over.id)!);

      onChange(arrayMove(fields, oldIndex, newIndex));
    }

    setActiveField(null);
  };

  const handleAddField = (field: DisplayFieldConfig) => {
    onChange([...fields, { ...field, id: crypto.randomUUID() }]);
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
          items={fields}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field, index) => (
            <SortableDisplayFieldItem
              key={index}
              id={field.id}
              value={field}
              onChange={value => {
                const newFields = [...fields];
                newFields[index] = { ...value, id: field.id };
                onChange(newFields);
              }}
              onDelete={() => {
                const newFields = [...fields];
                newFields.splice(index, 1);
                onChange(newFields);
              }}
              className="border-b border-gray-200"
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeField ? <DisplayFieldItem value={activeField} className="shadow-md" /> : null}
        </DragOverlay>
      </DndContext>
      <DisplayFieldSelect onChange={handleAddField} className="mt-2" />
    </div>
  );
}
