'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { ArrowRight, Star, TrendingUp, Award, ShoppingBag } from 'lucide-react';
import { BannerSlider } from '@/components/ui/banner-slider';

// Composant pour les catégories de stylos
const PenCategory = ({ name, image, slug }) => (
  <Link href={`/categories/${slug}`} className="group">
    <div className="relative overflow-hidden rounded-lg aspect-square">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-white font-semibold text-lg">{name}</h3>
      </div>
    </div>
  </Link>
);

// Composant pour les produits en vedette
const FeaturedProduct = ({ product, t }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Ajouter la fonction de traduction au produit pour l'utiliser dans le composant
  product.t = t;
  
  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-all duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-medium text-sm transition-colors">
            {product.t('homeAddToCart')}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-xs text-gray-500">{product.reviewCount} {product.t('homeReviews')}</span>
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">{product.brand}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.discount > 0 ? (
              <>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{(product.price * (1 - product.discount / 100)).toFixed(2)} DT</span>
                <span className="ml-2 text-sm text-gray-500 line-through">{product.price.toFixed(2)} DT</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-white">{product.price.toFixed(2)} DT</span>
            )}
          </div>
          {product.stock <= 5 && product.stock > 0 ? (
            <span className="text-xs text-orange-600 font-medium">{product.t('homeLowStock').replace('{stock}', product.stock)}</span>
          ) : product.stock === 0 ? (
            <span className="text-xs text-red-600 font-medium">{product.t('homeOutOfStock')}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// Composant pour les marques
const BrandLogo = ({ logo, name }) => (
  <div className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all">
    <Image src={logo} alt={name} width={120} height={60} className="object-contain" />
  </div>
);

export default function Home() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les données au chargement de la page
  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
    fetchBrands();
  }, []);

  // Pour les images manquantes, nous utiliserons des placeholders
  const placeholderImage = (text) => `https://placehold.co/600x400/orange/white?text=${encodeURIComponent(text)}`;

  // Récupérer les catégories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      } else {
        console.error(t('errorCategories'));
        // Utiliser des catégories par défaut en cas d'erreur
        setCategories([
          { id: 1, name: t('defaultCategory1'), slug: 'stylos-de-luxe', image: '/images/luxury-pens.jpg' },
          { id: 2, name: t('defaultCategory2'), slug: 'stylos-a-plume', image: '/images/fountain-pens.jpg' },
          { id: 3, name: t('defaultCategory3'), slug: 'stylos-a-bille', image: '/images/ballpoint-pens.jpg' },
          { id: 4, name: t('defaultCategory4'), slug: 'stylos-rollers', image: '/images/rollerball-pens.jpg' },
          { id: 5, name: t('defaultCategory5'), slug: 'crayons-porte-mines', image: '/images/pencils.jpg' },
          { id: 6, name: t('defaultCategory6'), slug: 'accessoires-ecriture', image: '/images/writing-accessories.jpg' },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  // Récupérer les produits en vedette
  const fetchFeaturedProducts = async () => {
    try {
      // Utiliser l'API qui fonctionne
      const response = await fetch('/api/all-products-admin');
      if (response.ok) {
        const data = await response.json();
        
        // Filtrer pour ne prendre que les produits en stock et limiter à 8 produits
        const featuredProductsData = data.products?.filter(product => product.stock > 0).slice(0, 8) || [];
        
        setFeaturedProducts(featuredProductsData);
      } else {
        console.error(t('errorProducts'));
        // Utiliser des produits par défaut en cas d'erreur
        setFeaturedProducts([
          {
            id: 1,
            name: 'Montblanc Meisterstück Classique',
            brand: 'Montblanc',
            price: 595.00,
            discount: 0,
            rating: 4.9,
            reviewCount: 127,
            stock: 8,
            images: ['/images/montblanc-1.jpg', '/images/montblanc-2.jpg']
          },
          {
            id: 2,
            name: 'Parker Sonnet Stylo à Plume',
            brand: 'Parker',
            price: 175.00,
            discount: 15,
            rating: 4.7,
            reviewCount: 89,
            stock: 3,
            images: ['/images/parker-1.jpg', '/images/parker-2.jpg']
          },
          {
            id: 3,
            name: 'Waterman Expert Stylo à Bille',
            brand: 'Waterman',
            price: 120.00,
            discount: 0,
            rating: 4.6,
            reviewCount: 64,
            stock: 12,
            images: ['/images/waterman-1.jpg', '/images/waterman-2.jpg']
          },
          {
            id: 4,
            name: 'Lamy Safari Stylo Plume',
            brand: 'Lamy',
            price: 29.90,
            discount: 10,
            rating: 4.8,
            reviewCount: 215,
            stock: 0,
            images: ['/images/lamy-1.jpg', '/images/lamy-2.jpg']
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des produits en vedette:", error);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les marques (stores)
  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/stores');
      if (response.ok) {
        const data = await response.json();
        // Transformer les magasins en format de marques
        const brandsData = data.stores.map(store => ({
          id: store.id,
          name: store.name,
          logo: store.logo || placeholderImage(store.name)
        }));
        setBrands(brandsData);
      } else {
        console.error(t('errorBrands'));
        // Utiliser des marques par défaut en cas d'erreur
        setBrands([
          { id: 1, name: 'Montblanc', logo: '/images/montblanc-logo.png' },
          { id: 2, name: 'Parker', logo: '/images/parker-logo.png' },
          { id: 3, name: 'Waterman', logo: '/images/waterman-logo.png' },
          { id: 4, name: 'Lamy', logo: '/images/lamy-logo.png' },
          { id: 5, name: 'Cross', logo: '/images/cross-logo.png' },
          { id: 6, name: 'Sheaffer', logo: '/images/sheaffer-logo.png' },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des marques:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section avec Slider */}
      <section className="mb-12">
        <BannerSlider />
      </section>

      {/* Catégories */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('homeCategories')}</h2>
          <Link 
            href="/categories" 
            className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            {t('homeViewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <PenCategory
              key={category.id}
              name={category.name}
              image={category.image || placeholderImage(category.name)}
              slug={category.id}
            />
          ))}
        </div>
      </section>

      {/* Produits en vedette */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('homeFeaturedProducts')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('homeFeaturedProductsSubtitle')}</p>
          </div>
          <Link 
            href="/products" 
            className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            {t('homeViewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Skeleton loading
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : (
            featuredProducts.map((product) => (
              <FeaturedProduct key={product.id} product={product} t={t} />
            ))
          )}
        </div>
      </section>

      {/* Marques */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('homeBrands')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('homeBrandsSubtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <BrandLogo key={brand.id} logo={brand.logo} name={brand.name} />
          ))}
        </div>
      </section>

      {/* Avantages */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{t('homeAdvantage1Title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('homeAdvantage1Subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{t('homeAdvantage2Title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('homeAdvantage2Subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <ShoppingBag className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{t('homeAdvantage3Title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('homeAdvantage3Subtitle')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
