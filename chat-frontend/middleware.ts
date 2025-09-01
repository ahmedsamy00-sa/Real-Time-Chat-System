import { NextRequest, NextResponse } from 'next/server';


const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'chat_jwt';


export function middleware(req: NextRequest) {
const { pathname } = req.nextUrl;
const isProtected = pathname.startsWith('/inbox') || pathname.startsWith('/chat');
const hasToken = req.cookies.has(AUTH_COOKIE_NAME);


if (isProtected && !hasToken) {
const url = req.nextUrl.clone();
url.pathname = '/login';
return NextResponse.redirect(url);
}


if ((pathname === '/login' || pathname === '/register') && hasToken) {
const url = req.nextUrl.clone();
url.pathname = '/inbox';
return NextResponse.redirect(url);
}


return NextResponse.next();
}


export const config = {
matcher: ['/inbox/:path*', '/chat/:path*', '/login', '/register'],
};