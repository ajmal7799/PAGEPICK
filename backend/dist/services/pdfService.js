"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const pdf_lib_1 = require("pdf-lib");
const file_utils_1 = require("../utils/file.utils");
const env_config_1 = __importDefault(require("../config/env.config"));
class PdfService {
    // Get PDF file path
    getPdfPath(fileId) {
        const filePath = (0, file_utils_1.getFilePath)(env_config_1.default.uploadDir, fileId);
        if (!(0, file_utils_1.fileExists)(filePath))
            return null;
        return filePath;
    }
    // Extract selected pages and return new PDF bytes
    async extractPages(fileId, pages) {
        const filePath = (0, file_utils_1.getFilePath)(env_config_1.default.uploadDir, fileId);
        if (!(0, file_utils_1.fileExists)(filePath))
            return null;
        // Load original PDF
        const originalBytes = (0, file_utils_1.readFileAsBuffer)(filePath);
        const originalPdf = await pdf_lib_1.PDFDocument.load(originalBytes);
        const totalPages = originalPdf.getPageCount();
        // Filter valid pages only
        const validPages = pages.filter(p => p >= 0 && p < totalPages);
        if (validPages.length === 0)
            return null;
        // Create new PDF
        const newPdf = await pdf_lib_1.PDFDocument.create();
        const copiedPages = await newPdf.copyPages(originalPdf, validPages);
        for (const page of copiedPages) {
            newPdf.addPage(page);
        }
        copiedPages.forEach(page => newPdf.addPage(page));
        return await newPdf.save();
    }
}
exports.PdfService = PdfService;
exports.default = new PdfService();
