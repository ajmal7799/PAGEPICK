import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  pageIndex: number;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, pageIndex }) => {
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
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        flex items-center justify-center p-3 rounded-md shadow-sm border bg-white
        font-semibold cursor-grab active:cursor-grabbing text-gray-700 select-none
        ${isDragging ? 'shadow-lg border-blue-500 scale-105 opacity-80' : 'border-gray-200 hover:border-gray-300'}
      `}
    >
      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
      </svg>
      Page {pageIndex + 1}
    </div>
  );
};

interface SelectedPagesReorderProps {
  selectedPages: number[];
  onReorder: (oldIndex: number, newIndex: number) => void;
}

export const SelectedPagesReorder: React.FC<SelectedPagesReorderProps> = ({ selectedPages, onReorder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = selectedPages.findIndex((p) => p.toString() === active.id);
      const newIndex = selectedPages.findIndex((p) => p.toString() === over.id);
      onReorder(oldIndex, newIndex);
    }
  };

  if (selectedPages.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
        No pages selected yet. Select pages above to reorder them here.
      </div>
    );
  }

  // Convert page indices to string IDs for dnd-kit
  const items = selectedPages.map((p) => p.toString());

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Selected Pages Order</h3>
        <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {selectedPages.length} pages
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">Drag and drop to reorder how they will appear in the new PDF.</p>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-wrap gap-3">
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {selectedPages.map((pageIndex) => (
              <SortableItem key={pageIndex.toString()} id={pageIndex.toString()} pageIndex={pageIndex} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};
