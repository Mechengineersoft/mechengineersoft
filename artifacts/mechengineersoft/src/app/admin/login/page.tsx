'use client';

import { FormEvent, useState } from 'react';
import Link from '@/components/StaticLink';
import { useLocation } from 'wouter';
import MESLogo from '@/components/MESLogo';
import Icon from '@/components/ui/AppIcon';
import { saveAdminSession } from '../admin-api';

export default function AdminLoginPage() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const raw = await response.text();
      let result: { message?: string; session?: string } = {};
      try {
        result = raw ? JSON.parse(raw) : {};
      } catch {
        result = {};
      }
      if (!response.ok) {
        setMessage(result.message || `Sign-in failed (${response.status}). Please check your username and password.`);
        return;
      }
      if (typeof result.session !== 'string' || !result.session) {
        setMessage('Sign-in succeeded but the admin session could not be created. Please try again.');
        return;
      }
      saveAdminSession(result.session);
      navigate('/admin');
    } catch {
      setMessage('Unable to reach the sign-in service. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return <main className="min-h-screen px-6 grid place-items-center bg-background"><section className="w-full max-w-md glass-card rounded-3xl p-8 border-glow"><Link href="/" className="inline-flex items-center gap-3 text-foreground"><MESLogo size={38} /><span className="font-bold">Mech Engineer Soft</span></Link><p className="section-label mt-10 mb-3">Owner access</p><h1 className="text-3xl font-extrabold">Admin workspace</h1><p className="mt-3 text-sm text-muted-foreground leading-relaxed">Sign in to manage website settings and review consultation requests.</p><form onSubmit={submit} className="mt-8 space-y-5"><div><label htmlFor="username" className="block text-sm font-semibold mb-2">Username</label><input id="username" type="text" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} className="form-input" required /></div><div><label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label><div className="relative"><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-input pr-24" required /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}><Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} /><span>{showPassword ? 'Hide' : 'Show'}</span></button></div></div><button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in securely'}</button>{message && <p role="alert" className="text-sm text-red-300 leading-relaxed">{message}</p>}</form><p className="mt-6 text-xs text-muted-foreground">Username: <span className="font-mono text-foreground">admin</span>. The password is configured securely in Replit Secrets.</p><Link href="/" className="block text-center text-sm text-muted-foreground hover:text-accent mt-5">← Return to website</Link></section></main>;
}
