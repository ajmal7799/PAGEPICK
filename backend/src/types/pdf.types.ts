// Upload response type
export interface UploadResponse {
  message: string
  fileId: string
  originalName: string
  size: number
}

// Extract request type
export interface ExtractRequest {
  fileId: string
  pages: number[]
}

// Error response type
export interface ErrorResponse {
  error: string
}

export interface PdfParams {
  fileId: string
}