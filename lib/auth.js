import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Use Prisma as a singleton to avoid connection issues
const globalForPrisma = global;
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();
const prisma = globalForPrisma.prisma;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "CUSTOMER" // Définir le rôle par défaut pour les utilisateurs Google
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("Utilisateur non trouvé");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          // Vérifier si l'utilisateur existe déjà
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email }
          });
          
          // Si l'utilisateur n'existe pas, le créer
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: profile.email,
                name: profile.name,
                image: profile.picture,
                role: "CUSTOMER",
                // Mot de passe aléatoire pour les utilisateurs Google
                password: await bcrypt.hash(Math.random().toString(36).slice(-10), 10)
              }
            });
          }
          return true;
        } catch (error) {
          console.error("Erreur lors de la création de l'utilisateur Google:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // Si l'utilisateur vient de se connecter
      if (user) {
        token.role = user.role;
        token.id = user.id;
      } 
      // Si l'utilisateur existe déjà en base de données mais se connecte via Google
      else if (account?.provider === "google" && profile?.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: profile.email }
          });
          
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser.id;
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur Google:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};

export const { auth, signIn, signOut } = NextAuth(authOptions);

/**
 * Get the current user from a user ID
 * @param {string} userId - The user ID to get
 * @returns {Promise<Object|null>} The user object or null if not found
 */
export async function getCurrentUser(userId) {
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    });

    return user;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
} 