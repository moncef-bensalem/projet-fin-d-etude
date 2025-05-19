'use client';

import { useState } from 'react';
import { useNotification } from '@/context/notification-context';
import { useLanguage } from '@/context/language-context';
import { formatDistanceToNow } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

export default function NotificationsPage() {
  const { t, language } = useLanguage();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    clearAllNotifications
  } = useNotification();
  const [activeTab, setActiveTab] = useState('all');

  // Formater la date relative (il y a X minutes, il y a X heures, etc.)
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const locale = language === 'fr' ? fr : enUS;
    return formatDistanceToNow(date, { addSuffix: true, locale });
  };

  // Formater la date complète
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrer les notifications en fonction de l'onglet actif
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  // Déterminer l'icône à afficher en fonction du type de notification
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return '🛒';
      case 'message':
        return '💬';
      case 'alert':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      default:
        return '🔔';
    }
  };

  // Gérer le clic sur une notification
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('notifications')}</h1>
          <div className="space-x-2">
            {notifications.some(n => !n.read) && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
              >
                {t('markAllAsRead')}
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="px-4 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md transition-colors"
              >
                {t('clearAll')}
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 border-b dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`mr-4 py-2 px-1 border-b-2 ${
                activeTab === 'all'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('all')}
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`mr-4 py-2 px-1 border-b-2 ${
                activeTab === 'unread'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('unread')}
            </button>
            <button
              onClick={() => setActiveTab('order')}
              className={`mr-4 py-2 px-1 border-b-2 ${
                activeTab === 'order'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('orders')}
            </button>
            <button
              onClick={() => setActiveTab('message')}
              className={`mr-4 py-2 px-1 border-b-2 ${
                activeTab === 'message'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('messages')}
            </button>
            <button
              onClick={() => setActiveTab('alert')}
              className={`mr-4 py-2 px-1 border-b-2 ${
                activeTab === 'alert'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t('alerts')}
            </button>
          </nav>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">{t('noNotifications')}</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                  !notification.read ? 'bg-orange-50 dark:bg-gray-700/50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-4 text-2xl">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-base ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(notification.timestamp)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {formatRelativeTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                    className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                  >
                    <span className="sr-only">{t('delete')}</span>
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
