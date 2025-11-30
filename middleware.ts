import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware simplificado - ConvieneONo no requiere autenticación
// Todas las calculadoras son públicas y de acceso libre
export function middleware(request: NextRequest) {
  // Por ahora solo pasamos las requests sin modificar
  // En el futuro podríamos agregar analytics, rate limiting, etc.
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

