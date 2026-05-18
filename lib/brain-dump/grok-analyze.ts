import Groq from "groq-sdk";
import {
  brainDumpJsonInstruction,
  brainDumpSystemPrompt,
} from "./groq-prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeWithGroq(
  rawText: string,
  unfinishedTasks: any[],
) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: brainDumpSystemPrompt,
      },
      {
        role: "user",
        content: `
${brainDumpJsonInstruction}

New Mind Unload:
${rawText}

Previous unfinished tasks:
${JSON.stringify(unfinishedTasks ?? [], null, 2)}
`,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response from Groq");
  }

  return JSON.parse(content);
}