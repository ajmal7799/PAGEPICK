import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import pdfRoutes from './interfaceAdapters/routes/pdfRoutes'
import { errorMiddleware } from './interfaceAdapters/middleware/error.middleware' 
import envConfig from './config/env.config'

dotenv.config()

const app = express()

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    "https://pagepick.vercel.app"
  ],
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.json())

// Serve uploaded files statically
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
)

// Routes
app.use('/api/pdf', pdfRoutes)

// Error middleware (always last)
app.use(errorMiddleware)

// Health check
app.get('/', (req, res) => {
  res.json({ message: '✅ SlicePDF Backend Running' })
})

app.listen(envConfig.port, () => {
  console.log(`✅ Server running on http://localhost:${envConfig.port}`)
})