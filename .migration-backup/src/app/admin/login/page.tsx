'use client';

import { FormEvent, useState } from 'react';
import Link from '@/components/StaticLink';
import { useRouter } from 'next/navigation';
import MESLogo from '@/components/MESLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setMessage('');
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    const result = await response.json(); setLoading(false);
    if (!response.ok) { setMessage(result.message || 'Unable to sign in.'); return; }
    router.push('/admin'); router.refresh();
  }
  return <main className="min-h-screen px-6 grid place-items-center bg-background"><section className="w-full max-w-md glass-card rounded-3xl p-8 border-glow"><Link href="/" className="inline-flex items-center gap-3 text-foreground"><MESLogo size={38} /><span className="font-bold">Mech Engineer Soft</span></Link><p className="section-label mt-10 mb-3">Owner access</p><h1 className="text-3xl font-extrabold">Admin workspace</h1><p className="mt-3 text-sm text-muted-foreground leading-relaxed">Sign in to manage website settings and review consultation requests.</p><form onSubmit={submit} className="mt-8"><label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label><input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-input" required /><button type="submit" disabled={loading} className="btn-primary w-full mt-5 py-3 text-sm disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in securely'}</button>{message && <p role="alert" className="mt-4 text-sm text-red-300 leading-relaxed">{message}</p>}</form><Link href="/" className="block text-center text-sm text-muted-foreground hover:text-accent mt-7">← Return to website</Link></section></main>;
}
