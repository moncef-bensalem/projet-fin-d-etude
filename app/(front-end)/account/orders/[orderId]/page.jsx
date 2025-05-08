'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  CheckCircle,
  XCircle,
  Truck,
  Package,
  ShoppingBag,
  Clock,
  ArrowLeft,
  Printer,
  Calendar,
  Building,
  Home
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.orderId;
  
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        
        // Afficher quel ID nous essayons de récupérer pour le débogage
        console.log(`Tentative de récupération de la commande avec ID: ${orderId}`);
        
        const response = await fetch(`/api/orders/${orderId}`);
        
        if (!response.ok) {
          if (response.headers.get('content-type')?.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Erreur ${response.status}`);
          } else {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
          }
        }
        
        // Récupérer le texte de la réponse et tenter de le parser
        const responseText = await response.text();
        
        try {
          // Nettoyer tout caractère BOM ou autre caractère non-JSON au début
          const cleanedText = responseText.replace(/^\s+|\s+$/g, '');
          const jsonStartPos = cleanedText.indexOf('{');
          const jsonText = jsonStartPos >= 0 ? cleanedText.substring(jsonStartPos) : cleanedText;
          
          console.log('Texte réponse API:', jsonText.substring(0, 100) + '...');
          
          const data = JSON.parse(jsonText);
          console.log('Données de commande parsées avec succès');
          setOrder(data);
        } catch (parseError) {
          console.error('Erreur parsing JSON:', parseError);
          console.error('Réponse brute:', responseText);
          throw new Error(`Impossible de lire la réponse du serveur: ${parseError.message}`);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de la commande:', err);
        setError(err.message);
        toast.error(err.message || 'Impossible de récupérer la commande');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Impossible de charger la commande</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link href="/account/orders" className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à mes commandes
          </Link>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Commande introuvable</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            La commande que vous recherchez n'existe pas ou a été supprimée.
          </p>
          <Link href="/account/orders" className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à mes commandes
          </Link>
        </div>
      </div>
    );
  }
  
  // Déterminer l'étape actuelle
  const getCurrentStep = (status) => {
    const statusMap = {
      'PENDING': 0,
      'EN_ATTENTE': 0,
      'CONFIRMEE': 1,
      'EN_PREPARATION': 2,
      'PROCESSING': 2,
      'EXPEDIEE': 3,
      'SHIPPED': 3,
      'LIVREE': 4,
      'DELIVERED': 4,
      'COMPLETED': 4,
      'ANNULEE': -1,
      'CANCELLED': -1
    };
    
    return statusMap[status] !== undefined ? statusMap[status] : 0;
  };
  
  const currentStep = getCurrentStep(order.status);
  const isOrderCancelled = order.status === 'ANNULEE' || order.status === 'CANCELLED';
  const formattedDate = new Date(order.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Étapes du suivi
  const steps = [
    { name: 'Commande reçue', icon: ShoppingBag },
    { name: 'Commande confirmée', icon: CheckCircle },
    { name: 'En préparation', icon: Package },
    { name: 'Expédiée', icon: Truck },
    { name: 'Livrée', icon: Home }
  ];
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Link href="/account/orders" className="text-gray-600 hover:text-orange-600 inline-flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à mes commandes
      </Link>
      
      <h1 className="text-2xl font-bold mb-6">Suivi de commande</h1>
      
      {/* Informations de commande */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Commande #{order.number}</p>
            <h2 className="text-xl font-semibold">
              {isOrderCancelled ? (
                <span className="text-red-600 dark:text-red-400">Commande annulée</span>
              ) : (
                <span>{order.statusLabel}</span>
              )}
            </h2>
          </div>
          <div className="mt-2 md:mt-0 flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Commandé le {formattedDate}
            </p>
          </div>
        </div>
        
        {/* Informations du vendeur */}
        {order.store && (
          <div className="flex items-center mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Building className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm font-medium">Vendu et expédié par</p>
              <p className="text-gray-600 dark:text-gray-400">{order.store.name}</p>
            </div>
          </div>
        )}
        
        {/* Barre de progression */}
        {!isOrderCancelled ? (
          <div className="mb-8">
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`text-center flex flex-col items-center ${index <= currentStep ? 'text-orange-600' : 'text-gray-400'}`}
                  >
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                      index < currentStep ? 'bg-orange-600 border-orange-600 text-white' :
                      index === currentStep ? 'border-orange-600 text-orange-600' :
                      'border-gray-300 text-gray-300'
                    }`}>
                      <step.icon className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                <div 
                  style={{ width: `${order.statusProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-600"
                ></div>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`text-center ${index <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'} text-xs`}
                    style={{ width: '20%' }}
                  >
                    <p className="truncate">{step.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center bg-red-50 dark:bg-red-900/20 p-4 rounded-lg my-6">
            <XCircle className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-red-600 dark:text-red-400">Cette commande a été annulée</p>
          </div>
        )}
      </div>
      
      {/* Articles commandés */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Articles commandés</h2>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {order.items.map((item) => (
            <div key={item.id} className="py-4 flex justify-between">
              <div className="flex items-center">
                {item.product?.image && (
                  <div className="h-16 w-16 mr-4 rounded overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium">{item.product?.name || 'Produit'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quantité: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{(item.price * item.quantity).toFixed(2)} DT</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.price.toFixed(2)} DT par unité
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Total</span>
            <span className="font-bold">{order.total.toFixed(2)} DT</span>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <button onClick={() => window.print()} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md flex items-center">
          <Printer className="h-4 w-4 mr-2" />
          Imprimer
        </button>
        
        <Link href="/account/contact" className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Besoin d'aide ?
        </Link>
      </div>
    </div>
  );
} 