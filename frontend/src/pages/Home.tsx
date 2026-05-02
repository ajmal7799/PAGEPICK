import React, { useState } from 'react';
import { Document } from 'react-pdf';
import { UploadZone } from '../components/pdf/UploadZone';
import { PageGrid } from '../components/pdf/PageGrid';
import { SelectedPagesReorder } from '../components/pdf/SelectedPagesReorder';
import { Button } from '../components/ui/Button';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { usePdf } from '../hooks/usePdf';
import { pdfService } from '../services/pdf.service';
import type { PdfFile } from '../types/pdf.types';
import { downloadBlob } from '../utils/file.utils';

export const Home: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<PdfFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [zoom, setZoom] = useState<number>(1);
  const [extractSuccessUrl, setExtractSuccessUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string>('');

  const {
    selectedPages,
    togglePage,
    selectAll,
    deselectAll,
    reorderPages,
  } = usePdf();

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError('');
    setExtractSuccessUrl(null);
    
    try {
      const response = await pdfService.uploadPdf(file);
      const newFile: PdfFile = {
        fileId: response.fileId,
        originalName: response.originalName,
        size: response.size,
        totalPages: 0, // Will be set when document loads
      };
      
      setCurrentFile(newFile);
      setPdfUrl(pdfService.getPdfUrl(response.fileId));
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    if (currentFile) {
      setCurrentFile({ ...currentFile, totalPages: numPages });
    }
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error('react-pdf error:', error);
    setError('Failed to load PDF document.');
  };

  const handleExtract = async () => {
    if (!currentFile || selectedPages.length === 0) return;

    setIsExtracting(true);
    setError('');
    setExtractSuccessUrl(null);

    try {
      const blob = await pdfService.extractPages(currentFile.fileId, selectedPages);
      
      // Auto-download triggers, and we also save object url for explicit download button
      downloadBlob(blob, `extracted_${currentFile.originalName}`);
      const url = window.URL.createObjectURL(blob);
      setExtractSuccessUrl(url);
    } catch (err) {
      console.error(err);
      setError('Failed to create PDF. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  };

  const resetAll = () => {
    setCurrentFile(null);
    setPdfUrl('');
    deselectAll();
    setError('');
    setExtractSuccessUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SlicePDF</h1>
          </div>
          {currentFile && (
            <Button variant="outline" size="sm" onClick={resetAll}>
              Upload New PDF
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} />

        {!currentFile && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <UploadZone onUpload={handleUpload} onError={setError} isUploading={isUploading} error={error} />
          </div>
        )}

        {currentFile && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* hidden Document purely to load info and provide context to Pages via react-pdf */}
            {pdfUrl && (
              <div className="hidden">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={handleDocumentLoadSuccess}
                  onLoadError={handleDocumentLoadError}
                />
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentFile.originalName}</h2>
                <p className="text-sm text-gray-500">{currentFile.totalPages} pages total</p>
              </div>

              <div className="flex items-center space-x-3">
                <Button 
                  variant="secondary" 
                  onClick={() => selectAll(currentFile.totalPages)}
                  disabled={currentFile.totalPages === 0}
                >
                  Select All
                </Button>
                <Button 
                  variant="outline" 
                  onClick={deselectAll}
                  disabled={selectedPages.length === 0}
                >
                  Deselect All
                </Button>
                <div className="h-8 w-px bg-gray-300 mx-2" />
                <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                  {selectedPages.length} selected
                </div>
                <div className="h-8 w-px bg-gray-300 mx-1 md:mx-2 hidden sm:block" />
                <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg p-1 text-gray-600">
                  <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Zoom Out">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="text-xs font-semibold w-10 text-center">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => setZoom(z => Math.min(2.5, z + 0.25))} className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Zoom In">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {currentFile.totalPages > 0 ? (
              <Document file={pdfUrl} className="w-full">
                <PageGrid
                  totalPages={currentFile.totalPages}
                  selectedPages={selectedPages}
                  onTogglePage={togglePage}
                  zoom={zoom}
                />
              </Document>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-500">Loading document pages...</p>
              </div>
            )}

            <SelectedPagesReorder
              selectedPages={selectedPages}
              onReorder={reorderPages}
            />

            <div className="flex justify-end pt-4 border-t border-gray-200 gap-4">
              {extractSuccessUrl && (
                <a 
                  href={extractSuccessUrl} 
                  download={`extracted_${currentFile.originalName}`}
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 text-sm px-4 py-2"
                >
                  Download PDF
                </a>
              )}
              <span className="relative group inline-block">
                <Button
                  size="lg"
                  onClick={handleExtract}
                  isLoading={isExtracting}
                  disabled={selectedPages.length === 0}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  {isExtracting ? 'Creating PDF...' : 'Create PDF'}
                </Button>
                {selectedPages.length === 0 && (
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded pointer-events-none whitespace-nowrap">
                    Select at least one page
                  </div>
                )}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
