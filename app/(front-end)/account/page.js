import { redirect } from 'next/navigation';

// Skip static generation for this route
export const dynamic = 'force-dynamic';

// This is a server component that redirects to a client-side route
export default function AccountPage() {
  // Redirect to a client-side route that will handle the session
  redirect('/account-client');
}
