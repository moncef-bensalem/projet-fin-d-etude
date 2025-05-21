import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { serializeBigInt } from "@/lib/utils/serialize";

// Utiliser une instance PrismaClient globale pour éviter trop de connexions
const globalForPrisma = global;
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();
const prisma = globalForPrisma.prisma;

export async function GET(request) {
  try {
    console.log('[LISTES_SCOLAIRES_GET] Démarrage de la requête pour les listes scolaires publiées');
    
    // Cette API est publique, pas besoin d'authentification

    try {
      // Récupérer toutes les listes scolaires publiées
      const listes = await prisma.listeScolaire.findMany({
        where: {
          statut: "PUBLIEE"
        },
        include: {
          besoins: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      
      console.log(`[LISTES_SCOLAIRES_GET] ${listes.length} listes scolaires récupérées avec succès`);
      return NextResponse.json(serializeBigInt(listes));
    } catch (dbError) {
      console.error('[LISTES_SCOLAIRES_GET] Erreur de base de données:', dbError);
      
      // En développement, retourner un tableau vide plutôt qu'une erreur
      if (process.env.NODE_ENV !== 'production') {
        console.log('[LISTES_SCOLAIRES_GET] Mode développement: retour d\'un tableau vide');
        return NextResponse.json([]);
      }
      
      throw dbError; // Propager l'erreur pour le bloc catch principal en production
    }
  } catch (error) {
    console.error("[LISTES_SCOLAIRES_GET] Erreur lors de la récupération des listes scolaires:", error);
    console.error("[LISTES_SCOLAIRES_GET] Stack trace:", error.stack);
    
    // Retourner un tableau vide plutôt qu'une erreur pour éviter de bloquer l'interface utilisateur
    return NextResponse.json(
      [],
      { status: 200 }
    );
  }
}
