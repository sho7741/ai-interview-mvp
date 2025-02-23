import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // .env.local で管理
});

export async function POST(_req: NextRequest) {
  try {
    const { userAnswer } = await req.json();

    // v4系では ChatGPT呼び出しはこう書く
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "あなたは面接官です..." },
        { role: "user", content: userAnswer }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    // 応答メッセージを取得
    const aiQuestion = completion.choices[0].message.content;
    return NextResponse.json({ question: aiQuestion.trim() });
  } catch (error) {
    console.error("ChatGPT error:", error);
    return NextResponse.json({ error: "ChatGPT API error" }, { status: 500 });
  }
}

export async function GET(_req: NextRequest) {
  return NextResponse.json({
    message: "Use POST with { userAnswer }"
  });
}
