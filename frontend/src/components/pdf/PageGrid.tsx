import React from 'react';
import { PageCard } from './PageCard';

interface PageGridProps {
  totalPages: number;
  selectedPages: number[];
  onTogglePage: (pageIndex: number) => void;
  zoom: number;
}

export const PageGrid: React.FC<PageGridProps> = ({ totalPages, selectedPages, onTogglePage, zoom }) => {
  return (
    <div 
      className="grid gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-200"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(150, 200 * zoom + 20)}px, 1fr))` }}
    >
      {Array.from(new Array(totalPages), (_, index) => (
        <PageCard
          key={`page-${index}`}
          pageIndex={index}
          isSelected={selectedPages.includes(index)}
          onToggle={onTogglePage}
          zoom={zoom}
        />
      ))}
    </div>
  );
};
