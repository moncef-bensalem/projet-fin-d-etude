'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

const AuthContext = createContext({
  user: null,
  store: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  setUser: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'état de l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const session = await response.json();
        if (session?.user) {
          setUser(session.user);
          setStore(session.user.store);
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Récupérer les informations de l'utilisateur
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const session = await response.json();
        if (session?.user) {
          setUser(session.user);
          setStore(session.user.store);
          
          toast.success('Connexion réussie');
          
          // Définir le chemin de redirection en fonction du rôle
          let redirectPath = '/';
          try {
            switch (session.user.role) {
              case 'ADMIN':
                redirectPath = '/dashboard';
                break;
              case 'MANAGER':
                redirectPath = '/manager/dashboard';
                break;
              case 'SELLER':
                redirectPath = '/seller/dashboard';
                break;
              case 'CUSTOMER':
                redirectPath = '/';
                break;
              default:
                redirectPath = '/';
                break;
            }
            
            // Utiliser setTimeout pour laisser le temps à la session d'être complètement établie
            setTimeout(() => {
              // Utiliser window.location pour une redirection côté client plus fiable
              window.location.href = redirectPath;
            }, 100);
            
            return;
          } catch (redirectError) {
            console.error('Redirect error:', redirectError);
            // Fallback en cas d'erreur de redirection
            setTimeout(() => {
              window.location.href = '/';
            }, 100);
          }
        }
      }
      
      // Si on arrive ici, c'est qu'on n'a pas pu obtenir les infos de l'utilisateur
      toast.success('Connexion réussie');
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      setUser(null);
      setStore(null);
      router.push('/');
      router.refresh();
      toast.success('Déconnexion réussie');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <AuthContext.Provider value={{ user, store, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}