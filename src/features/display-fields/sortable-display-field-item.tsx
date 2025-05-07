import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { DisplayFieldItem, DisplayFieldItemProps } from "./display-field-item";

type SortableDisplayFieldItemProps = DisplayFieldItemProps & {
  id: string;
};

export function SortableDisplayFieldItem({ id, ...props }: SortableDisplayFieldItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DisplayFieldItem
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
      className={isDragging ? "**:cursor-grabbing!" : undefined}
    />
  );
}