// src/app/api/ask/route.ts
import { NextResponse } from "next/server";
import { askChatBot } from "@/src/modules/chat/services/askChatBot";
import { modelAi } from "@/src/modules/chat/openrouter";

export async function POST() {
  const result = await askChatBot(modelAi);
  return NextResponse.json({ text: result });
}
