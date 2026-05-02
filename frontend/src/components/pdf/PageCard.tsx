import React from 'react';
import { Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PageCardProps {
  pageIndex: number;
  isSelected: boolean;
  onToggle: (pageIndex: number) => void;
  zoom: number;
}

export const PageCard: React.FC<PageCardProps> = ({ pageIndex, isSelected, onToggle, zoom }) => {
  const pageNumber = pageIndex + 1; // 1-indexed for display

  return (
    <div
      onClick={() => onToggle(pageIndex)}
      className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col bg-white
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
      `}
    >
      <div className="absolute top-2 left-2 z-10 bg-white rounded-md bg-opacity-80 p-0.5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}} // Handled by parent onClick
          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 pointer-events-none"
        />
      </div>

      <div className="flex-grow flex items-center justify-center p-2 bg-gray-50">
        <div 
          className="flex items-center justify-center transition-all duration-200" 
          style={{ minHeight: `${250 * zoom}px` }}
        >
          <Page
            pageNumber={pageNumber}
            width={200 * zoom}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-sm border border-gray-100"
            loading={<div className="bg-gray-200 flex items-center justify-center rounded animate-pulse" style={{ width: `${200 * zoom}px`, height: `${250 * zoom}px` }}>Loading...</div>}
          />
        </div>
      </div>

      <div className={`p-2 text-center text-sm font-medium border-t transition-colors ${isSelected ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600'}`}>
        Page {pageNumber}
      </div>
    </div>
  );
};
