"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEMINI_API_KEY = void 0;
// config.ts
const dotenv_1 = require("dotenv");
// Load environment variables from .env file
(0, dotenv_1.config)();
// Export the Gemini API key explicitly
exports.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!exports.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the environment.");
}
