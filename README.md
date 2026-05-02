# 📄 SlicePDF — PDF Page Extractor

> A full-stack web application that allows users to upload a PDF, visually preview all pages, select specific pages, and download a new PDF containing only the selected pages.

---

## 🖥️ Live Demo

🔗 [Coming Soon](#)

---

## 📸 Screenshots

> _(Add screenshots of your app here)_

| Upload Screen | Page Preview | Download |
|---|---|---|
| ![Upload](screenshots/upload.png) | ![Preview](screenshots/preview.png) | ![Download](screenshots/download.png) |

---

## ✨ Features

- 📤 Upload any PDF file (up to 50MB)
- 🖼️ Visual thumbnail preview of all PDF pages
- ☑️ Select/deselect individual pages or all pages
- 🔄 Drag and drop to reorder selected pages
- 📥 Download a new PDF with only selected pages
- 📱 Fully responsive — works on mobile and desktop
- ⚠️ Error handling for invalid files and failed operations

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS v3 | Styling |
| react-pdf + pdfjs-dist | PDF page rendering |
| @dnd-kit | Drag and drop reordering |
| Axios | API calls |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| TypeScript | Type safety |
| multer | File upload handling |
| pdf-lib | PDF extraction & creation |
| cors | Cross-origin requests |
| dotenv | Environment variables |

---

## 📁 Project Structure

```
slicepdf/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.config.ts
│   │   │   └── multer.config.ts
│   │   ├── controllers/
│   │   │   └── pdf.controller.ts
│   │   ├── middlewares/
│   │   │   └── error.middleware.ts
│   │   ├── routes/
│   │   │   └── pdf.routes.ts
│   │   ├── services/
│   │   │   └── pdf.service.ts
│   │   ├── types/
│   │   │   └── pdf.types.ts
│   │   ├── utils/
│   │   │   └── file.utils.ts
│   │   └── index.ts
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── Button.tsx
    │   │   │   ├── Spinner.tsx
    │   │   │   └── ErrorMessage.tsx
    │   │   └── pdf/
    │   │       ├── UploadZone.tsx
    │   │       ├── PageGrid.tsx
    │   │       └── PageCard.tsx
    │   ├── hooks/
    │   │   └── usePdf.ts
    │   ├── pages/
    │   │   └── Home.tsx
    │   ├── services/
    │   │   └── pdf.service.ts
    │   ├── types/
    │   │   └── pdf.types.ts
    │   ├── utils/
    │   │   └── file.utils.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
```

---

## ⚙️ Prerequisites

Make sure you have these installed before running the project:

| Tool | Version | Check Command |
|---|---|---|
| Node.js | v18 or higher | `node -v` |
| npm | v9 or higher | `npm -v` |
| Git | Latest | `git --version` |

---

## 🚀 How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/slicepdf.git
cd slicepdf
```

---

### 2️⃣ Setup Backend

```bash
# Go to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Open `.env` and set:
```env
PORT=5000
UPLOAD_DIR=uploads
```

```bash
# Start backend development server
npm run dev
```

✅ Backend runs on: **http://localhost:5000**

---

### 3️⃣ Setup Frontend

Open a **new terminal** and run:

```bash
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Open `.env` and set:
```env
VITE_API_URL=http://localhost:5000
```

```bash
# Start frontend development server
npm run dev
```

✅ Frontend runs on: **http://localhost:3000**

---

### 4️⃣ Open the App

Open your browser and go to:
```
http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/pdf/upload` | Upload a PDF file |
| `GET` | `/api/pdf/:fileId` | Retrieve a PDF file |
| `POST` | `/api/pdf/extract` | Extract selected pages |

### POST `/api/pdf/upload`
```json
// Request (form-data)
{ "pdf": "<file>" }

// Response
{
  "message": "File uploaded successfully",
  "fileId": "1234567890-myfile.pdf",
  "originalName": "myfile.pdf",
  "size": 204800
}
```

### POST `/api/pdf/extract`
```json
// Request (JSON)
{
  "fileId": "1234567890-myfile.pdf",
  "pages": [0, 2, 4]
}

// Response
// Returns new PDF file as download
```

---

## 🧑‍💻 Available Scripts

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## ⚠️ Error Handling

| Situation | Error Message |
|---|---|
| Non-PDF file uploaded | `Only PDF files are allowed` |
| File too large (>50MB) | `File size exceeds 50MB limit` |
| File not found | `File not found` |
| No pages selected | Button disabled |
| Extraction fails | `Failed to create PDF. Please try again.` |

---

## 🌐 Environment Variables

### Backend `.env`
```env
PORT=5000
UPLOAD_DIR=uploads
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000
```

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com)

---

## 📝 License

This project is licensed under the MIT License.