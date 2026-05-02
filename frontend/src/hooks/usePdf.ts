import { useState, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

export const usePdf = () => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const togglePage = useCallback((pageIndex: number) => {
    setSelectedPages((prev) => {
      if (prev.includes(pageIndex)) {
        return prev.filter((p) => p !== pageIndex);
      } else {
        return [...prev, pageIndex];
      }
    });
  }, []);

  const selectAll = useCallback((totalPages: number) => {
    const allPages = Array.from({ length: totalPages }, (_, i) => i);
    setSelectedPages(allPages);
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedPages([]);
  }, []);

  const reorderPages = useCallback((oldIndex: number, newIndex: number) => {
    setSelectedPages((prev) => arrayMove(prev, oldIndex, newIndex));
  }, []);

  return {
    selectedPages,
    togglePage,
    selectAll,
    deselectAll,
    reorderPages,
  };
};
