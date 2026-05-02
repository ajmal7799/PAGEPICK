import { Request, Response } from 'express'
import pdfService from '../../services/pdfService'
import { UploadResponse,ExtractRequest } from '../../types/pdf.types' 
import { PdfParams } from '../../types/pdf.types'

export class PdfController {

  // POST /api/pdf/upload
  upload(req: Request, res: Response): void {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' })
        return
      }

      const response: UploadResponse = {
        message: 'File uploaded successfully',
        fileId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      }

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error: 'Upload failed' })
    }
  }

  // GET /api/pdf/:fileId
getPdf(req: Request<PdfParams>, res: Response): void {
  try {
    const { fileId } = req.params  // ✅ now TypeScript knows fileId exists

    const filePath = pdfService.getPdfPath(fileId)

    if (!filePath) {
      res.status(404).json({ error: 'File not found' })
      return
    }

    res.sendFile(filePath)
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve file' })
  }
}

  // POST /api/pdf/extract
  async extractPages(req: Request, res: Response): Promise<void> {
    try {
      const { fileId, pages }: ExtractRequest = req.body

      if (!fileId || !pages || pages.length === 0) {
        res.status(400).json({ error: 'fileId and pages are required' })
        return
      }

      const newPdfBytes = await pdfService.extractPages(fileId, pages)

      if (!newPdfBytes) {
        res.status(400).json({ error: 'Invalid file or pages' })
        return
      }

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename=extracted.pdf')
      res.send(Buffer.from(newPdfBytes))

    } catch (error) {
      res.status(500).json({ error: 'PDF extraction failed' })
    }
  }
}

export default new PdfController()