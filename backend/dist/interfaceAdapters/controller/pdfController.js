"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const pdfService_1 = __importDefault(require("../../services/pdfService"));
class PdfController {
    // POST /api/pdf/upload
    upload(req, res) {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No file uploaded' });
                return;
            }
            const response = {
                message: 'File uploaded successfully',
                fileId: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size
            };
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({ error: 'Upload failed' });
        }
    }
    // GET /api/pdf/:fileId
    getPdf(req, res) {
        try {
            const { fileId } = req.params; // ✅ now TypeScript knows fileId exists
            const filePath = pdfService_1.default.getPdfPath(fileId);
            if (!filePath) {
                res.status(404).json({ error: 'File not found' });
                return;
            }
            res.sendFile(filePath);
        }
        catch (error) {
            res.status(500).json({ error: 'Could not retrieve file' });
        }
    }
    // POST /api/pdf/extract
    async extractPages(req, res) {
        try {
            const { fileId, pages } = req.body;
            if (!fileId || !pages || pages.length === 0) {
                res.status(400).json({ error: 'fileId and pages are required' });
                return;
            }
            const newPdfBytes = await pdfService_1.default.extractPages(fileId, pages);
            if (!newPdfBytes) {
                res.status(400).json({ error: 'Invalid file or pages' });
                return;
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=extracted.pdf');
            res.send(Buffer.from(newPdfBytes));
        }
        catch (error) {
            res.status(500).json({ error: 'PDF extraction failed' });
        }
    }
}
exports.PdfController = PdfController;
exports.default = new PdfController();
