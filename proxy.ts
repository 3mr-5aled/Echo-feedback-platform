import { getLoggedInStatus } from '@/lib/AuthUtils';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
 
export function proxy(request: NextRequest) {
    const isDev = process.env.NODE_ENV === 'development';
    const url = request.nextUrl
    const pathname = url.pathname
    console.log(url) 
    const isLoggedIn = getLoggedInStatus();
    // if signed in redirect to dashboard
    if (isLoggedIn && !pathname.includes("/dashboard") && !isDev) {
        console.log("[isLoggedIn] Redirecting to Dashboard")
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

export const config = {
  matcher: [
  '/((?!api(?:/|$)|_next/static(?:/|$)|_next/image(?:/|$)|.*\\.[^/]+$).*)',
],
}