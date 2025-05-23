import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    
    // Fonction sécurisée pour créer des URLs de redirection
    const createRedirectUrl = (path) => {
      try {
        // Utiliser l'origine de nextUrl qui est toujours définie
        return new URL(path, req.nextUrl.origin);
      } catch (error) {
        console.error(`[MIDDLEWARE] Error creating URL: ${error.message}`);
        // Fallback avec l'URL de base du site
        return new URL(path, process.env.NEXTAUTH_URL || 'https://penventory-psi.vercel.app');
      }
    };

    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    // et essaie d'accéder au dashboard
    if (!token && (pathname.startsWith("/(back-office)/dashboard") || pathname.startsWith("/dashboard") || pathname.startsWith("/manager/dashboard") || pathname.startsWith("/seller/dashboard"))) {
      return NextResponse.redirect(createRedirectUrl("/login"));
    }

    // Rediriger vers le dashboard si l'utilisateur est connecté
    // et essaie d'accéder à la page de connexion ou d'inscription
    if (token && (pathname === "/login" || pathname.startsWith("/register"))) {
      // Rediriger en fonction du rôle
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(createRedirectUrl("/dashboard"));
      } else if (token.role === 'SELLER') {
        return NextResponse.redirect(createRedirectUrl("/seller/dashboard"));
      } else if (token.role === 'MANAGER') {
        return NextResponse.redirect(createRedirectUrl("/manager/dashboard"));
      } else if (token.role === 'CUSTOMER') {
        return NextResponse.redirect(createRedirectUrl("/"));
      } else {
        return NextResponse.redirect(createRedirectUrl("/dashboard"));
      }
    }

    // Protéger les routes du manager uniquement pour les managers
    if (pathname.startsWith("/manager/") && (!token || token.role !== 'MANAGER')) {
      if (!token) {
        return NextResponse.redirect(createRedirectUrl("/login"));
      } else {
        // Rediriger vers le dashboard approprié selon le rôle
        if (token.role === 'ADMIN') {
          return NextResponse.redirect(createRedirectUrl("/dashboard"));
        } else if (token.role === 'SELLER') {
          return NextResponse.redirect(createRedirectUrl("/seller/dashboard"));
        } else {
          return NextResponse.redirect(createRedirectUrl("/"));
        }
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