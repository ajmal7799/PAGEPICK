import { PDFDocument } from 'pdf-lib'
import { getFilePath,fileExists, readFileAsBuffer } from '../utils/file.utils' 
import envConfig from '../config/env.config'

export class PdfService {

  // Get PDF file path
  getPdfPath(fileId: string): string | null {
    const filePath = getFilePath(envConfig.uploadDir as string, fileId)
    if (!fileExists(filePath)) return null
    return filePath
  }

  // Extract selected pages and return new PDF bytes
  async extractPages(
    fileId: string,
    pages: number[]
  ): Promise<Uint8Array | null> {

    const filePath = getFilePath(envConfig.uploadDir as string, fileId)

    if (!fileExists(filePath)) return null

    // Load original PDF
    const originalBytes = readFileAsBuffer(filePath)
    const originalPdf = await PDFDocument.load(originalBytes)
    const totalPages = originalPdf.getPageCount()

    // Filter valid pages only
    const validPages = pages.filter(p => p >= 0 && p < totalPages)
    if (validPages.length === 0) return null

    // Create new PDF
    const newPdf = await PDFDocument.create()
    const copiedPages = await newPdf.copyPages(originalPdf, validPages);
    
    for (const page of copiedPages) {
      newPdf.addPage(page);
    }

    return await newPdf.save()
  }
}

export default new PdfService()