'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useSearchParams } from 'next/navigation';
import PageHead from '@/components/backoffice/PageHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  RefreshCw, 
  Loader2, 
  Store, 
  Upload, 
  Image,
  PlusCircle,
  Trash,
  Search,
  Check,
  X
} from 'lucide-react';
import { UploadButton } from '@/utils/uploadthing';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function StoreBannersPage() {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const storeIdFromUrl = searchParams.get('storeId');
  const [loading, setLoading] = useState(true);
  const [storeLoading, setStoreLoading] = useState({});
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0
  });

  // Récupérer les magasins avec leurs bannières
  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      fetchStores();
    }
  }, [user, pagination.page, pagination.limit]);

  // Fonction pour récupérer les bannières de magasins
  const fetchStores = async (page = pagination.page, limit = pagination.limit) => {
    try {
      setLoading(true);
      console.log('Fetching store banners...');
      
      // Construire l'URL avec les paramètres
      let url = `/api/admin/store-banners?page=${page}&limit=${limit}`;
      if (storeIdFromUrl) {
        url += `&storeId=${storeIdFromUrl}`;
      }
      
      const response = await fetch(url, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      console.log('Store banners response status:', response.status);
      
      if (!response.ok) {
        let errorData = {};
        try {
          // Try to parse JSON response, if it fails, use a default error object
          const text = await response.text();
          errorData = text ? JSON.parse(text) : { error: `HTTP error ${response.status}` };
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          errorData = { error: `HTTP error ${response.status}` };
        }
        console.error('Error response:', errorData);
        throw new Error(errorData.error || `Erreur lors de la récupération des bannières de magasins (${response.status})`);
      }
      
      const data = await response.json();
      console.log('Store banners fetched successfully:', data);
      
      if (data.success && Array.isArray(data.storeBanners)) {
        setStores(data.storeBanners);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      } else {
        throw new Error('Format de données invalide');
      }
    } catch (error) {
      console.error('Error fetching store banners:', error);
      toast.error(error.message || 'Erreur lors de la récupération des bannières de magasins');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour mettre à jour la bannière d'un magasin
  const updateStoreBanner = async (storeId, bannerUrl) => {
    try {
      setStoreLoading(prev => ({ ...prev, [storeId]: true }));
      
      console.log(`Updating banner for store ${storeId}`);
      const response = await fetch('/api/admin/store-banners', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId,
          bannerUrl
        })
      });
      
      if (!response.ok) {
        let errorData = {};
        try {
          const errorText = await response.text();
          if (errorText) {
            errorData = JSON.parse(errorText);
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        throw new Error(errorData.error || `Erreur lors de la mise à jour de la bannière (${response.status})`);
      }
      
      const result = await response.json();
      console.log('Banner update result:', result);
      
      // Mettre à jour l'état local
      setStores(current => 
        current.map(store => 
          store.id === storeId ? { ...store, banner: bannerUrl, hasBanner: true } : store
        )
      );
      
      toast.success(`Bannière mise à jour pour "${result.store.name}"`);
    } catch (error) {
      console.error('Error updating store banner:', error);
      toast.error(error.message || 'Erreur lors de la mise à jour de la bannière');
    } finally {
      setStoreLoading(prev => ({ ...prev, [storeId]: false }));
    }
  };

  // Fonction pour supprimer la bannière d'un magasin
  const deleteStoreBanner = async (storeId, storeName) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la bannière de "${storeName}" ?`)) {
      return;
    }
    
    try {
      setStoreLoading(prev => ({ ...prev, [storeId]: true }));
      
      console.log(`Deleting banner for store ${storeId}`);
      const response = await fetch(`/api/admin/store-banners?storeId=${storeId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        let errorData = {};
        try {
          const errorText = await response.text();
          if (errorText) {
            errorData = JSON.parse(errorText);
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        throw new Error(errorData.error || `Erreur lors de la suppression de la bannière (${response.status})`);
      }
      
      const result = await response.json();
      console.log('Banner deletion result:', result);
      
      // Mettre à jour l'état local
      setStores(current => 
        current.map(store => 
          store.id === storeId ? { ...store, banner: null, hasBanner: false } : store
        )
      );
      
      toast.success(result.message || 'Bannière supprimée avec succès');
    } catch (error) {
      console.error('Error deleting store banner:', error);
      toast.error(error.message || 'Erreur lors de la suppression de la bannière');
    } finally {
      setStoreLoading(prev => ({ ...prev, [storeId]: false }));
    }
  };

  // Filtrer les magasins par recherche
  const filteredStores = search 
    ? stores.filter(store => 
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        (store.seller?.name && store.seller.name.toLowerCase().includes(search.toLowerCase()))
      )
    : stores;

  // Naviguer entre les pages
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accès restreint
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Cette page est réservée aux administrateurs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <PageHead 
        title="Bannières des Magasins" 
        description="Gérer les bannières des magasins sur la plateforme"
      >
        <div className="flex items-center gap-2 ml-auto">
          <Link href="/dashboard/catalogue/banners">
            <Button 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 shadow-lg"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Bannières principales
            </Button>
          </Link>
          <Button 
            onClick={() => fetchStores(pagination.page, pagination.limit)} 
            variant="outline" 
            size="sm"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </PageHead>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="stats bg-white dark:bg-gray-800 shadow-sm p-4 rounded-lg text-center flex flex-wrap gap-4">
          <div className="stat">
            <div className="stat-title text-gray-500 text-sm">Total des magasins</div>
            <div className="stat-value text-2xl font-bold">{pagination.total}</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-500 text-sm">Avec bannière</div>
            <div className="stat-value text-2xl font-bold text-green-600">
              {stores.filter(store => store.hasBanner).length}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-500 text-sm">Sans bannière</div>
            <div className="stat-value text-2xl font-bold text-orange-600">
              {stores.filter(store => !store.hasBanner).length}
            </div>
          </div>
        </div>
        
        <div className="flex items-center w-full md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un magasin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full"
            />
            {search && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setSearch('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map(store => (
          <Card key={store.id} className="overflow-hidden">
            <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
              {storeLoading[store.id] ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
              ) : (
                <>
                  {store.banner ? (
                    <>
                      <img 
                        src={store.banner} 
                        alt={`Bannière de ${store.name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder-banner.jpg';
                        }}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => deleteStoreBanner(store.id, store.name)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <Image className="h-12 w-12 mb-2" />
                      <p className="text-sm">Aucune bannière</p>
                      <p className="text-xs text-gray-500 mt-1">Cliquez sur Télécharger pour ajouter</p>
                    </div>
                  )}
                </>
              )}
            </div>
            
            <CardContent className="pt-4">
              <div className="flex items-center mb-2">
                {store.logo ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={store.logo} 
                      alt={store.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.className = 'hidden';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <Store className="h-5 w-5 text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{store.name}</h3>
                  <p className="text-sm text-gray-500">
                    {store.seller?.name || 'Vendeur inconnu'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex mb-2">
                  <Badge variant={store.hasBanner ? 'success' : 'outline'} className="mr-2">
                    {store.hasBanner ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <X className="h-3 w-3 mr-1" />
                    )}
                    {store.hasBanner ? 'Avec bannière' : 'Sans bannière'}
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor={`upload-${store.id}`} className="text-sm font-medium mb-2 block">
                    Télécharger une bannière
                  </Label>
                  <UploadButton
                    endpoint="bannerImageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        console.log("Upload completed:", res[0]);
                        updateStoreBanner(store.id, res[0].url);
                      }
                    }}
                    onUploadError={(error) => {
                      console.error("Upload error:", error);
                      toast.error(`Erreur: ${error.message}`);
                    }}
                    className="w-full ut-button:bg-orange-500 ut-button:hover:bg-orange-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredStores.length === 0 && !loading && (
        <div className="text-center py-12">
          <Image className="h-16 w-16 mx-auto text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Aucun magasin trouvé
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {search ? `Aucun résultat pour "${search}"` : "Aucun magasin disponible pour le moment"}
          </p>
        </div>
      )}
      
      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <Button
              variant="outline"
              className="join-item"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              «
            </Button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={page === pagination.page ? 'default' : 'outline'}
                className="join-item"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              className="join-item"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              »
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 