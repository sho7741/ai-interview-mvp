import { NextRequest, NextResponse } from "next/server";
// もし openai v4 なら:
import openaiPackage from "openai"; 
const { OpenAI } = openaiPackage;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 使わないなら引数削除
export async function GET() {
  return NextResponse.json({
    message: "Use POST with { userAnswer } to get a question"
  });
}

// ここでPOST実装。使うなら _req -> req にし、実際に呼ぶ
export async function POST(req: NextRequest) {
  // ここで userAnswer を取得
  const { userAnswer } = await req.json();

  // ChatGPT呼び出し
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "あなたは面接官です..." },
      { role: "user", content: userAnswer }
    ],
    max_tokens: 100
  });

  const question = response.choices[0].message.content;
  return NextResponse.json({ question: question.trim() });
}
