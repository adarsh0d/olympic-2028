// apps/web/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl

  if (url.pathname.startsWith('/medals')) {
    return NextResponse.rewrite(`http://localhost:3000${url.pathname}`)
  }

  if (url.pathname.startsWith('/marketing')) {
    return NextResponse.rewrite(`http://localhost:3002${url.pathname}`)
  }

  return NextResponse.next()
}
