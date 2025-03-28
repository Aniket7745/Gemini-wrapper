// streamGemini.ts
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { get } from "http";


// Load environment variables from .env
dotenv.config();

async function main() {
  // Initialize the Google Gen AI SDK with your API key
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const responseStream = await ai.models.generateContentStream({
    model: "gemini-2.0-flash-001",
    contents: getSystemPrompt() + BASE_PROMPT + "MAKE A TODO APPLICATION",
    config: {
      temperature: 0.5,
      maxOutputTokens: 1000,
      systemInstruction: getSystemPrompt()
      // stopSequences: ["\n"],
    }
  });

  // Iterate over each chunk as it arrives
  for await (const chunk of responseStream) {
    // Check if chunk.text is defined; if not, fallback to an empty string
    const text = chunk.text || "";
    process.stdout.write(text);
  }
}

main().catch((err) => {
  console.error("Error streaming content:", err);
});
