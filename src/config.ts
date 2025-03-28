// config.ts
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Export the Gemini API key explicitly
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment.");
}
