export interface UploadResponse {
  message: string;
  fileId: string;
  originalName: string;
  size: number;
}

export interface ExtractRequest {
  fileId: string;
  pages: number[];
}

export interface PdfFile {
  fileId: string;
  originalName: string;
  size: number;
  totalPages: number;
}
