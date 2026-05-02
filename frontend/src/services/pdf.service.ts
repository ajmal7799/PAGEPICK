import axios from 'axios';
import type { UploadResponse } from '../types/pdf.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
});

export const pdfService = {
  /**
   * Uploads a PDF file to the backend
   */
  uploadPdf: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await apiClient.post<UploadResponse>('/api/pdf/upload', formData);

    return response.data;
  },

  /**
   * Constructs the URL to fetch the full PDF file
   */
  getPdfUrl: (fileId: string): string => {
    return `${API_URL}/api/pdf/${encodeURIComponent(fileId)}`;
  },

  /**
   * Sends a request to extract specific pages and download the resulting PDF
   */
  extractPages: async (fileId: string, pages: number[]): Promise<Blob> => {
    const response = await apiClient.post(
      '/api/pdf/extract',
      { fileId, pages },
      { responseType: 'blob' }
    );

    return response.data;
  },
};
