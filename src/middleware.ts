import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const isBlocked = request.cookies.get('blk_status')?.value;
    if (isBlocked === 'true') {
      return new NextResponse('Acesso vedado por comportamento suspeito.', { status: 403 });
    }
    const accessCount = Number(request.cookies.get('access_sentinel')?.value || 0);
    const response = NextResponse.next();

    if (accessCount >= 20) {
      response.cookies.set({
        name: 'blk_status',
        value: 'true',
        httpOnly: true,
        secure: true,
        maxAge: 86400, 
        path: '/',
      });

      response.cookies.delete('access_sentinel');

      return new NextResponse('Limite de acessos atingido. Tente amanhã.', { status: 429 });
    }

    response.cookies.set({
      name: 'access_sentinel',
      value: String(accessCount + 1),
      httpOnly: true,
      maxAge: 60,
      path: '/',
    });

    return response;
  }

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  response.headers.set('Retry-After', '60')

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ",
        "img-src 'self' data: https:",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' ",
        "frame-src 'self' ",
        "frame-ancestors 'none'",
      ].join('; ')
    )
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
