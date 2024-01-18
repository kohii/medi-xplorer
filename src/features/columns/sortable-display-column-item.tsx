import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { DisplayColumnItem, DisplayColumnItemProps } from "./display-column-item";

type SortableDisplayColumnItemProps = DisplayColumnItemProps & {
  id: string;
};

export function SortableDisplayColumnItem({ id, ...props }: SortableDisplayColumnItemProps) {
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
    <DisplayColumnItem
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
      className={isDragging ? "[&_*]:!cursor-grabbing" : undefined}
    />
  );
}