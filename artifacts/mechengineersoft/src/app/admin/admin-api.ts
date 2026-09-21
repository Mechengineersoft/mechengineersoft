let runtimeAdminSession: string | null = null;

export function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getAdminSession();
  const headers = new Headers(init.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('X-Admin-Session', token);
  }
  return fetch(input, {
    ...init,
    headers,
    credentials: 'include',
    cache: 'no-store',
  });
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem('mes_admin_session');
    window.localStorage.removeItem('mes_admin_session');
  }
  runtimeAdminSession = null;
}

export function getAdminSession() {
  if (typeof window === 'undefined') return null;
  return runtimeAdminSession || window.sessionStorage.getItem('mes_admin_session') || window.localStorage.getItem('mes_admin_session');
}

export function saveAdminSession(token: string) {
  runtimeAdminSession = token;
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem('mes_admin_session', token);
  window.localStorage.setItem('mes_admin_session', token);
}