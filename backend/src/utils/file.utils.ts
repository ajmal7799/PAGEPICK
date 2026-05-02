import fs from 'fs'
import path from 'path'

// Check if file exists
export const fileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath)
}

// Get full file path
export const getFilePath = (
  uploadDir: string,
  fileId: string
): string => {
  return path.join(__dirname, '../../', uploadDir, fileId)
}

// Read file as buffer
export const readFileAsBuffer = (filePath: string): Buffer => {
  return fs.readFileSync(filePath)
}