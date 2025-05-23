import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    // et essaie d'accéder au dashboard
    if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/manager/dashboard") || pathname.startsWith("/seller/dashboard"))) {
      console.log(`[MIDDLEWARE] Redirection vers login: ${pathname}`);
      
      // Fonction pour créer une URL sécurisée pour la redirection
      const createRedirectUrl = (path) => {
        // Utiliser la base URL de la requête pour garantir le même domaine
        const baseUrl = new URL(req.url).origin;
        const url = new URL(path, baseUrl);
        
        // Toujours utiliser HTTPS en production
        url.protocol = 'https:';
        
        console.log(`[MIDDLEWARE] URL de redirection: ${url.toString()}`);
        return url;
      };
      
      return NextResponse.redirect(createRedirectUrl('/login'));
    }

    // Rediriger vers le dashboard si l'utilisateur est connecté
    // et essaie d'accéder à la page de connexion ou d'inscription
    if (token && (pathname === "/login" || pathname.startsWith("/register"))) {
      console.log(`[MIDDLEWARE] Redirection depuis login/register vers dashboard, rôle: ${token.role}`);
      
      // Fonction pour créer une URL sécurisée pour la redirection
      const createRedirectUrl = (path) => {
        const baseUrl = new URL(req.url).origin;
        const url = new URL(path, baseUrl);
        
        // Toujours utiliser HTTPS en production
        url.protocol = 'https:';
        
        console.log(`[MIDDLEWARE] URL de redirection: ${url.toString()}`);
        return url;
      };
      
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
      console.log(`[MIDDLEWARE] Accès non autorisé à ${pathname}, rôle: ${token?.role || 'non connecté'}`);
      
      // Fonction pour créer une URL sécurisée pour la redirection
      const createRedirectUrl = (path) => {
        const baseUrl = new URL(req.url).origin;
        const url = new URL(path, baseUrl);
        
        // Toujours utiliser HTTPS en production
        url.protocol = 'https:';
        
        console.log(`[MIDDLEWARE] URL de redirection: ${url.toString()}`);
        return url;
      };
      
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
        console.log(`[MIDDLEWARE:AUTHORIZED] Vérification d'accès pour: ${pathname}, token: ${!!token}`);

        // Autoriser l'accès aux pages publiques
        if (pathname === "/login" || pathname.startsWith("/register")) {
          return true;
        }

        // Protéger les routes du dashboard admin
        if (pathname.startsWith("/dashboard")) {
          const hasAccess = !!token && token.role === 'ADMIN';
          console.log(`[MIDDLEWARE:AUTHORIZED] Accès dashboard admin: ${hasAccess}`);
          return hasAccess;
        }

        // Protéger les routes du manager
        if (pathname.startsWith("/manager/")) {
          const hasAccess = !!token && token.role === 'MANAGER';
          console.log(`[MIDDLEWARE:AUTHORIZED] Accès manager: ${hasAccess}`);
          return hasAccess;
        }

        // Protéger les routes du vendeur
        if (pathname.startsWith("/seller/")) {
          const hasAccess = !!token && token.role === 'SELLER';
          console.log(`[MIDDLEWARE:AUTHORIZED] Accès vendeur: ${hasAccess}`);
          return hasAccess;
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
    "/dashboard/:path*",
    "/manager/:path*",
    "/seller/:path*",
    "/login",
    "/register/:path*"
  ]
};
