// my-next-app/app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  return NextResponse.json({ message: "Hello from Next.js 14 with Webpack!" });
}
