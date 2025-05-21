import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

// Utiliser une instance PrismaClient globale pour éviter trop de connexions
const globalForPrisma = global;
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();
const prisma = globalForPrisma.prisma;

export async function GET(request) {
  try {
    console.log('[REDIRECT_BY_ROLE] Démarrage de la redirection par rôle');
    
    // Récupérer le paramètre role de l'URL si présent
    const url = new URL(request.url);
    const requestedRole = url.searchParams.get("role");
    console.log(`[REDIRECT_BY_ROLE] Rôle demandé: ${requestedRole || 'aucun'}`);
    
    // Récupérer la session de l'utilisateur
    let session;
    try {
      session = await getServerSession(authOptions);
      console.log(`[REDIRECT_BY_ROLE] Session récupérée: ${session ? 'OK' : 'NULL'}`);
    } catch (sessionError) {
      console.error('[REDIRECT_BY_ROLE] Erreur lors de la récupération de la session:', sessionError);
      return NextResponse.redirect(new URL('/login?error=session', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }
    
    // Vérifier si l'utilisateur est connecté
    if (!session?.user) {
      console.log('[REDIRECT_BY_ROLE] Utilisateur non connecté, redirection vers login');
      return NextResponse.redirect(new URL('/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }
    
    console.log(`[REDIRECT_BY_ROLE] Utilisateur connecté: ${session.user.email}, rôle: ${session.user.role || 'non défini'}`);
    
    // Si on a un paramètre role et que c'est une nouvelle inscription via Google,
    // mettre à jour le rôle de l'utilisateur si nécessaire
    if (requestedRole && ["CUSTOMER", "SELLER"].includes(requestedRole)) {
      try {
        console.log(`[REDIRECT_BY_ROLE] Tentative de mise à jour du rôle vers: ${requestedRole}`);
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
        });
        
        if (!user) {
          console.error(`[REDIRECT_BY_ROLE] Utilisateur non trouvé en base de données: ${session.user.id}`);
          // Continuer avec la session actuelle sans mise à jour
        } else {
          // Si c'est une authentification récente (moins de 30 secondes)
          const isRecentAuth = user.updatedAt && 
            (new Date().getTime() - new Date(user.updatedAt).getTime()) < 30000;
          
          // Si le rôle demandé est différent du rôle actuel et que c'est une authentification récente,
          // mettre à jour le rôle
          if (isRecentAuth && user.role !== requestedRole) {
            console.log(`[REDIRECT_BY_ROLE] Mise à jour du rôle de ${user.role} vers ${requestedRole}`);
            await prisma.user.update({
              where: { id: user.id },
              data: { role: requestedRole }
            });
            
            // Si le nouveau rôle est SELLER et qu'il n'a pas de boutique, en créer une
            if (requestedRole === "SELLER") {
              try {
                const storeExists = await prisma.store.findUnique({
                  where: { ownerId: user.id }
                });
                
                if (!storeExists) {
                  console.log(`[REDIRECT_BY_ROLE] Création d'une boutique pour: ${user.name}`);
                  await prisma.store.create({
                    data: {
                      name: `${user.name}'s Store`,
                      description: "Description de la boutique",
                      ownerId: user.id,
                    },
                  });
                }
              } catch (storeError) {
                console.error('[REDIRECT_BY_ROLE] Erreur lors de la création de la boutique:', storeError);
                // Continuer sans créer de boutique
              }
            }
            
            // Mettre à jour la session
            session.user.role = requestedRole;
            console.log(`[REDIRECT_BY_ROLE] Session mise à jour avec le rôle: ${session.user.role}`);
          }
        }
      } catch (roleUpdateError) {
        console.error('[REDIRECT_BY_ROLE] Erreur lors de la mise à jour du rôle:', roleUpdateError);
        // Continuer avec la session actuelle sans mise à jour
      }
    }
    
    // Rediriger en fonction du rôle
    const role = session.user.role;
    console.log(`[REDIRECT_BY_ROLE] Redirection basée sur le rôle: ${role}`);
    
    // Utiliser l'URL de la requête comme base pour la redirection
    const origin = request.headers.get('origin') || request.headers.get('host') || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;
    
    console.log(`[REDIRECT_BY_ROLE] URL de base pour la redirection: ${baseUrl}`);
    
    if (role === "CUSTOMER") {
      console.log('[REDIRECT_BY_ROLE] Redirection vers la page d\'accueil (CUSTOMER)');
      return NextResponse.redirect(new URL('/', baseUrl));
    } else if (role === "SELLER") {
      console.log('[REDIRECT_BY_ROLE] Redirection vers le tableau de bord vendeur');
      return NextResponse.redirect(new URL('/seller/dashboard', baseUrl));
    } else if (role === "MANAGER") {
      console.log('[REDIRECT_BY_ROLE] Redirection vers le tableau de bord manager');
      return NextResponse.redirect(new URL('/manager/dashboard', baseUrl));
    } else if (role === "ADMIN") {
      console.log('[REDIRECT_BY_ROLE] Redirection vers le tableau de bord admin');
      return NextResponse.redirect(new URL('/dashboard', baseUrl));
    } else {
      console.log(`[REDIRECT_BY_ROLE] Rôle non reconnu: ${role}, redirection vers le tableau de bord par défaut`);
      return NextResponse.redirect(new URL('/dashboard', baseUrl));
    }
  } catch (error) {
    console.error('[REDIRECT_BY_ROLE] Erreur lors de la redirection:', error);
    console.error('[REDIRECT_BY_ROLE] Stack trace:', error.stack);
    
    // En cas d'erreur, rediriger vers la page de connexion avec un paramètre d'erreur
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent('redirect_error')}`, baseUrl));
  }
}
