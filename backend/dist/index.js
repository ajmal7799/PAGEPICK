"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const pdfRoutes_1 = __importDefault(require("./interfaceAdapters/routes/pdfRoutes"));
const error_middleware_1 = require("./interfaceAdapters/middleware/error.middleware");
const env_config_1 = __importDefault(require("./config/env.config"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve uploaded files statically
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/api/pdf', pdfRoutes_1.default);
// Error middleware (always last)
app.use(error_middleware_1.errorMiddleware);
// Health check
app.get('/', (req, res) => {
    res.json({ message: '✅ SlicePDF Backend Running' });
});
app.listen(env_config_1.default.port, () => {
    console.log(`✅ Server running on http://localhost:${env_config_1.default.port}`);
});
