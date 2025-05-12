'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Dictionnaire de traduction
const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    products: 'Produits',
    categories: 'Catégories',
    cart: 'Panier',
    account: 'Compte',
    dashboard: 'Tableau de bord',
    orders: 'Commandes',
    sellers: 'Vendeurs',
    customers: 'Clients',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    login: 'Connexion',
    register: 'Inscription',
    contact: 'Contact',
    help: 'Aide',
    schoolLists: 'Listes Scolaires',
    becomeSeller: 'Devenir Vendeur',
    favorites: 'Favoris',
    wishlist: 'Liste de souhaits',
    myOrders: 'Mes commandes',
    myAccount: 'Mon compte',
    profile: 'Profil',
    myStore: 'Mon magasin',
    administration: 'Administration',
    management: 'Gestion',
    sellerSpace: 'Espace vendeur',
    
    // Actions
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher des produits...',
    filter: 'Filtrer',
    sort: 'Trier',
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    subscribe: 'S\'inscrire',
    
    // Produits
    price: 'Prix',
    stock: 'Stock',
    description: 'Description',
    addToCart: 'Ajouter au panier',
    outOfStock: 'Rupture de stock',
    
    // Commandes
    orderNumber: 'Numéro de commande',
    orderDate: 'Date de commande',
    orderStatus: 'Statut de la commande',
    orderTotal: 'Total de la commande',
    
    // Statuts
    pending: 'En attente',
    processing: 'En cours',
    shipped: 'Expédié',
    delivered: 'Livré',
    cancelled: 'Annulé',
    
    // Messages
    welcome: 'Bienvenue',
    notifications: 'Notifications',
    noItems: 'Aucun élément trouvé',
    newOrderReceived: 'Nouvelle commande reçue',
    newSupportMessage: 'Nouveau message de support',
    lowStockFor: 'Stock faible pour "{product}"',
    minutesAgo: 'Il y a {minutes} minutes',
    hoursAgo: 'Il y a {hours} heure(s)',
    viewAllNotifications: 'Voir toutes les notifications',
    
    // Thème
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    
    // Langue
    language: 'Langue',
    french: 'Français',
    english: 'Anglais',
    selectLanguage: 'Sélectionner la langue',
    
    // Footer
    aboutUs: 'À propos',
    aboutUsText: 'Votre marketplace en ligne pour tous vos besoins d\'achat et de vente.',
    quickLinks: 'Liens rapides',
    about: 'À propos',
    faq: 'FAQ',
    termsOfUse: 'Conditions d\'utilisation',
    privacyPolicy: 'Politique de confidentialité',
    newsletter: 'Newsletter',
    newsletterText: 'Inscrivez-vous pour recevoir nos dernières offres et promotions.',
    emailPlaceholder: 'Votre adresse e-mail',
    allRightsReserved: 'Tous droits réservés.',
    
    // Become Seller Page
    becomeSellerTitle: 'VOUS VOULEZ VENDRE?',
    becomeSellerSubtitle: 'Devenez vendeur sur Penventory!',
    becomeSellerDescription: 'Rejoignez notre marketplace et atteignez des milliers de clients potentiels. Vendez vos produits facilement et développez votre activité avec nous.',
    becomeSellerButton: 'DEVENIR UN VENDEUR',
    sellerStepsTitle: 'VRAIMENT FACILE À CONFIGURER ET À PERSONNALISER',
    sellerStep1Title: 'Créer un compte',
    sellerStep1Description: 'Créez un compte vendeur sur PInventory pour commencer à vendre vos produits.',
    sellerStep2Title: 'Créez votre profil',
    sellerStep2Description: 'Complétez votre profil vendeur avec toutes les informations nécessaires.',
    sellerStep3Title: 'Ajoutez vos coordonnées',
    sellerStep3Description: 'Ajoutez vos coordonnées bancaires et fiscales pour recevoir vos paiements.',
    sellerStep4Title: 'Ajoutez votre liste de produits',
    sellerStep4Description: 'Créez votre catalogue de produits avec des descriptions détaillées et des images de qualité.',
    sellerStep5Title: 'Vendez vos produits et gagnez des points',
    sellerStep5Description: 'Commencez à vendre et gagnez des points de fidélité pour débloquer des avantages exclusifs.',
    sellerBenefitsTitle: 'POURQUOI VENDRE SUR PENVENTORY?',
    benefit1Title: 'Acheteurs importants',
    benefit1Description: 'Accédez à une large base de clients, avec de nombreux acheteurs réguliers.',
    benefit2Title: 'Paiements rapides',
    benefit2Description: 'Une fois les produits livrés aux clients, vous pouvez demander votre paiement immédiatement.',
    benefit3Title: 'Gagner des badges',
    benefit3Description: 'Gagnez des badges de performance qui vous démarquent comme un vendeur professionnel.',
    benefit4Title: 'Personnaliser le profil',
    benefit4Description: 'Personnalisez votre profil avec des informations comme le logo, l\'emplacement et les politiques de retour.',
    benefit5Title: 'Ajouter des médias',
    benefit5Description: 'Intégrez des vidéos YouTube pour rendre votre boutique plus authentique et vous démarquer.',
    callToActionTitle: 'PRÊT À COMMENCER VOTRE AVENTURE DE VENTE?',
    callToActionDescription: 'Rejoignez des milliers de vendeurs qui ont déjà augmenté leurs revenus en vendant sur Penventory.',
    signUpAsSeller: 'INSCRIVEZ-VOUS EN TANT QUE VENDEUR',
    faqTitle: 'QUESTIONS FRÉQUENTES',
    faq1Question: 'Comment puis-je m\'inscrire en tant que vendeur ?',
    faq1Answer: 'Pour vous inscrire en tant que vendeur, cliquez sur le bouton "Devenir vendeur" en haut de cette page, puis suivez les étapes d\'inscription. Vous devrez fournir des informations sur votre entreprise, vos coordonnées bancaires et fiscales.',
    faq2Question: 'Quels sont les frais pour vendre sur Penventory ?',
    faq2Answer: 'Penventory prélève une commission de 5% sur chaque vente réalisée sur la plateforme. Il n\'y a pas de frais d\'inscription ou d\'abonnement mensuel.',
    faq3Question: 'Comment sont gérés les paiements ?',
    faq3Answer: 'Les paiements sont sécurisés et traités par notre système. Une fois qu\'une commande est livrée et confirmée par le client, vous pouvez demander un virement sur votre compte bancaire. Les paiements sont généralement traités sous 3 jours ouvrables.',
    faq4Question: 'Comment gérer mes produits et commandes ?',
    faq4Answer: 'Une fois inscrit, vous aurez accès à un tableau de bord vendeur où vous pourrez ajouter, modifier et supprimer des produits, ainsi que gérer vos commandes, suivre vos ventes et communiquer avec les clients.',
    faq5Question: 'Puis-je vendre n\'importe quel type de produit ?',
    faq5Answer: 'Vous pouvez vendre la plupart des produits légaux, mais certaines catégories sont restreintes ou interdites. Consultez nos conditions d\'utilisation pour plus de détails sur les produits autorisés et interdits.',
    helpSectionTitle: 'Vous êtes coincé? Posez des questions',
    helpSectionDescription: 'Si vous avez des questions sur le processus de vente, n\'hésitez pas à nous contacter. Nous sommes là pour vous aider!',
    helpCenter: 'Centre d\'aide',
    liveChat: 'Chat en direct',
    
    // Help Page
    helpPageTitle: 'Centre d\'assistance',
    helpPageSubtitle: 'Comment pouvons-nous vous aider aujourd\'hui?',
    searchPlaceholder: 'Tapez des mots-clés comme « retour »',
    searchButton: 'Rechercher',
    helpCategory1Title: 'Passer une commande',
    helpCategory1Description: 'Tout ce que vous devez savoir pour passer une commande sur notre plateforme.',
    helpCategory2Title: 'Suivre votre colis',
    helpCategory2Description: 'Comment suivre vos commandes et connaître leur statut de livraison.',
    helpCategory3Title: 'Méthode de paiement',
    helpCategory3Description: 'Informations sur les différentes méthodes de paiement disponibles.',
    helpCategory4Title: 'Annuler des commandes',
    helpCategory4Description: 'Comment annuler une commande ou effectuer un retour.',
    helpCategory5Title: 'Gérer votre compte',
    helpCategory5Description: 'Tout sur la gestion de votre compte et vos informations personnelles.',
    needMoreHelp: 'Besoin de plus d\'aide ?',
    needMoreHelpDescription: 'Si vous ne trouvez pas la réponse à votre question, n\'hésitez pas à contacter notre équipe de support.',
    contactUs: 'Contactez-nous',
    
    // FAQ Orders
    faqOrder1Question: 'Comment passer une commande sur PInventory ?',
    faqOrder1Answer: 'Pour passer une commande sur PInventory, suivez ces étapes simples :\n      1. Parcourez notre catalogue et trouvez les produits qui vous intéressent\n      2. Ajoutez les produits à votre panier en cliquant sur le bouton "Ajouter au panier"\n      3. Accédez à votre panier en cliquant sur l\'icône du panier en haut à droite\n      4. Vérifiez votre commande et cliquez sur "Passer la commande"\n      5. Remplissez vos informations de livraison et de paiement\n      6. Confirmez votre commande',
    faqOrder2Question: 'Puis-je modifier ma commande après l\'avoir passée ?',
    faqOrder2Answer: 'Vous pouvez modifier votre commande uniquement si elle n\'a pas encore été traitée. Pour ce faire, accédez à votre compte, consultez vos commandes récentes et cliquez sur "Modifier" si cette option est disponible. Si votre commande a déjà été traitée, vous devrez contacter notre service client pour obtenir de l\'aide.',
    faqOrder3Question: 'Comment puis-je vérifier la disponibilité d\'un produit ?',
    faqOrder3Answer: 'La disponibilité d\'un produit est indiquée sur sa page produit. Si un produit est en stock, vous verrez la mention "En stock" et vous pourrez l\'ajouter à votre panier. Si un produit est épuisé, vous verrez la mention "Rupture de stock" et vous pourrez vous inscrire pour être notifié lorsqu\'il sera à nouveau disponible.',
    
    // FAQ Tracking
    faqTracking1Question: 'Comment suivre ma commande ?',
    faqTracking1Answer: 'Pour suivre votre commande, suivez ces étapes :\n      1. Connectez-vous à votre compte\n      2. Accédez à la section "Mes commandes"\n      3. Trouvez la commande que vous souhaitez suivre\n      4. Cliquez sur "Suivre ma commande"\n      \n      Vous pourrez voir le statut actuel de votre commande et l\'emplacement de votre colis si la livraison est en cours.',
    faqTracking2Question: 'Quels sont les différents statuts de livraison ?',
    faqTracking2Answer: 'Voici les différents statuts de livraison que vous pourriez voir :\n      - Commande reçue : Nous avons reçu votre commande\n      - En cours de traitement : Votre commande est en cours de préparation\n      - Expédiée : Votre commande a été remise au transporteur\n      - En transit : Votre commande est en route vers vous\n      - Livrée : Votre commande a été livrée à l\'adresse indiquée\n      - Retardée : Il y a un retard dans la livraison de votre commande',
    faqTracking3Question: 'Combien de temps faut-il pour livrer ma commande ?',
    faqTracking3Answer: 'Le délai de livraison dépend de votre emplacement et du mode de livraison choisi. En général, les délais de livraison sont les suivants :\n      - Livraison standard : 3-5 jours ouvrables\n      - Livraison express : 1-2 jours ouvrables\n      \n      Vous pouvez voir l\'estimation du délai de livraison lors du passage de votre commande.',
    
    // FAQ Payment
    faqPayment1Question: 'Quelles sont les méthodes de paiement acceptées ?',
    faqPayment1Answer: 'Nous acceptons plusieurs méthodes de paiement pour votre commodité :\n      - Cartes de crédit/débit (Visa, Mastercard)\n      - PayPal\n      - Virement bancaire\n      - Paiement à la livraison (pour certaines régions)',
    faqPayment2Question: 'Mes informations de paiement sont-elles sécurisées ?',
    faqPayment2Answer: 'Oui, toutes les informations de paiement sont sécurisées. Nous utilisons un cryptage SSL pour protéger vos données personnelles et financières. Nous ne stockons pas vos informations de carte de crédit sur nos serveurs.',
    faqPayment3Question: 'Quand mon compte sera-t-il débité ?',
    faqPayment3Answer: 'Votre compte sera débité au moment où vous passez votre commande. Si un produit n\'est pas disponible ou si votre commande est annulée pour une raison quelconque, vous serez remboursé intégralement.',
    
    // FAQ Returns
    faqReturns1Question: 'Comment annuler ma commande ?',
    faqReturns1Answer: 'Pour annuler votre commande, suivez ces étapes :\n      1. Connectez-vous à votre compte\n      2. Accédez à la section "Mes commandes"\n      3. Trouvez la commande que vous souhaitez annuler\n      4. Cliquez sur "Annuler la commande"\n      \n      Veuillez noter que vous ne pouvez annuler une commande que si elle n\'a pas encore été expédiée. Si votre commande a déjà été expédiée, vous devrez la retourner une fois reçue.',
    faqReturns2Question: 'Comment retourner un produit ?',
    faqReturns2Answer: 'Pour retourner un produit, suivez ces étapes :\n      1. Connectez-vous à votre compte\n      2. Accédez à la section "Mes commandes"\n      3. Trouvez la commande contenant le produit que vous souhaitez retourner\n      4. Cliquez sur "Retourner un article"\n      5. Suivez les instructions pour imprimer l\'\u00e9tiquette de retour\n      \n      Une fois que nous aurons reçu et vérifié le produit retourné, nous procéderons au remboursement.',
    
    // FAQ Account
    faqAccount1Question: 'Comment créer un compte ?',
    faqAccount1Answer: 'Pour créer un compte sur PInventory, suivez ces étapes :\n      1. Cliquez sur l\'icône de profil en haut à droite de la page\n      2. Sélectionnez "S\'inscrire"\n      3. Remplissez le formulaire avec vos informations personnelles\n      4. Créez un mot de passe sécurisé\n      5. Cliquez sur "Créer un compte"\n      \n      Vous recevrez un e-mail de confirmation pour activer votre compte.',
    faqAccount2Question: 'Comment modifier mes informations personnelles ?',
    faqAccount2Answer: 'Pour modifier vos informations personnelles, suivez ces étapes :\n      1. Connectez-vous à votre compte\n      2. Accédez à la section "Mon profil"\n      3. Cliquez sur "Modifier" à côté des informations que vous souhaitez mettre à jour\n      4. Effectuez vos modifications\n      5. Cliquez sur "Enregistrer"\n      \n      Vos informations seront mises à jour immédiatement.',
    faqAccount3Question: 'J\'ai oublié mon mot de passe, que dois-je faire ?',
    faqAccount3Answer: 'Si vous avez oublié votre mot de passe, suivez ces étapes :\n      1. Cliquez sur l\'icône de profil en haut à droite de la page\n      2. Sélectionnez "Se connecter"\n      3. Cliquez sur "Mot de passe oublié"\n      4. Entrez l\'adresse e-mail associée à votre compte\n      5. Cliquez sur "Réinitialiser le mot de passe"\n      \n      Vous recevrez un e-mail avec un lien pour réinitialiser votre mot de passe.',
    
    // Traductions pour le chat support
    chatSupportTitle: "Assistance par chat",
    chatWelcomeTitle: "Bienvenue",
    chatWelcomeDescription: "Comment pouvons-nous vous aider ?",
    contactInfoTitle: "Informations de contact",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    validate: "Valider",
    chooseOption: "Merci de choisir l'une des options suivantes",
    back: "Retour",
    typingPlaceholder: "Tapez votre message...",
    cannotTypeNow: "Vous ne pouvez pas taper maintenant",
    
    // Catégories de support
    supportCategory1: "Passation de commande",
    supportCategory2: "Paramètres de compte",
    supportCategory3: "Paiement et bons d'achat",
    supportCategory4: "Autre demande générale",
    supportCategory5: "Demande liée à une commande",
    
    // Messages du chat
    chatWelcomeMessage: "Bonjour {firstName}, je suis l'assistant virtuel. Je suis là pour répondre à vos questions.",
    chatCategoryMessage: "Merci de choisir l'une des options suivantes concernant \"{categoryLabel}\"",
    chatNoPredefResponse: "Je n'ai pas de réponse prédéfinie pour cette question. Souhaitez-vous parler à un agent?",
    chatAgentSoon: "Merci pour votre message. Un agent va vous répondre dès que possible.",
    chatHelpWithElse: "Est-ce que je peux vous aider avec autre chose?",
    chatConnectAgent: "Nous allons vous mettre en relation avec un agent. Veuillez patienter quelques instants.",
    chatThanks: "Merci d'avoir utilisé notre service de chat. N'hésitez pas à revenir si vous avez d'autres questions!",
    chatClosed: "La conversation a été fermée",
    
    // Réponses rapides
    quickReplyYesAgent: "Oui, je veux parler à un agent",
    quickReplyNoThanks: "Non, merci",
    quickReplyNewConversation: "Nouvelle conversation",
    quickReplyAnotherQuestion: "Oui, j'ai une autre question",
    
    // Questions fréquentes du chat
    chatFaqOrder1: "Comment passer une commande ?",
    chatFaqOrder2: "Puis-je modifier ma commande après l'avoir passée ?",
    chatFaqAccount1: "Comment modifier mes informations personnelles ?",
    chatFaqAccount2: "Comment changer mon mot de passe ?",
    chatFaqPayment1: "Comment effectuer un paiement avec une carte bancaire ?",
    chatFaqPayment2: "Comment utiliser un bon d'achat ?",
    chatFaqPayment3: "Vérifier mon solde de crédit",
    chatFaqGeneral1: "Comment contacter le service client ?",
    chatFaqGeneral2: "Quels sont vos horaires d'ouverture ?",
    chatFaqOrderRelated1: "Quand ma commande sera-t-elle livrée ?",
    chatFaqOrderRelated2: "Comment suivre ma livraison ?",
    chatFaqOrderRelated3: "Puis-je modifier mon adresse de livraison ?",
    
    // Réponses prédéfinies
    predefinedResponseOrder1: "Pour passer une commande, suivez ces étapes:\n    1. Parcourez notre catalogue et ajoutez les produits souhaités à votre panier\n    2. Cliquez sur l'icône du panier pour voir votre sélection\n    3. Cliquez sur \"Passer la commande\"\n    4. Remplissez vos informations de livraison et de paiement\n    5. Confirmez votre commande",
    predefinedResponsePayment3Step1: "Pour vérifier votre solde de crédit vous pouvez:",
    predefinedResponsePayment3Step2: "1. Vous connecter sur votre compte",
    predefinedResponsePayment3Step3: "2. Cliquer sur \"compte\" puis crédit",
    predefinedResponsePayment3Step4: "OU",
    predefinedResponsePayment3Step5: "1. Vous connecter sur votre compte via web ou application",
    predefinedResponsePayment3Step6: "2. Vérifier le solde sous la section \"Crédit\"",
    predefinedResponseOrderRelated2Step1: "Pour suivre votre livraison:",
    predefinedResponseOrderRelated2Step2: "1. Connectez-vous à votre compte",
    predefinedResponseOrderRelated2Step3: "2. Accédez à \"Mes commandes\"",
    predefinedResponseOrderRelated2Step4: "3. Sélectionnez la commande concernée",
    predefinedResponseOrderRelated2Step5: "4. Cliquez sur \"Suivre ma livraison\"",
    
    // Page de contact
    contactPageTitle: "Contactez-nous",
    contactPageSubtitle: "Nous sommes là pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.",
    contactInfoTitle: "Informations de contact",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    addressLabel: "Adresse",
    openingHoursTitle: "Heures d'ouverture",
    openingHoursContent: "Lundi - Vendredi: 9h00 - 18h00\nSamedi: 9h00 - 13h00\nDimanche: Fermé",
    sendMessageTitle: "Envoyez-nous un message",
    fullNameLabel: "Nom complet",
    subjectLabel: "Sujet",
    orderNumberLabel: "Numéro de commande (si applicable)",
    categoryLabel: "Catégorie",
    priorityLabel: "Priorité",
    messageLabel: "Message",
    sendingButton: "Envoi en cours...",
    sendButton: "Envoyer le message",
    thankYouTitle: "Merci pour votre message!",
    thankYouMessage: "Votre demande a été soumise avec succès. Notre équipe de support vous répondra dans les plus brefs délais.",
    referenceNumberLabel: "Numéro de référence:",
    keepReferenceMessage: "Veuillez conserver ce numéro de référence pour le suivi de votre demande.",
    submitAnotherRequest: "Soumettre une autre demande",
    faqTitle: "Questions fréquemment posées",
    trackOrderQuestion: "Comment suivre ma commande?",
    trackOrderAnswer: "Connectez-vous à votre compte, accédez à \"Mes commandes\" et cliquez sur \"Suivre\" à côté de votre commande.",
    returnPolicyQuestion: "Politique de retour",
    returnPolicyAnswer: "Vous pouvez retourner un produit dans les 14 jours suivant la réception si vous n'êtes pas satisfait.",
    paymentMethodsQuestion: "Méthodes de paiement",
    paymentMethodsAnswer: "Nous acceptons les cartes de crédit/débit, le paiement à la livraison et les virements bancaires.",
    
    // Catégories de support
    contactCategoryPayment: "Paiement",
    contactCategoryShipping: "Livraison",
    contactCategoryProduct: "Produit",
    contactCategoryAccount: "Compte",
    contactCategoryOther: "Autre",
    
    // Priorités de support
    contactPriorityLow: "Basse",
    contactPriorityMedium: "Moyenne",
    contactPriorityHigh: "Haute",
    contactPriorityUrgent: "Urgente",
    
    // Messages de toast
    contactSuccessMessage: "Votre demande a été soumise avec succès!",
    contactErrorAuth: "Veuillez vous connecter pour soumettre un ticket de support.",
    contactErrorGeneral: "Une erreur est survenue. Veuillez réessayer.",
    
    // Page d'accueil
    homeCategories: "Catégories de stylos",
    homeFeaturedProducts: "Produits en vedette",
    homeFeaturedProductsSubtitle: "Découvrez notre sélection de stylos de luxe",
    homeBrands: "Nos marques partenaires",
    homeBrandsSubtitle: "Les plus grandes marques nous font confiance",
    homeViewAll: "Voir tout",
    homeAddToCart: "Ajouter au panier",
    homeReviews: "avis",
    homeLowStock: "Plus que {stock} en stock",
    homeOutOfStock: "Rupture de stock",
    homeAdvantage1Title: "Qualité premium",
    homeAdvantage1Subtitle: "Sélection rigoureuse des produits",
    homeAdvantage2Title: "Garantie authentique",
    homeAdvantage2Subtitle: "Produits 100% authentiques",
    homeAdvantage3Title: "Livraison rapide",
    homeAdvantage3Subtitle: "Expédition sous 24h",
    
    // Erreurs API
    errorCategories: "Erreur lors de la récupération des catégories",
    errorProducts: "Erreur lors de la récupération des produits en vedette",
    errorBrands: "Erreur lors de la récupération des marques",
    
    // Catégories par défaut
    defaultCategory1: "Stylos de luxe",
    defaultCategory2: "Stylos à plume",
    defaultCategory3: "Stylos à bille",
    defaultCategory4: "Stylos rollers",
    defaultCategory5: "Crayons & Porte-mines",
    defaultCategory6: "Accessoires d'écriture",
  },
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    cart: 'Cart',
    account: 'Account',
    dashboard: 'Dashboard',
    orders: 'Orders',
    sellers: 'Sellers',
    customers: 'Customers',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    contact: 'Contact',
    help: 'Help',
    schoolLists: 'School Lists',
    becomeSeller: 'Become a Seller',
    favorites: 'Favorites',
    wishlist: 'Wishlist',
    myOrders: 'My Orders',
    myAccount: 'My Account',
    profile: 'Profile',
    myStore: 'My Store',
    administration: 'Administration',
    management: 'Management',
    sellerSpace: 'Seller Space',
    
    // Actions
    search: 'Search',
    searchPlaceholder: 'Search for products...',
    filter: 'Filter',
    sort: 'Sort',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    subscribe: 'Subscribe',
    
    // Products
    price: 'Price',
    stock: 'Stock',
    description: 'Description',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    
    // Orders
    orderNumber: 'Order Number',
    orderDate: 'Order Date',
    orderStatus: 'Order Status',
    orderTotal: 'Order Total',
    
    // Statuses
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    
    // Messages
    welcome: 'Welcome',
    notifications: 'Notifications',
    noItems: 'No items found',
    newOrderReceived: 'New order received',
    newSupportMessage: 'New support message',
    lowStockFor: 'Low stock for "{product}"',
    minutesAgo: '{minutes} minutes ago',
    hoursAgo: '{hours} hour(s) ago',
    viewAllNotifications: 'View all notifications',
    
    // Theme
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    
    // Language
    language: 'Language',
    french: 'French',
    english: 'English',
    selectLanguage: 'Select Language',
    
    // Footer
    aboutUs: 'About Us',
    aboutUsText: 'Your online marketplace for all your buying and selling needs.',
    quickLinks: 'Quick Links',
    about: 'About',
    faq: 'FAQ',
    termsOfUse: 'Terms of Use',
    privacyPolicy: 'Privacy Policy',
    newsletter: 'Newsletter',
    newsletterText: 'Sign up to receive our latest offers and promotions.',
    emailPlaceholder: 'Your email address',
    allRightsReserved: 'All rights reserved.',
    
    // Become Seller Page
    becomeSellerTitle: 'WANT TO SELL?',
    becomeSellerSubtitle: 'Become a seller on Penventory!',
    becomeSellerDescription: 'Join our marketplace and reach thousands of potential customers. Sell your products easily and grow your business with us.',
    becomeSellerButton: 'BECOME A SELLER',
    sellerStepsTitle: 'REALLY EASY TO SET UP AND CUSTOMIZE',
    sellerStep1Title: 'Create an account',
    sellerStep1Description: 'Create a seller account on PInventory to start selling your products.',
    sellerStep2Title: 'Create your profile',
    sellerStep2Description: 'Complete your seller profile with all the necessary information.',
    sellerStep3Title: 'Add your coordinates',
    sellerStep3Description: 'Add your banking and tax information to receive your payments.',
    sellerStep4Title: 'Add your product list',
    sellerStep4Description: 'Create your product catalog with detailed descriptions and quality images.',
    sellerStep5Title: 'Sell your products and earn points',
    sellerStep5Description: 'Start selling and earn loyalty points to unlock exclusive benefits.',
    sellerBenefitsTitle: 'WHY SELL ON PENVENTORY?',
    benefit1Title: 'Important Buyers',
    benefit1Description: 'Access a wide customer base, with many regular buyers.',
    benefit2Title: 'Fast Payments',
    benefit2Description: 'Once products are delivered to customers, you can request your payment immediately.',
    benefit3Title: 'Earn Badges',
    benefit3Description: 'Earn performance badges that set you apart as a professional seller.',
    benefit4Title: 'Customize Profile',
    benefit4Description: 'Customize your profile with information such as logo, location, and return policies.',
    benefit5Title: 'Add Media',
    benefit5Description: 'Integrate YouTube videos to make your store more authentic and stand out.',
    callToActionTitle: 'READY TO START YOUR SELLING ADVENTURE?',
    callToActionDescription: 'Join thousands of sellers who have already increased their revenue by selling on Penventory.',
    signUpAsSeller: 'SIGN UP AS A SELLER',
    faqTitle: 'FREQUENTLY ASKED QUESTIONS',
    faq1Question: 'How can I register as a seller?',
    faq1Answer: 'To register as a seller, click on the "Become a Seller" button at the top of this page, then follow the registration steps. You will need to provide information about your business, your banking and tax details.',
    faq2Question: 'What are the fees for selling on Penventory?',
    faq2Answer: 'Penventory takes a 5% commission on each sale made on the platform. There are no registration or monthly subscription fees.',
    faq3Question: 'How are payments managed?',
    faq3Answer: 'Payments are secure and processed by our system. Once an order is delivered and confirmed by the customer, you can request a transfer to your bank account. Payments are typically processed within 3 business days.',
    faq4Question: 'How do I manage my products and orders?',
    faq4Answer: 'Once registered, you will have access to a seller dashboard where you can add, edit, and delete products, as well as manage your orders, track your sales, and communicate with customers.',
    faq5Question: 'Can I sell any type of product?',
    faq5Answer: 'You can sell most legal products, but some categories are restricted or prohibited. Please refer to our terms of use for more details on allowed and prohibited products.',
    helpSectionTitle: 'Stuck? Ask Questions',
    helpSectionDescription: 'If you have questions about the selling process, don\'t hesitate to contact us. We\'re here to help!',
    helpCenter: 'Help Center',
    liveChat: 'Live Chat',
    
    // Help Page
    helpPageTitle: 'Help Center',
    helpPageSubtitle: 'How can we help you today?',
    searchPlaceholder: 'Type keywords like "return"',
    searchButton: 'Search',
    helpCategory1Title: 'Place an Order',
    helpCategory1Description: 'Everything you need to know about placing an order on our platform.',
    helpCategory2Title: 'Track Your Package',
    helpCategory2Description: 'How to track your orders and know their delivery status.',
    helpCategory3Title: 'Payment Methods',
    helpCategory3Description: 'Information about the different payment methods available.',
    helpCategory4Title: 'Cancel Orders',
    helpCategory4Description: 'How to cancel an order or make a return.',
    helpCategory5Title: 'Manage Your Account',
    helpCategory5Description: 'All about managing your account and personal information.',
    needMoreHelp: 'Need More Help?',
    needMoreHelpDescription: 'If you can\'t find the answer to your question, don\'t hesitate to contact our support team.',
    contactUs: 'Contact Us',
    
    // FAQ Orders
    faqOrder1Question: 'How do I place an order on PInventory?',
    faqOrder1Answer: 'To place an order on PInventory, follow these simple steps:\n      1. Browse our catalog and find the products you\'re interested in\n      2. Add products to your cart by clicking the "Add to Cart" button\n      3. Access your cart by clicking the cart icon in the top right\n      4. Review your order and click "Checkout"\n      5. Fill in your shipping and payment information\n      6. Confirm your order',
    faqOrder2Question: 'Can I modify my order after placing it?',
    faqOrder2Answer: 'You can modify your order only if it has not been processed yet. To do this, go to your account, view your recent orders, and click "Modify" if this option is available. If your order has already been processed, you will need to contact our customer service for assistance.',
    faqOrder3Question: 'How can I check product availability?',
    faqOrder3Answer: 'Product availability is indicated on the product page. If a product is in stock, you will see "In Stock" and you can add it to your cart. If a product is out of stock, you will see "Out of Stock" and you can sign up to be notified when it becomes available again.',
    
    // FAQ Tracking
    faqTracking1Question: 'How do I track my order?',
    faqTracking1Answer: 'To track your order, follow these steps:\n      1. Log in to your account\n      2. Go to the "My Orders" section\n      3. Find the order you want to track\n      4. Click "Track My Order"\n      \n      You will be able to see the current status of your order and the location of your package if delivery is in progress.',
    faqTracking2Question: 'What are the different delivery statuses?',
    faqTracking2Answer: 'Here are the different delivery statuses you might see:\n      - Order received: We have received your order\n      - Processing: Your order is being prepared\n      - Shipped: Your order has been handed over to the carrier\n      - In transit: Your order is on its way to you\n      - Delivered: Your order has been delivered to the address provided\n      - Delayed: There is a delay in the delivery of your order',
    faqTracking3Question: 'How long does it take to deliver my order?',
    faqTracking3Answer: 'Delivery time depends on your location and the delivery method chosen. In general, delivery times are as follows:\n      - Standard delivery: 3-5 business days\n      - Express delivery: 1-2 business days\n      \n      You can see the estimated delivery time when placing your order.',
    
    // FAQ Payment
    faqPayment1Question: 'What payment methods are accepted?',
    faqPayment1Answer: 'We accept several payment methods for your convenience:\n      - Credit/debit cards (Visa, Mastercard)\n      - PayPal\n      - Bank transfer\n      - Cash on delivery (for certain regions)',
    faqPayment2Question: 'Is my payment information secure?',
    faqPayment2Answer: 'Yes, all payment information is secure. We use SSL encryption to protect your personal and financial data. We do not store your credit card information on our servers.',
    faqPayment3Question: 'When will my account be charged?',
    faqPayment3Answer: 'Your account will be charged at the time you place your order. If a product is not available or if your order is canceled for any reason, you will be fully refunded.',
    
    // FAQ Returns
    faqReturns1Question: 'How do I cancel my order?',
    faqReturns1Answer: 'To cancel your order, follow these steps:\n      1. Log in to your account\n      2. Go to the "My Orders" section\n      3. Find the order you want to cancel\n      4. Click "Cancel Order"\n      \n      Please note that you can only cancel an order if it has not been shipped yet. If your order has already been shipped, you will need to return it once received.',
    faqReturns2Question: 'How do I return a product?',
    faqReturns2Answer: 'To return a product, follow these steps:\n      1. Log in to your account\n      2. Go to the "My Orders" section\n      3. Find the order containing the product you want to return\n      4. Click "Return an item"\n      5. Follow the instructions to print the return label\n      \n      Once we have received and verified the returned product, we will process the refund.',
    
    // FAQ Account
    faqAccount1Question: 'How do I create an account?',
    faqAccount1Answer: 'To create an account on PInventory, follow these steps:\n      1. Click on the profile icon at the top right of the page\n      2. Select "Sign Up"\n      3. Fill out the form with your personal information\n      4. Create a secure password\n      5. Click "Create Account"\n      \n      You will receive a confirmation email to activate your account.',
    faqAccount2Question: 'How do I update my personal information?',
    faqAccount2Answer: 'To update your personal information, follow these steps:\n      1. Log in to your account\n      2. Go to the "My Profile" section\n      3. Click "Edit" next to the information you want to update\n      4. Make your changes\n      5. Click "Save"\n      \n      Your information will be updated immediately.',
    faqAccount3Question: 'How do I reset my password?',
    faqAccount3Answer: 'If you forgot your password, follow these steps:\n      1. Click on the profile icon at the top right of the page\n      2. Select "Login"\n      3. Click on "Forgot password"\n      4. Enter the email address associated with your account\n      5. Click on "Reset password"\n      \n      You will receive an email with a link to reset your password.',
    
    // Chat support translations
    chatSupportTitle: "Chat Support",
    chatWelcomeTitle: "Welcome",
    chatWelcomeDescription: "How can we help you?",
    contactInfoTitle: "Contact Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    validate: "Submit",
    chooseOption: "Please choose one of the following options",
    back: "Back",
    typingPlaceholder: "Type your message...",
    cannotTypeNow: "You cannot type now",
    
    // Support categories
    supportCategory1: "Placing an order",
    supportCategory2: "Account settings",
    supportCategory3: "Payment and vouchers",
    supportCategory4: "Other general inquiry",
    supportCategory5: "Order-related inquiry",
    
    // Chat messages
    chatWelcomeMessage: "Hello {firstName}, I'm the virtual assistant. I'm here to answer your questions.",
    chatCategoryMessage: "Please choose one of the following options regarding \"{categoryLabel}\"",
    chatNoPredefResponse: "I don't have a predefined answer for this question. Would you like to speak to an agent?",
    chatAgentSoon: "Thank you for your message. An agent will respond as soon as possible.",
    chatHelpWithElse: "Can I help you with anything else?",
    chatConnectAgent: "We will connect you with an agent. Please wait a moment.",
    chatThanks: "Thank you for using our chat service. Feel free to come back if you have any other questions!",
    chatClosed: "The conversation has been closed",
    
    // Quick replies
    quickReplyYesAgent: "Yes, I want to speak to an agent",
    quickReplyNoThanks: "No, thank you",
    quickReplyNewConversation: "New conversation",
    quickReplyAnotherQuestion: "Yes, I have another question",
    
    // Chat FAQ questions
    chatFaqOrder1: "How do I place an order?",
    chatFaqOrder2: "Can I modify my order after placing it?",
    chatFaqAccount1: "How do I update my personal information?",
    chatFaqAccount2: "How do I change my password?",
    chatFaqPayment1: "How do I make a payment with a credit card?",
    chatFaqPayment2: "How do I use a voucher?",
    chatFaqPayment3: "Check my credit balance",
    chatFaqGeneral1: "How do I contact customer service?",
    chatFaqGeneral2: "What are your opening hours?",
    chatFaqOrderRelated1: "When will my order be delivered?",
    chatFaqOrderRelated2: "How do I track my delivery?",
    chatFaqOrderRelated3: "Can I change my delivery address?",
    
    // Predefined responses
    predefinedResponseOrder1: "To place an order, follow these steps:\n    1. Browse our catalog and add the desired products to your cart\n    2. Click on the cart icon to view your selection\n    3. Click on \"Checkout\"\n    4. Fill in your shipping and payment information\n    5. Confirm your order",
    predefinedResponsePayment3Step1: "To check your credit balance you can:",
    predefinedResponsePayment3Step2: "1. Log in to your account",
    predefinedResponsePayment3Step3: "2. Click on \"account\" then credit",
    predefinedResponsePayment3Step4: "OR",
    predefinedResponsePayment3Step5: "1. Log in to your account via web or application",
    predefinedResponsePayment3Step6: "2. Check the balance under the \"Credit\" section",
    predefinedResponseOrderRelated2Step1: "To track your delivery:",
    predefinedResponseOrderRelated2Step2: "1. Log in to your account",
    predefinedResponseOrderRelated2Step3: "2. Go to \"My orders\"",
    predefinedResponseOrderRelated2Step4: "3. Select the order in question",
    predefinedResponseOrderRelated2Step5: "4. Click on \"Track my delivery\"",
    
    // Contact page
    contactPageTitle: "Contact Us",
    contactPageSubtitle: "We're here to help. Fill out the form below and we'll get back to you as soon as possible.",
    contactInfoTitle: "Contact Information",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    openingHoursTitle: "Opening Hours",
    openingHoursContent: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
    sendMessageTitle: "Send Us a Message",
    fullNameLabel: "Full Name",
    subjectLabel: "Subject",
    orderNumberLabel: "Order Number (if applicable)",
    categoryLabel: "Category",
    priorityLabel: "Priority",
    messageLabel: "Message",
    sendingButton: "Sending...",
    sendButton: "Send Message",
    thankYouTitle: "Thank You for Your Message!",
    thankYouMessage: "Your request has been successfully submitted. Our support team will get back to you as soon as possible.",
    referenceNumberLabel: "Reference Number:",
    keepReferenceMessage: "Please keep this reference number for tracking your request.",
    submitAnotherRequest: "Submit Another Request",
    faqTitle: "Frequently Asked Questions",
    trackOrderQuestion: "How do I track my order?",
    trackOrderAnswer: "Log in to your account, go to \"My Orders\" and click on \"Track\" next to your order.",
    returnPolicyQuestion: "Return Policy",
    returnPolicyAnswer: "You can return a product within 14 days of receipt if you are not satisfied.",
    paymentMethodsQuestion: "Payment Methods",
    paymentMethodsAnswer: "We accept credit/debit cards, cash on delivery, and bank transfers.",
    
    // Support categories
    contactCategoryPayment: "Payment",
    contactCategoryShipping: "Shipping",
    contactCategoryProduct: "Product",
    contactCategoryAccount: "Account",
    contactCategoryOther: "Other",
    
    // Support priorities
    contactPriorityLow: "Low",
    contactPriorityMedium: "Medium",
    contactPriorityHigh: "High",
    contactPriorityUrgent: "Urgent",
    
    // Toast messages
    contactSuccessMessage: "Your request has been submitted successfully!",
    contactErrorAuth: "Please log in to submit a support ticket.",
    contactErrorGeneral: "An error occurred. Please try again.",
    
    // Home page
    homeCategories: "Pen Categories",
    homeFeaturedProducts: "Featured Products",
    homeFeaturedProductsSubtitle: "Discover our selection of luxury pens",
    homeBrands: "Our Partner Brands",
    homeBrandsSubtitle: "The biggest brands trust us",
    homeViewAll: "View all",
    homeAddToCart: "Add to cart",
    homeReviews: "reviews",
    homeLowStock: "Only {stock} left in stock",
    homeOutOfStock: "Out of stock",
    homeAdvantage1Title: "Premium Quality",
    homeAdvantage1Subtitle: "Rigorous product selection",
    homeAdvantage2Title: "Authentic Guarantee",
    homeAdvantage2Subtitle: "100% authentic products",
    homeAdvantage3Title: "Fast Delivery",
    homeAdvantage3Subtitle: "Shipping within 24 hours",
    
    // API errors
    errorCategories: "Error retrieving categories",
    errorProducts: "Error retrieving featured products",
    errorBrands: "Error retrieving brands",
    
    // Default categories
    defaultCategory1: "Luxury Pens",
    defaultCategory2: "Fountain Pens",
    defaultCategory3: "Ballpoint Pens",
    defaultCategory4: "Rollerball Pens",
    defaultCategory5: "Pencils & Mechanical Pencils",
    defaultCategory6: "Writing Accessories",
  }
};

// Création du contexte
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Récupérer la langue préférée du navigateur ou utiliser le français par défaut
  const [language, setLanguage] = useState('fr');
  
  // Charger la langue depuis le localStorage au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // Sauvegarder la langue dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Fonction pour changer de langue
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };
  
  // Fonction pour traduire une clé
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte de langue
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
