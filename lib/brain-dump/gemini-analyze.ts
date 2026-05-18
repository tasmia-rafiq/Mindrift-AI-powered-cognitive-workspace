import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  brainDumpJsonInstruction,
  brainDumpSystemPrompt,
} from "./groq-prompt";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!,
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",

});

export async function analyzeWithGemini(
  rawText: string,
  unfinishedTasks: any[],
) {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
${brainDumpSystemPrompt}

${brainDumpJsonInstruction}

New Mind Unload:
${rawText}

Previous unfinished tasks:
${JSON.stringify(unfinishedTasks ?? [], null, 2)}
`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
    },
  });

  const content = result.response.text();

  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}