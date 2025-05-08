'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/auth-context';
import { 
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Upload
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SellerSettings() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      orders: true,
      messages: true,
      marketing: false
    },
    paymentMethods: [],
    twoFactorEnabled: false
  });
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: '',
    accountNumber: '',
    accountName: ''
  });

  // Charger les données du profil au chargement de la page
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Charger les données du profil
        const profileResponse = await fetch('/api/seller/profile');
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log('Données du profil chargées:', profileData);
          
          // Mettre à jour le formulaire avec les données du profil
          setFormData(prevData => ({
            ...prevData,
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
          }));
          
          // Mettre à jour l'image du profil si elle existe
          if (profileData.image) {
            setProfileImage(profileData.image);
          }
        } else {
          const errorData = await profileResponse.json().catch(() => ({}));
          const errorMessage = errorData.error || 'Erreur inconnue';
          console.error(`Erreur lors du chargement du profil: ${errorMessage} (${profileResponse.status})`);
          toast.error(`Erreur lors du chargement du profil: ${errorMessage}`);
        }
        
        // Charger les méthodes de paiement
        try {
          const paymentResponse = await fetch('/api/seller/payment-methods');
          if (paymentResponse.ok) {
            const paymentData = await paymentResponse.json();
            console.log('Méthodes de paiement chargées:', paymentData);
            
            // Vérifier si paymentData est un tableau
            if (Array.isArray(paymentData)) {
              // Mettre à jour le formulaire avec les méthodes de paiement
              setFormData(prevData => ({
                ...prevData,
                paymentMethods: paymentData || []
              }));
            } else {
              console.error('Format de données de paiement incorrect:', paymentData);
              toast.error('Format de données de paiement incorrect');
            }
          } else {
            const errorData = await paymentResponse.json().catch(() => ({}));
            const errorMessage = errorData.error || 'Erreur inconnue';
            console.error(`Erreur lors du chargement des méthodes de paiement: ${errorMessage} (${paymentResponse.status})`);
            toast.error(`Erreur lors du chargement des méthodes de paiement: ${errorMessage}`);
          }
        } catch (paymentError) {
          console.error('Erreur lors du chargement des méthodes de paiement:', paymentError);
          toast.error(`Erreur de connexion: ${paymentError.message || 'Impossible de contacter le serveur'}`);
        }
      } catch (error) {
        console.error('Erreur générale:', error);
        toast.error(`Erreur de connexion: ${error.message || 'Impossible de contacter le serveur'}`);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Envoi des données:', {
        name: formData.name,
        phone: formData.phone,
        image: profileImage
      });
      
      const response = await fetch('/api/seller/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          image: profileImage
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erreur lors de la mise à jour du profil');
      }

      const data = await response.json();
      console.log('Profil mis à jour:', data);
      
      // Mettre à jour le formulaire avec les nouvelles données
      setFormData(prevData => ({
        ...prevData,
        name: data.name || prevData.name,
        email: data.email || prevData.email,
        phone: data.phone || prevData.phone,
      }));
      
      // Mettre à jour l'image du profil si elle a été modifiée
      if (data.image) {
        setProfileImage(data.image);
        
        // Mettre à jour l'utilisateur dans le contexte de session
        if (user) {
          // Mettre à jour l'état local du contexte d'authentification
          const updatedUser = {
            ...user,
            image: data.image
          };
          setUser(updatedUser);
          
          // Mettre à jour la session dans le navigateur
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: updatedUser
            }),
          });
          
          // Rafraîchir la page pour mettre à jour l'image
          window.location.reload();
        }
      }
      
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/seller/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors du changement de mot de passe');
      }

      toast.success('Mot de passe mis à jour avec succès');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async (key) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [key]: !formData.notifications[key]
      }
    });

    try {
      const response = await fetch('/api/seller/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notifications: {
            ...formData.notifications,
            [key]: !formData.notifications[key]
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des notifications');
      }

      toast.success('Préférences de notification mises à jour');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    }
  };

  // Ajouter une nouvelle méthode de paiement
  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    
    const paymentType = newPaymentMethod.type;
    const accountNumber = newPaymentMethod.accountNumber;
    const accountName = newPaymentMethod.accountName;
    
    if (!paymentType || !accountNumber || !accountName) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    const newPaymentMethodData = {
      id: Date.now().toString(),
      type: paymentType,
      accountNumber,
      accountName,
      isDefault: formData.paymentMethods.length === 0 // Premier ajouté = par défaut
    };
    
    const updatedPaymentMethods = [...formData.paymentMethods, newPaymentMethodData];
    
    setFormData(prevData => ({
      ...prevData,
      paymentMethods: updatedPaymentMethods
    }));
    
    // Réinitialiser le formulaire
    setNewPaymentMethod({
      type: '',
      accountNumber: '',
      accountName: ''
    });
    
    // Enregistrer les méthodes de paiement dans la base de données
    savePaymentMethods(updatedPaymentMethods);
    
    toast.success('Méthode de paiement ajoutée avec succès');
  };
  
  // Supprimer une méthode de paiement
  const handleDeletePaymentMethod = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?')) {
      setLoading(true);
      
      try {
        const response = await fetch(`/api/seller/payment-methods?id=${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la méthode de paiement');
        }
        
        // Mettre à jour l'état local après la suppression
        const updatedPaymentMethods = formData.paymentMethods.filter(
          method => method.id !== id
        );
        
        setFormData(prevData => ({
          ...prevData,
          paymentMethods: updatedPaymentMethods
        }));
        
        toast.success('Méthode de paiement supprimée avec succès');
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Définir une méthode de paiement comme par défaut
  const handleSetDefaultPaymentMethod = (id) => {
    const updatedPaymentMethods = formData.paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    
    setFormData(prevData => ({
      ...prevData,
      paymentMethods: updatedPaymentMethods
    }));
    
    // Enregistrer les méthodes de paiement dans la base de données
    savePaymentMethods(updatedPaymentMethods);
    
    toast.success('Méthode de paiement par défaut mise à jour');
  };
  
  // Enregistrer les méthodes de paiement dans la base de données
  const savePaymentMethods = async (paymentMethods) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/seller/payment-methods', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethods }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement des méthodes de paiement');
      }
      
      console.log('Méthodes de paiement enregistrées avec succès');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground">
          Gérez vos paramètres de compte et préférences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Paiement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileImage || user?.image} />
                  <AvatarFallback>
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Photo de profil
                  </label>
                  <div className="flex items-center gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="gap-2"
                      onClick={triggerFileInput}
                    >
                      <Upload className="h-4 w-4" />
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                    </Button>
                    {profileImage && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setProfileImage(null)}
                      >
                        Supprimer
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Téléphone
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={handleInputChange}
                    name="phone"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mot de passe actuel
                  </label>
                  <Input
                    type="password"
                    required
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    name="currentPassword"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nouveau mot de passe
                  </label>
                  <Input
                    type="password"
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    name="newPassword"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <Input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    name="confirmPassword"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">Authentification à deux facteurs</h4>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                </div>
                <Switch
                  checked={formData.twoFactorEnabled}
                  onCheckedChange={(checked) => {
                    setFormData({ ...formData, twoFactorEnabled: checked });
                    toast.success(
                      checked 
                        ? '2FA activé avec succès' 
                        : '2FA désactivé avec succès'
                    );
                  }}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Préférences de notification</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez des mises à jour par email
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.email}
                      onCheckedChange={() => handleNotificationUpdate('email')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications push</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez des notifications sur votre navigateur
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.push}
                      onCheckedChange={() => handleNotificationUpdate('push')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouvelles commandes</p>
                      <p className="text-sm text-muted-foreground">
                        Soyez notifié des nouvelles commandes
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.orders}
                      onCheckedChange={() => handleNotificationUpdate('orders')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Messages clients</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez les messages de vos clients
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.messages}
                      onCheckedChange={() => handleNotificationUpdate('messages')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez des conseils et actualités marketing
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.marketing}
                      onCheckedChange={() => handleNotificationUpdate('marketing')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Méthodes de paiement</h4>
                <p className="text-sm text-muted-foreground">
                  Gérez vos méthodes de paiement pour recevoir vos revenus
                </p>
              </div>

              {formData.paymentMethods.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Aucune méthode de paiement
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ajoutez une méthode de paiement pour recevoir vos revenus
                  </p>
                  <Button type="button" onClick={() => setShowAddPaymentForm(true)}>
                    Ajouter une méthode de paiement
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">Méthodes de paiement existantes</h4>
                    <Button type="button" onClick={() => setShowAddPaymentForm(true)}>
                      Ajouter une nouvelle méthode
                    </Button>
                  </div>
                  
                  <ul>
                    {formData.paymentMethods.map((method, index) => (
                      <li key={method.id || index} className="py-4 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{method.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {method.accountNumber} ({method.accountName})
                            </p>
                            {method.isDefault && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Par défaut
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {!method.isDefault && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleSetDefaultPaymentMethod(method.id)}
                              >
                                Définir par défaut
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => handleDeletePaymentMethod(method.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(showAddPaymentForm || formData.paymentMethods.length === 0) && (
                <div className="mt-8 pt-8 border-t">
                  <h4 className="text-lg font-semibold mb-4">Ajouter une méthode de paiement</h4>
                  <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Type de paiement
                      </label>
                      <Input
                        required
                        name="paymentType"
                        placeholder="Ex: Carte bancaire, PayPal, etc."
                        value={newPaymentMethod.type || ''}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, type: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Numéro de compte
                      </label>
                      <Input
                        required
                        name="accountNumber"
                        placeholder="Ex: XXXX-XXXX-XXXX-XXXX"
                        value={newPaymentMethod.accountNumber || ''}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, accountNumber: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nom du compte
                      </label>
                      <Input
                        required
                        name="accountName"
                        placeholder="Ex: John Doe"
                        value={newPaymentMethod.accountName || ''}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, accountName: e.target.value})}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      {formData.paymentMethods.length > 0 && (
                        <Button type="button" variant="outline" onClick={() => setShowAddPaymentForm(false)}>
                          Annuler
                        </Button>
                      )}
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Ajout en cours...' : 'Ajouter la méthode de paiement'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
