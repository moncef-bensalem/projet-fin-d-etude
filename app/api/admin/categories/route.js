import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

// Utiliser une instance PrismaClient globale pour éviter trop de connexions
const globalForPrisma = global;
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();
const prisma = globalForPrisma.prisma;

/**
 * Route pour récupérer toutes les catégories avec des informations détaillées pour l'administrateur
 * Inclut les informations sur les vendeurs et les produits associés à chaque catégorie
 */
export async function GET() {
  try {
    console.log('[ADMIN_CATEGORIES_GET] Vérification de l\'authentification admin...');
    
    const session = await getServerSession(authOptions);
    
    // En développement, on peut ignorer l'authentification pour faciliter les tests
    if (!session?.user || session.user.role !== 'ADMIN') {
      if (process.env.NODE_ENV === 'production') {
        console.log('[ADMIN_CATEGORIES_GET] Non autorisé: rôle administrateur requis');
        return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
      } else {
        console.log('[ADMIN_CATEGORIES_GET] Mode développement: autorisation ignorée');
      }
    }

    console.log('[ADMIN_CATEGORIES_GET] Récupération de toutes les catégories...');
    
    // Récupérer toutes les catégories avec les relations
    let rawCategories = [];
    try {
      rawCategories = await prisma.category.findMany({
        include: {
          store: true,
          products: {
            select: {
              id: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (dbError) {
      console.error('[ADMIN_CATEGORIES_GET] Erreur de base de données:', dbError);
      // En cas d'erreur de base de données, retourner des données de secours en développement
      if (process.env.NODE_ENV !== 'production') {
        rawCategories = [
          { id: 'fallback-1', name: 'Papeterie', description: 'Articles de papeterie', image: null, createdAt: new Date(), updatedAt: new Date(), products: [], store: null },
          { id: 'fallback-2', name: 'Livres', description: 'Livres et manuels', image: null, createdAt: new Date(), updatedAt: new Date(), products: [], store: null },
          { id: 'fallback-3', name: 'Fournitures', description: 'Fournitures de bureau', image: null, createdAt: new Date(), updatedAt: new Date(), products: [], store: null },
        ];
        console.log('[ADMIN_CATEGORIES_GET] Utilisation de données de secours en mode développement');
      } else {
        throw dbError; // En production, propager l'erreur
      }
    }
    
    // Transformer les catégories pour éviter les références circulaires
    const categories = rawCategories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      productsCount: category.products.length,
      store: category.store ? {
        id: category.store.id,
        name: category.store.name,
        logo: category.store.logo
      } : null
    }));

    console.log(`[ADMIN_CATEGORIES_GET] ${categories.length} catégories récupérées avec succès`);
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('[ADMIN_CATEGORIES_GET] Erreur:', error);
    return NextResponse.json(
      { 
        error: `Erreur lors de la récupération des catégories: ${error.message}`,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        name: error.name
      },
      { status: 500 }
    );
  }
}

/**
 * Route pour créer une nouvelle catégorie (admin uniquement)
 */
export async function POST(request) {
  try {
    console.log('[ADMIN_CATEGORIES_POST] Vérification de l\'authentification admin...');
    
    const session = await getServerSession(authOptions);
    
    // Vérifier si l'utilisateur est connecté et est un administrateur
    if (!session?.user || session.user.role !== 'ADMIN') {
      console.log('[ADMIN_CATEGORIES_POST] Non autorisé: rôle administrateur requis');
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const body = await request.json();
    console.log('[ADMIN_CATEGORIES_POST] Données reçues:', body);
    
    const { name, description, image, storeId } = body;
    
    if (!name || !description || !storeId) {
      console.log('[ADMIN_CATEGORIES_POST] Validation échouée: champs requis manquants');
      return NextResponse.json({ 
        error: 'Le nom, la description et l\'ID du magasin sont requis' 
      }, { status: 400 });
    }

    // Vérifier que le magasin existe
    const store = await prisma.store.findUnique({
      where: { id: storeId }
    });
    
    if (!store) {
      console.log(`[ADMIN_CATEGORIES_POST] Magasin avec l'ID ${storeId} non trouvé`);
      return NextResponse.json({ error: 'Magasin non trouvé' }, { status: 404 });
    }

    console.log('[ADMIN_CATEGORIES_POST] Création de la catégorie...');
    
    const category = await prisma.category.create({
      data: {
        name,
        description,
        image: image || null,
        storeId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    console.log('[ADMIN_CATEGORIES_POST] Catégorie créée avec succès:', category);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('[ADMIN_CATEGORIES_POST] Erreur:', error);
    
    // Gestion spécifique des erreurs Prisma
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'Une catégorie avec ce nom existe déjà dans ce magasin' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: `Erreur lors de la création de la catégorie: ${error.message}` 
    }, { status: 500 });
  }
}
