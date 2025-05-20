import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Prevent this page from being statically generated
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Dynamically import the client component
const AccountClient = dynamic(() => import('./client'), {
  ssr: false
});

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    }>
      <AccountClient />
    </Suspense>
  );
}
