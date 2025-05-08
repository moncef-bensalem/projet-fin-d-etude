'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, CreditCard, Truck, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponAmount, setCouponAmount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    paymentMethod: 'card',
    saveInfo: true
  });
  const [errors, setErrors] = useState({});
  const [orderProcessing, setOrderProcessing] = useState(false);
  
  // Calculs pour le récapitulatif de commande
  const subtotal = cartItems.reduce((total, item) => total + (item.price * (1 - item.discount / 100) * item.quantity), 0);
  const shipping = subtotal > 30 ? 0 : 7.00;
  
  // Utiliser la TVA et le total du localStorage si disponibles
  const tax = taxAmount > 0 ? taxAmount : subtotal * 0.2;
  const total = cartTotal > 0 ? cartTotal : (subtotal - couponAmount + shipping + tax);
  
  useEffect(() => {
    // Récupérer les articles du panier depuis le localStorage
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
        
        // Récupérer les informations de réduction du coupon
        const savedCouponDiscount = localStorage.getItem('couponDiscount');
        const savedCouponAmount = localStorage.getItem('couponAmount');
        const savedCartTotal = localStorage.getItem('cartTotal');
        const savedTaxAmount = localStorage.getItem('taxAmount');
        
        if (savedCouponDiscount && savedCouponAmount) {
          setCouponApplied(true);
          setCouponDiscount(parseFloat(savedCouponDiscount));
          setCouponAmount(parseFloat(savedCouponAmount));
          
          if (savedCartTotal) {
            setCartTotal(parseFloat(savedCartTotal));
          }
          
          if (savedTaxAmount) {
            setTaxAmount(parseFloat(savedTaxAmount));
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        setLoading(false);
      }
    };
    
    loadCart();
  }, []);
  
  // Rediriger vers le panier si vide
  useEffect(() => {
    if (!loading && cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, loading, router]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Effacer l'erreur pour ce champ si elle existe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validation des champs requis
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Ce champ est requis';
      }
    });
    
    // Validation email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }
    
    // Validation code postal français
    if (formData.postalCode && !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal invalide (5 chiffres)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setOrderProcessing(true);
    
    // Stocker les informations du formulaire dans localStorage
    localStorage.setItem('checkout_name', `${formData.firstName} ${formData.lastName}`);
    localStorage.setItem('checkout_address', formData.address);
    localStorage.setItem('checkout_city', formData.city);
    localStorage.setItem('checkout_postalCode', formData.postalCode);
    localStorage.setItem('checkout_country', formData.country);
    localStorage.setItem('checkout_paymentMethod', formData.paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal');
    
    // Stocker la commande actuelle pour la page de confirmation
    localStorage.setItem('lastOrder', JSON.stringify(cartItems));
    
    try {
      // Préparer les données de commande pour l'API
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price * (1 - (item.discount || 0) / 100)
        })),
        shippingAddress: `${formData.address}, ${formData.postalCode} ${formData.city}, ${formData.country}`,
        total: total,
        couponApplied: couponApplied,
        couponDiscount: couponDiscount,
        couponAmount: couponAmount,
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone
        }
      };
      
      // Créer les commandes en base de données
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Échec de la création de la commande');
      }
      
      const result = await response.json();
      console.log('Commandes créées:', result);
      
      // Stocker les IDs MongoDB réels des commandes dans localStorage
      if (result.orderIds && result.orderIds.length > 0) {
        localStorage.setItem('orderIds', JSON.stringify(result.orderIds));
      }
      
      // Vider le panier après la commande réussie
      localStorage.setItem('cart', JSON.stringify([]));
      
      // Supprimer les informations de réduction
      localStorage.removeItem('couponDiscount');
      localStorage.removeItem('couponAmount');
      localStorage.removeItem('promoStoreId');
      localStorage.removeItem('cartTotal');
      localStorage.removeItem('appliedPromoStore');
      
      // Générer l'ID de commande à partir de la réponse de l'API
      const orderId = result.orderIds && result.orderIds.length > 0 ? 
        result.orderIds[0].id : 
        'ORD' + Math.floor(100000 + Math.random() * 900000);
      
      // Rediriger vers la page de confirmation
      router.push(`/checkout/confirmation?orderId=${encodeURIComponent(orderId)}`);
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      alert(`Erreur lors de la création de la commande: ${error.message}`);
      setOrderProcessing(false);
    }
  };
  
  // Fonction pour obtenir l'URL de l'image ou une image placeholder
  const getImageUrl = (src, itemName) => {
    // Si pas d'image, utiliser un placeholder
    if (!src) {
      return `https://placehold.co/600x600/orange/white?text=${encodeURIComponent(typeof itemName === 'string' ? itemName : 'Produit')}`;
    }
    
    // Si src est un tableau, prendre le premier élément
    if (Array.isArray(src)) {
      return src[0];
    }
    
    // Retourner l'URL telle quelle
    return src;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Fil d'Ariane */}
        <nav className="flex items-center text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link href="/cart" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Panier
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-900 dark:text-white font-medium">Paiement</span>
        </nav>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Finaliser votre commande</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulaire de paiement */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              {/* Informations personnelles */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Informations personnelles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Adresse de livraison */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Adresse de livraison</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.postalCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                      )}
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ville *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                      )}
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pays *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Luxembourg">Luxembourg</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Méthode de paiement */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Méthode de paiement</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <label htmlFor="card" className="ml-3 flex items-center">
                      <span className="text-gray-700 dark:text-gray-300 mr-2">Carte bancaire</span>
                      <div className="flex space-x-1">
                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                        <div className="w-8 h-5 bg-red-500 rounded"></div>
                        <div className="w-8 h-5 bg-gray-800 rounded"></div>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <label htmlFor="paypal" className="ml-3 text-gray-700 dark:text-gray-300">
                      PayPal
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'card' && (
                  <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Numéro de carte
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                          <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date d'expiration
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            placeholder="MM/AA"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nom sur la carte
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sauvegarder les informations */}
              <div className="mb-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveInfo" className="ml-2 text-gray-700 dark:text-gray-300">
                    Sauvegarder ces informations pour ma prochaine commande
                  </label>
                </div>
              </div>
              
              {/* Bouton de validation */}
              <button
                type="submit"
                disabled={orderProcessing}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                {orderProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Traitement en cours...
                  </>
                ) : (
                  `Payer ${total.toFixed(2)} DT`
                )}
              </button>
            </form>
          </div>
          
          {/* Récapitulatif de commande */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Récapitulatif de commande</h2>
              
              {/* Liste des articles */}
              <div className="max-h-80 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={getImageUrl(item.images && item.images.length > 0 ? item.images[0] : null, item.name)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Qté: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {((item.price * (1 - item.discount / 100)) * item.quantity).toFixed(2)} DT
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Récapitulatif de la commande */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Récapitulatif de la commande</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sous-total</span>
                    <span className="text-gray-900 dark:text-white">{subtotal.toFixed(2)} DT</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction ({couponDiscount.toFixed(0)}%)</span>
                      <span>-{couponAmount.toFixed(2)} DT</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Frais de livraison</span>
                    <span className={shipping === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}>
                      {shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)} DT`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">TVA (20%)</span>
                    <span className="text-gray-900 dark:text-white">{tax.toFixed(2)} DT</span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">{total.toFixed(2)} DT</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Infos supplémentaires */}
              <div className="mt-4 space-y-3">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Livraison standard gratuite à partir de 100 DT d'achat.
                  </p>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Paiement sécurisé par cryptage SSL. Vos données sont protégées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
