import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const customerRoutes = ['/account', '/appointments'];
  const techRoutes = ['/schedule', '/repairs'];

  const isCustomerRoute = customerRoutes.some((route) => pathname.startsWith(route));
  const isTechRoute = techRoutes.some((route) => pathname.startsWith(route));

  // Check for auth cookie (refresh token should be httpOnly cookie)
  const hasAuthCookie = request.cookies.has('refresh_token');

  // Redirect to login if accessing protected routes without auth
  if ((isCustomerRoute || isTechRoute) && !hasAuthCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
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
