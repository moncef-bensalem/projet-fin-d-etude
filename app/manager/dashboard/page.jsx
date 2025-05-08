'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, ShoppingCart, MessageSquare, Store, FilePenLine, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export default function ManagerDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pendingSellers: 12,
    pendingProducts: 24,
    supportTickets: 8,
    reviewsToModerate: 15,
    recentTransactions: 345,
    transactionGrowth: 8.5
  });

  // Données pour le graphique circulaire des actions en attente
  const pendingActionsData = {
    labels: ['Vendeurs', 'Produits', 'Tickets Support', 'Avis'],
    datasets: [
      {
        data: [stats.pendingSellers, stats.pendingProducts, stats.supportTickets, stats.reviewsToModerate],
        backgroundColor: [
          'rgba(234, 88, 12, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(251, 146, 60, 0.7)',
          'rgba(254, 215, 170, 0.7)',
        ],
        borderColor: [
          'rgba(234, 88, 12, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(254, 215, 170, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique linéaire des transactions
  const transactionData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [
      {
        label: 'Transactions',
        data: [3200, 3800, 3400, 4100, 3900, 4600, 5200],
        fill: false,
        backgroundColor: 'rgba(234, 88, 12, 0.5)',
        borderColor: 'rgba(234, 88, 12, 1)',
      },
    ],
  };

  const statCards = [
    {
      title: "Vendeurs en attente",
      value: stats.pendingSellers,
      description: "Vendeurs nécessitant validation",
      icon: <UserCheck className="h-5 w-5 text-orange-600" />,
      linkTo: "/manager/dashboard/sellers"
    },
    {
      title: "Produits à valider",
      value: stats.pendingProducts,
      description: "Produits en attente d'approbation",
      icon: <Store className="h-5 w-5 text-orange-500" />,
      linkTo: "/manager/dashboard/products"
    },
    {
      title: "Tickets de support",
      value: stats.supportTickets,
      description: "Tickets non résolus",
      icon: <MessageSquare className="h-5 w-5 text-orange-400" />,
      linkTo: "/manager/dashboard/support"
    },
    {
      title: "Avis à modérer",
      value: stats.reviewsToModerate,
      description: "Avis nécessitant modération",
      icon: <FilePenLine className="h-5 w-5 text-orange-300" />,
      linkTo: "/manager/dashboard/reviews"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{card.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.description}</p>
              <a 
                href={card.linkTo} 
                className="inline-flex items-center mt-3 text-xs text-orange-600 dark:text-orange-400 hover:underline"
              >
                Voir les détails →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">Actions en attente</CardTitle>
            <CardDescription>Répartition des tâches nécessitant votre attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <Doughnut 
                data={pendingActionsData} 
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">Transactions récentes</CardTitle>
              <CardDescription>Aperçu des transactions sur la plateforme</CardDescription>
            </div>
            <div className="flex items-center space-x-1">
              {stats.transactionGrowth > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${stats.transactionGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(stats.transactionGrowth)}%
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line 
                data={transactionData} 
                options={{
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: false
                    }
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">Activités récentes</CardTitle>
          <CardDescription>Les dernières actions effectuées sur la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: 'seller_request',
                user: 'Mohamed Ben Salah',
                time: 'Il y a 30 minutes',
                action: 'a demandé à devenir vendeur'
              },
              {
                type: 'product_submit',
                user: 'Boutique Joli Bazar',
                time: 'Il y a 1 heure',
                action: 'a soumis 5 nouveaux produits pour validation'
              },
              {
                type: 'support_ticket',
                user: 'Ahmed Khelifi',
                time: 'Il y a 2 heures',
                action: 'a ouvert un ticket de support concernant une commande'
              },
              {
                type: 'review_flagged',
                user: 'Système automatique',
                time: 'Il y a 3 heures',
                action: 'a signalé un avis potentiellement abusif'
              }
            ].map((activity, i) => (
              <div key={i} className="flex items-start space-x-4 p-3 rounded-lg bg-orange-50 dark:bg-slate-800/30">
                <div className="rounded-full bg-orange-100 dark:bg-slate-700 p-2">
                  {activity.type === 'seller_request' && <UserCheck className="h-5 w-5 text-orange-600" />}
                  {activity.type === 'product_submit' && <Store className="h-5 w-5 text-orange-500" />}
                  {activity.type === 'support_ticket' && <MessageSquare className="h-5 w-5 text-orange-400" />}
                  {activity.type === 'review_flagged' && <FilePenLine className="h-5 w-5 text-orange-300" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{activity.user}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 