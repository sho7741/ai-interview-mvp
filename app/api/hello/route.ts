// 不要なら削除:
import { NextResponse } from 'next/server'; // NextRequest は消す

export async function GET() {
  return NextResponse.json({ message: "Hello from Next.js API Route!" });
}
