import { useEffect, useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import { adminFetch, getAdminSession } from './admin-api';

export default function AdminPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  useEffect(() => {
    adminFetch('/api/admin/status').then(async (response) => {
      const status = await response.json();
      setAllowed(response.ok && (Boolean(status.authenticated) || Boolean(getAdminSession())));
    }).catch(() => setAllowed(false));
  }, []);
  if (allowed === null) return <main className="min-h-screen grid place-items-center bg-background text-muted-foreground">Checking owner access…</main>;
  if (!allowed) {
    window.location.replace('/admin/login');
    return null;
  }
  return <AdminDashboard />;
}
