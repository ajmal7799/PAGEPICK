"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig = {
    port: process.env.PORT || 5000,
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: 50 * 1024 * 1024, // 50MB
};
exports.default = envConfig;
