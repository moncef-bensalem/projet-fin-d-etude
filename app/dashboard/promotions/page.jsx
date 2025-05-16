'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Charger les promotions
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/promotions');
        if (response.ok) {
          const data = await response.json();
          setPromotions(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des promotions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Fonction pour formater le montant en devise
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promotions</h1>
        <button
          onClick={() => router.push('/dashboard/promotions/new')}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Nouvelle Promotion
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : promotions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">Aucune promotion disponible.</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Cliquez sur "Nouvelle Promotion" pour en créer une.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{promotion.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{promotion.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Remise: {promotion.discountType === 'PERCENTAGE' ? `${promotion.discountValue}%` : formatCurrency(promotion.discountValue)}</span>
                  <span>Code: {promotion.code}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm">
                  <span>Valide jusqu'au {new Date(promotion.endDate).toLocaleDateString()}</span>
                  <button
                    onClick={() => router.push(`/dashboard/promotions/${promotion.id}`)}
                    className="text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}