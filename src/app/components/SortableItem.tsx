// import React, { ReactNode } from 'react';
// import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { Arguments } from '@dnd-kit/sortable/dist/hooks/useSortable';
// import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';


// type SortableListProps<T> = {
//   children: ReactNode;
//   className?: string;
//   items: T[];
//   onReorder?: (newOrder: T[]) => void;
// };

// export default function SortableList<T extends { id: UniqueIdentifier }>({ items, onReorder , children , className }: SortableListProps<T>) {

//   function handleDragEnd({active, over}: DragEndEvent) {
    
//     if (active.id !== over?.id && onReorder) {
//       const oldIndex = items.findIndex(item => item.id === active.id);
//         const newIndex = items.findIndex(item => item.id === over?.id);
//         const newOrder = arrayMove(items, oldIndex, newIndex);

//       onReorder(newOrder);
//     }
//   }
//   return (
//     <DndContext
//       onDragEnd={handleDragEnd}
//     >
//       <SortableContext
//         items={items}
//         strategy={horizontalListSortingStrategy}
//       >
//         <ul className={className}>
//         {children}
//         </ul>
//       </SortableContext>
//     </DndContext>
//   );
// }



// type SortableItemProps = {
//   children: ReactNode;
//   className?: string;
// } & Arguments;


// export function SortableItem({className, children, ...rest  }: SortableItemProps) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ ...rest });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <li className={className} ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {children}
//     </li>
//   );
// }



import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props: { id: any; }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* ... */}
    </div>
  );
}