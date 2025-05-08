'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { ShoppingCart, User, Search, Menu, X, Heart, LogIn, LogOut } from 'lucide-react';

export default function StoreLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Effet pour gérer le défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Récupérer les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        // Utiliser des données fictives en cas d'erreur
        setCategories([
          { id: 1, name: 'Électronique', slug: 'electronique' },
          { id: 2, name: 'Mode', slug: 'mode' },
          { id: 3, name: 'Maison', slug: 'maison' },
          { id: 4, name: 'Sports', slug: 'sports' },
          { id: 5, name: 'Beauté', slug: 'beaute' }
        ]);
      }
    };
    fetchCategories();
  }, []);

  // Récupérer le nombre d'articles dans le panier
  useEffect(() => {
    const getCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };
    getCartCount();
    window.addEventListener('storage', getCartCount);
    return () => window.removeEventListener('storage', getCartCount);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-orange-600">PENVENTORY</span>
            </Link>

            {/* Navigation sur desktop */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={`text-sm font-medium ${pathname === '/' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'} transition-colors`}>
                Accueil
              </Link>
              <Link href="/products" className={`text-sm font-medium ${pathname.startsWith('/products') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'} transition-colors`}>
                Produits
              </Link>
              <Link href="/categories" className={`text-sm font-medium ${pathname.startsWith('/categories') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'} transition-colors`}>
                Catégories
              </Link>
              <Link href="/store" className={`text-sm font-medium ${pathname.startsWith('/store') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'} transition-colors`}>
                Magasins
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Recherche */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Favoris */}
              <Link href="/favorites" className="hidden sm:flex p-2 text-gray-700 hover:text-orange-600 transition-colors">
                <Heart className="h-5 w-5" />
              </Link>

              {/* Panier */}
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Compte */}
              {loading ? (
                <div className="h-5 w-5 animate-pulse bg-gray-200 rounded-full"></div>
              ) : user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 p-2 text-gray-700 hover:text-orange-600 transition-colors">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                    {user?.role === 'ADMIN' && (
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Tableau de bord
                      </Link>
                    )}
                    {user?.role === 'MANAGER' && (
                      <Link href="/manager/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Tableau de bord
                      </Link>
                    )}
                    {user?.role === 'SELLER' && (
                      <Link href="/seller/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Tableau de bord
                      </Link>
                    )}
                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                      Mes commandes
                    </Link>
                    <Link href="/account/orders/track" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                      Suivi de commandes
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Mon profil
                      </Link>
                    )}
                    {user?.role === 'MANAGER' && (
                      <Link href="/manager/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Mon profil
                      </Link>
                    )}
                    {user?.role === 'SELLER' && (
                      <Link href="/seller/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Mon profil
                      </Link>
                    )}
                    {(user?.role === 'CUSTOMER' || !user?.role) && (
                      <Link href="/account/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                        Mon profil
                      </Link>
                    )}
                    <button 
                      onClick={logout} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="flex items-center space-x-1 p-2 text-gray-700 hover:text-orange-600 transition-colors">
                  <LogIn className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Connexion</span>
                </Link>
              )}

              {/* Menu mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Barre de recherche */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-3 px-4 bg-white">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher des produits..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  Rechercher
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col py-2">
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-medium ${pathname === '/' ? 'text-orange-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/products"
                className={`px-4 py-2 text-sm font-medium ${pathname.startsWith('/products') ? 'text-orange-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Produits
              </Link>
              <Link
                href="/categories"
                className={`px-4 py-2 text-sm font-medium ${pathname.startsWith('/categories') ? 'text-orange-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Catégories
              </Link>
              <Link
                href="/store"
                className={`px-4 py-2 text-sm font-medium ${pathname.startsWith('/store') ? 'text-orange-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Magasins
              </Link>
              <Link
                href="/favorites"
                className={`px-4 py-2 text-sm font-medium ${pathname === '/favorites' ? 'text-orange-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Favoris
              </Link>
              <Link
                href="/orders"
                className={`px-4 py-2 text-sm font-medium ${pathname === '/orders' ? 'text-orange-600' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mes commandes
              </Link>
              {!user && (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion / Inscription
                </Link>
              )}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-red-600 text-left"
                >
                  Déconnexion
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Contenu principal */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Pied de page */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PENVENTORY</h3>
              <p className="text-gray-400 mb-4">
                Votre marketplace en ligne pour tous vos besoins d'achat et de vente.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Catégories</h3>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <Link href={`/categories/${category.slug}`} className="text-gray-400 hover:text-white transition-colors">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Inscrivez-vous pour recevoir nos dernières offres et promotions.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors"
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PENVENTORY. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
