import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { description, event_url } = await req.json();

  if (!description && !event_url) {
    return NextResponse.json({ vendor_type: "both" });
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 64,
      messages: [
        {
          role: "user",
          content: `以下のイベント情報から出店タイプを判定してください。

説明: ${description || "(なし)"}
イベントURL: ${event_url || "(なし)"}

以下の3つのうち1つだけ選び、JSONのみ返してください：
- "kitchen_car" : キッチンカー・フードトラック専用
- "tent" : テント・マルシェ・ハンドメイド系出店専用
- "both" : キッチンカーとテント出店の両方を受け付ける

{"vendor_type": "kitchen_car" または "tent" または "both"}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const match = text.match(/"vendor_type"\s*:\s*"(kitchen_car|tent|both)"/);
    const vendor_type = match ? match[1] : "both";

    return NextResponse.json({ vendor_type });
  } catch (e) {
    console.error("AI detect error:", e);
    return NextResponse.json({ vendor_type: "both" });
  }
}
