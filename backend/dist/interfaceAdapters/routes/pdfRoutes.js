"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pdfController_1 = __importDefault(require("../controller/pdfController"));
const upload_middleware_1 = require("../middleware/upload.middleware");
const router = (0, express_1.Router)();
// Upload PDF
router.post('/upload', upload_middleware_1.upload.single('pdf'), (req, res) => pdfController_1.default.upload(req, res));
// Get PDF
router.get('/:fileId', (req, res) => pdfController_1.default.getPdf(req, res));
// Extract pages
router.post('/extract', (req, res) => pdfController_1.default.extractPages(req, res));
exports.default = router;
