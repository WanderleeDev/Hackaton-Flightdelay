import { getEnv } from "@/src/utils/getEnv";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: getEnv("OPEN_ROUTER_API_KEY"),
});

export const modelAi = openrouter.chat("qwen/qwen3-coder:free");
