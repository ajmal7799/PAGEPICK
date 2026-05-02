"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileAsBuffer = exports.getFilePath = exports.fileExists = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Check if file exists
const fileExists = (filePath) => {
    return fs_1.default.existsSync(filePath);
};
exports.fileExists = fileExists;
// Get full file path
const getFilePath = (uploadDir, fileId) => {
    return path_1.default.join(__dirname, '../../', uploadDir, fileId);
};
exports.getFilePath = getFilePath;
// Read file as buffer
const readFileAsBuffer = (filePath) => {
    return fs_1.default.readFileSync(filePath);
};
exports.readFileAsBuffer = readFileAsBuffer;
