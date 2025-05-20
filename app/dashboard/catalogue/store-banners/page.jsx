import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique du composant client avec désactivation du SSR
const StoreBannersContent = dynamic(
  () => import('./store-banners-content'),
  { ssr: false }
);

// Composant principal qui sera rendu côté serveur
export default function StoreBannersPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    }>
      <StoreBannersContent />
    </Suspense>
  );
}
