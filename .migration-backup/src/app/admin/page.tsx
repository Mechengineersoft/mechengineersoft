import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from './components/AdminDashboard';
import { adminCookieName, isValidAdminSession } from '@/lib/admin-auth';

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminCookieName)?.value)) redirect('/admin/login');
  return <AdminDashboard />;
}
