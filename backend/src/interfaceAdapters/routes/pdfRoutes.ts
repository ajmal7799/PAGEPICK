import { Router } from 'express'
import pdfController from '../controller/pdfController'
import { upload } from '../middleware/upload.middleware' 

const router = Router()

// Upload PDF
router.post('/upload', upload.single('pdf'),
  (req, res) => pdfController.upload(req, res)
)

// Get PDF
router.get('/:fileId',
  (req, res) => pdfController.getPdf(req, res)
)

// Extract pages
router.post('/extract',
  (req, res) => pdfController.extractPages(req, res)
)

export default router