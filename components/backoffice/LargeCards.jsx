import React, { useState, useEffect } from 'react'
import LargeCard from './LargeCard'
import { CalendarArrowDown, CalendarCheck2, Layers, Layers2 } from 'lucide-react'
import toast from 'react-hot-toast';

export default function LargeCards() {
  const [salesData, setSalesData] = useState({
    today: 0,
    yesterday: 0,
    thisMonth: 0, 
    thisYear: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Ajouter un timeout pour éviter les attentes infinies
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes timeout
        
        const response = await fetch('/api/admin/dashboard', {
          signal: controller.signal,
          // Ajouter cache: 'no-store' pour éviter les problèmes de cache en production
          cache: 'no-store'
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Erreur lors de la récupération des données du tableau de bord');
        }
        
        const data = await response.json();
        console.log('Dashboard sales data:', data.salesStats);
        
        if (data.salesStats) {
          setSalesData({
            today: data.salesStats.today || 0,
            yesterday: data.salesStats.yesterday || 0,
            thisMonth: data.salesStats.thisMonth || 0,
            thisYear: data.salesStats.thisYear || 0
          });
        } else {
          // Si les données sont vides, initialiser avec des valeurs par défaut
          setSalesData({
            today: 0,
            yesterday: 0,
            thisMonth: 0,
            thisYear: 0
          });
          console.warn('Aucune donnée de vente disponible dans la réponse API');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Message d'erreur plus spécifique pour aider au débogage
        if (error.name === 'AbortError') {
          toast.error("Délai d'attente dépassé lors du chargement des données");
        } else {
          toast.error(`Erreur: ${error.message || "Erreur lors du chargement des données de ventes"}`);
        }
        // Initialiser avec des valeurs par défaut en cas d'erreur
        setSalesData({
          today: 0,
          yesterday: 0,
          thisMonth: 0,
          thisYear: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const orderStats = [
    {
      period: 'Today Orders',
      sales: salesData.today,
      color: 'bg-green-600',
      icon: Layers2
    },
    {
      period: 'Yesterday Orders',
      sales: salesData.yesterday,
      color: 'bg-blue-600',
      icon: Layers
    },
    {
      period: 'This Month',
      sales: salesData.thisMonth,
      color: 'bg-orange-600',
      icon: CalendarArrowDown
    },
    {
      period: 'This Year',
      sales: salesData.thisYear,
      color: 'bg-purple-600',
      icon: CalendarCheck2
    },
  ]
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
      {
        orderStats.map((data, i) => {
          return (
            <LargeCard data={data} key={i} />
          )
        })
      }
    </div>
  )
}