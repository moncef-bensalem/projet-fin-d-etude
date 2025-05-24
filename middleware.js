import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    
    // Fonction simplifiée pour créer des URLs de redirection
    const createRedirectUrl = (path) => {
      // Créer une nouvelle URL en utilisant la méthode la plus simple possible
      const url = new URL(req.nextUrl);
      url.pathname = path;
      return url;
    };

    // Fonction pour obtenir le chemin du dashboard en fonction du rôle
    const getDashboardPath = (role) => {
      console.log(`[MIDDLEWARE] Redirecting user with role: ${role}`);
      switch(role) {
        case 'ADMIN':
          return '/dashboard';
        case 'MANAGER':
          return '/manager/dashboard';
        case 'SELLER':
          return '/seller/dashboard';
        case 'CUSTOMER':
          return '/';
        default:
          return '/';
      }
    };

    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    // et essaie d'accéder au dashboard
    if (!token && (pathname.startsWith("/(back-office)/dashboard") || 
                  pathname.startsWith("/dashboard") || 
                  pathname.startsWith("/manager/dashboard") || 
                  pathname.startsWith("/seller/dashboard"))) {
      console.log('[MIDDLEWARE] Unauthenticated user trying to access dashboard');
      const url = createRedirectUrl("/login");
      return NextResponse.redirect(url);
    }

    // Rediriger vers le dashboard si l'utilisateur est connecté
    // et essaie d'accéder à la page de connexion ou d'inscription
    if (token && (pathname === "/login" || pathname.startsWith("/register"))) {
      console.log(`[MIDDLEWARE] Authenticated user with role ${token.role} trying to access login/register`);
      const redirectPath = getDashboardPath(token.role);
      const url = createRedirectUrl(redirectPath);
      return NextResponse.redirect(url);
    }

    // Protéger les routes du dashboard admin pour les non-admins
    if (pathname.startsWith("/dashboard") && (!token || token.role !== 'ADMIN')) {
      if (!token) {
        console.log('[MIDDLEWARE] Unauthenticated user trying to access admin dashboard');
        const url = createRedirectUrl("/login");
        return NextResponse.redirect(url);
      } else {
        console.log(`[MIDDLEWARE] User with role ${token.role} trying to access admin dashboard`);
        const redirectPath = getDashboardPath(token.role);
        const url = createRedirectUrl(redirectPath);
        return NextResponse.redirect(url);
      }
    }

    // Protéger les routes du manager uniquement pour les managers
    if (pathname.startsWith("/manager/") && (!token || token.role !== 'MANAGER')) {
      if (!token) {
        console.log('[MIDDLEWARE] Unauthenticated user trying to access manager dashboard');
        const url = createRedirectUrl("/login");
        return NextResponse.redirect(url);
      } else {
        console.log(`[MIDDLEWARE] User with role ${token.role} trying to access manager dashboard`);
        const redirectPath = getDashboardPath(token.role);
        const url = createRedirectUrl(redirectPath);
        return NextResponse.redirect(url);
      }
    }
    
    // Protéger les routes du seller uniquement pour les sellers
    if (pathname.startsWith("/seller/") && (!token || token.role !== 'SELLER')) {
      if (!token) {
        console.log('[MIDDLEWARE] Unauthenticated user trying to access seller dashboard');
        const url = createRedirectUrl("/login");
        return NextResponse.redirect(url);
      } else {
        console.log(`[MIDDLEWARE] User with role ${token.role} trying to access seller dashboard`);
        const redirectPath = getDashboardPath(token.role);
        const url = createRedirectUrl(redirectPath);
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Autoriser l'accès aux pages publiques
        if (pathname === "/login" || pathname.startsWith("/register")) {
          return true;
        }

        // Protéger les routes du dashboard
        if (pathname.startsWith("/(back-office)/dashboard")) {
          return !!token;
        }

        // Protéger les routes du manager
        if (pathname.startsWith("/manager/")) {
          return !!token && token.role === 'MANAGER';
        }

        // Autoriser l'accès aux autres pages
        return true;
      },
    },
  }
);

// Protéger toutes les routes du dashboard et gérer les pages d'authentification
export const config = {
  matcher: [
    "/(back-office)/dashboard/:path*",
    "/dashboard/:path*",
    "/manager/:path*",
    "/seller/:path*",
    "/login",
    "/register/:path*"
  ]
}; 