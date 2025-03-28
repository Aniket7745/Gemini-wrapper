"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// streamGemini.ts
const genai_1 = require("@google/genai");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prompts_1 = require("./prompts");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in .env file");
    process.exit(1);
}
const ai = new genai_1.GoogleGenAI({ apiKey });
app.post("/generate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const userPrompt = req.body.prompt;
        if (!userPrompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }
        const responseStream = yield ai.models.generateContentStream({
            model: "gemini-2.0-flash-001",
            contents: (0, prompts_1.getSystemPrompt)() + prompts_1.BASE_PROMPT + userPrompt,
            config: {
                temperature: 0.5,
                maxOutputTokens: 1000,
                systemInstruction: (0, prompts_1.getSystemPrompt)(),
            },
        });
        let fullText = "";
        try {
            for (var _d = true, responseStream_1 = __asyncValues(responseStream), responseStream_1_1; responseStream_1_1 = yield responseStream_1.next(), _a = responseStream_1_1.done, !_a; _d = true) {
                _c = responseStream_1_1.value;
                _d = false;
                const chunk = _c;
                const text = chunk.text || "";
                fullText += text;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = responseStream_1.return)) yield _b.call(responseStream_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res.json({ result: fullText });
    }
    catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content" });
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
