import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const { pathname } = request.nextUrl;

  // Aplicar apenas na rota raiz /
  if (pathname === '/') {

    // 1. Verificar se já existe o cookie de bloqueio definitivo
    const isBlocked = request.cookies.get('blk_status')?.value;
    if (isBlocked === 'true') {
      return new NextResponse('Acesso vedado por comportamento suspeito.', { status: 403 });
    }

    // 2. Lógica de contagem de acessos via cookie temporário
    const accessCount = Number(request.cookies.get('access_sentinel')?.value || 0);
    const response = NextResponse.next();

    if (accessCount >= 20) {
      // 3. SE excedeu o limite, selamos o destino dele com um HttpOnly de 24h
      response.cookies.set({
        name: 'blk_status',
        value: 'true',
        httpOnly: true, // O usuário não consegue deletar via JS (console)
        secure: true,
        maxAge: 86400, // 24 horas em segundos
        path: '/',
      });

      // Remove o contador temporário
      response.cookies.delete('access_sentinel');

      return new NextResponse('Limite de acessos atingido. Tente amanhã.', { status: 429 });
    }

    // 4. Caso contrário, incrementamos o contador
    response.cookies.set({
      name: 'access_sentinel',
      value: String(accessCount + 1),
      httpOnly: true,
      maxAge: 60, // O contador reseta se ele ficar 1 minuto sem atualizar a página
      path: '/',
    });

    return response;
  }

  // Headers de segurança
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  response.headers.set('Retry-After', '60')
  // Content Security Policy (ajuste conforme necessário)
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
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
