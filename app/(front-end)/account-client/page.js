// This is a server component that doesn't use any client hooks
import dynamic from 'next/dynamic';

// Skip static generation for this route
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Dynamically import the client component with no SSR
const AccountClientComponent = dynamic(() => import('./client-component'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  )
});

export default function AccountClientPage() {
  return <AccountClientComponent />;
}
