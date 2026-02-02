import { LanguageModel, streamText } from "ai";

const prompt = "Take a bad joke";

export async function askChatBot(model: LanguageModel) {
  const { textStream } = await streamText({
    model,
    prompt,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
}
