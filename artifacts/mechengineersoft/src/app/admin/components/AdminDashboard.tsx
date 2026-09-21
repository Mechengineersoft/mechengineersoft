'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from '@/components/StaticLink';
import MESLogo from '@/components/MESLogo';
import { adminFetch, clearAdminSession } from '../admin-api';
import ContentManager from './ContentManager';

type Tab = 'overview' | 'settings' | 'inquiries' | 'content';
type PlatformStatus = { databaseConfigured: boolean; authenticationConfigured: boolean; emailConfigured: boolean };
type Metrics = { databaseConfigured: boolean; counts: { inquiries: number; services: number; portfolio: number; posts: number } | null };
type SiteSettings = { companyName: string; tagline: string; businessEmail: string; phone: string; address: string; primaryColor: string; maintenanceMode: boolean };
type Inquiry = { id: string; name: string; email: string; phone: string; company: string; meetingType: string; preferredDate?: string | null; preferredTime?: string | null; projectSummary: string; internalNotes?: string | null; status: 'new' | 'in_progress' | 'replied' | 'archived'; createdAt: string };

const blankSettings: SiteSettings = { companyName: 'Mech Engineer Soft', tagline: 'Engineering Business Solutions Through Software', businessEmail: '', phone: '', address: '', primaryColor: '#2563EB', maintenanceMode: false };
const tabItems: { id: Tab; label: string; helper: string }[] = [
  { id: 'overview', label: 'Overview', helper: 'Platform health' },
  { id: 'settings', label: 'Website settings', helper: 'Brand and contact details' },
  { id: 'inquiries', label: 'Inquiries', helper: 'Consultation requests' },
  { id: 'content', label: 'Content model', helper: 'Editable collections' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [platform, setPlatform] = useState<PlatformStatus | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(blankSettings);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadOverview() {
    setLoading(true);
    try {
      const platformResponse = await adminFetch('/api/admin/status');
      if (platformResponse.ok) setPlatform(await platformResponse.json());
      const metricResponse = await adminFetch('/api/admin/metrics');
      if (metricResponse.ok) setMetrics(await metricResponse.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadOverview(); }, []);

  useEffect(() => {
    if (activeTab === 'settings' && platform?.databaseConfigured) {
      adminFetch('/api/admin/settings').then(async (response) => {
        if (response.ok) setSettings((await response.json()).settings);
      }).catch(() => setNotice('Website settings could not be loaded.'));
    }
    if (activeTab === 'inquiries' && platform?.databaseConfigured) {
      adminFetch('/api/admin/inquiries').then(async (response) => {
        if (response.ok) setInquiries((await response.json()).enquiries);
      }).catch(() => setNotice('Inquiries could not be loaded.'));
    }
  }, [activeTab, platform?.databaseConfigured]);

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    setNotice('Saving website settings…');
    try {
      const response = await adminFetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Settings could not be saved.');
      setSettings(result.settings);
      setNotice('Website settings saved. Public pages will use the new values after refresh.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Settings could not be saved.');
    }
  }

  async function updateInquiry(id: string, status: Inquiry['status'], internalNotes: string) {
    const response = await adminFetch('/api/admin/inquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status, internalNotes }) });
    const result = await response.json();
    if (!response.ok) {
      setNotice(result.message || 'Inquiry could not be updated.');
      return;
    }
    setInquiries((current) => current.map((item) => item.id === id ? result.enquiry : item));
    setNotice('Inquiry changes saved.');
  }

  async function logout() {
    await adminFetch('/api/admin/logout', { method: 'POST' });
    clearAdminSession();
    window.location.assign('/admin/login');
  }

  const databaseConfigured = Boolean(platform?.databaseConfigured);

  return <main className="min-h-screen bg-background text-foreground">
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b lg:border-b-0 lg:border-r border-border p-5 lg:p-7">
        <Link href="/" className="flex items-center gap-3"><MESLogo size={36} /><span className="font-bold text-sm">{settings.companyName || 'Mech Engineer Soft'}</span></Link>
        <div className="mt-8 flex gap-2 overflow-x-auto lg:block lg:space-y-2" role="tablist" aria-label="Admin navigation">
          {tabItems.map((item) => <button key={item.id} onClick={() => { setActiveTab(item.id); setNotice(''); }} className={`shrink-0 w-auto lg:w-full rounded-xl px-4 py-3 text-left transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`} role="tab" aria-selected={activeTab === item.id}><span className="block text-sm font-semibold">{item.label}</span><span className={`hidden lg:block text-xs mt-1 ${activeTab === item.id ? 'text-white/70' : 'text-muted-foreground'}`}>{item.helper}</span></button>)}
        </div>
        <div className="mt-8 pt-6 border-t border-border hidden lg:block"><Link href="/" className="text-sm text-muted-foreground hover:text-accent">View public website ↗</Link><button onClick={logout} className="block mt-4 text-sm text-muted-foreground hover:text-red-300">Sign out</button></div>
      </aside>
      <section className="p-6 md:p-10 max-w-7xl w-full mx-auto lg:mx-0">
        <header className="flex gap-5 justify-between items-start"><div><p className="section-label mb-3">Owner workspace</p><h1 className="text-3xl md:text-4xl font-extrabold">{tabItems.find((item) => item.id === activeTab)?.label}</h1></div><button onClick={logout} className="lg:hidden text-sm text-muted-foreground hover:text-red-300">Sign out</button></header>
        {notice && <div role="status" className="mt-7 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">{notice}</div>}
        {activeTab === 'overview' && <Overview platform={platform} metrics={metrics} loading={loading} onOpenTab={setActiveTab} onRefresh={() => void loadOverview()} />}
        {activeTab === 'settings' && <SettingsPanel settings={settings} onChange={setSettings} onSubmit={saveSettings} databaseConfigured={databaseConfigured} />}
        {activeTab === 'inquiries' && <InquiriesPanel inquiries={inquiries} updateInquiry={updateInquiry} databaseConfigured={databaseConfigured} />}
        {activeTab === 'content' && <ContentManager databaseConfigured={databaseConfigured} onNotice={setNotice} />}
      </section>
    </div>
  </main>;
}

function Overview({ platform, metrics, loading, onOpenTab, onRefresh }: { platform: PlatformStatus | null; metrics: Metrics | null; loading: boolean; onOpenTab: (tab: Tab) => void; onRefresh: () => void }) {
  const setupItems = [{ label: 'Database', ready: Boolean(platform?.databaseConfigured), detail: 'DATABASE_URL' }, { label: 'Admin access', ready: Boolean(platform?.authenticationConfigured), detail: 'ADMIN_PASSWORD + ADMIN_AUTH_SECRET' }, { label: 'Email notifications', ready: Boolean(platform?.emailConfigured), detail: 'EMAIL_FROM + EMAIL_API_KEY' }];
  const countCards: { label: string; value: number | undefined; tab: Tab }[] = [{ label: 'Inquiries', value: metrics?.counts?.inquiries, tab: 'inquiries' }, { label: 'Services', value: metrics?.counts?.services, tab: 'content' }, { label: 'Portfolio items', value: metrics?.counts?.portfolio, tab: 'content' }, { label: 'Insight posts', value: metrics?.counts?.posts, tab: 'content' }];
  return <div className="mt-10 space-y-8">
    <div className="flex items-center justify-between gap-4"><p className="text-sm text-muted-foreground">{loading ? 'Refreshing platform data…' : 'Live database-backed workspace'}</p><button type="button" onClick={onRefresh} disabled={loading} className="btn-secondary px-4 py-2 text-sm disabled:opacity-50">Refresh data</button></div>
    {loading ? <p className="text-muted-foreground">Checking platform health…</p> : <><section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{countCards.map((card) => <button type="button" key={card.label} onClick={() => onOpenTab(card.tab)} className="glass-card rounded-2xl p-5 text-left hover:border-primary/60 hover:-translate-y-0.5 transition-all"><p className="text-xs text-muted-foreground">{card.label}</p><p className="text-3xl font-extrabold mt-3">{metrics?.databaseConfigured ? card.value ?? 0 : '—'}</p><p className="text-xs text-accent mt-2">{metrics?.databaseConfigured ? 'Open collection →' : 'Connect the database to activate'}</p></button>)}</section><section className="glass-card rounded-3xl p-6 md:p-8"><div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5"><div><h2 className="text-xl font-bold">Launch readiness</h2><p className="text-sm text-muted-foreground mt-2 max-w-xl">Click any workspace section to manage live settings, enquiries, or content records.</p></div><span className="rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-muted-foreground">{setupItems.filter((item) => item.ready).length}/3 connected</span></div><div className="mt-7 grid md:grid-cols-3 gap-4">{setupItems.map((item) => <div key={item.label} className="rounded-2xl border border-border p-4"><span className={`inline-flex w-2.5 h-2.5 rounded-full ${item.ready ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]' : 'bg-amber-400'}`} /><h3 className="font-semibold mt-4">{item.label}</h3><p className="font-mono-custom text-[11px] text-muted-foreground mt-2">{item.ready ? 'Connected' : `Set ${item.detail}`}</p></div>)}</div></section><section className="grid lg:grid-cols-2 gap-5"><button type="button" onClick={() => onOpenTab('settings')} className="glass-card rounded-3xl p-6 text-left hover:border-primary/60 transition-colors"><p className="section-label text-[10px]">Website settings</p><h2 className="text-xl font-bold mt-4">Edit public contact and brand information</h2><p className="text-sm text-muted-foreground leading-relaxed mt-3">Changes save to PostgreSQL and are read by the public website.</p></button><button type="button" onClick={() => onOpenTab('content')} className="glass-card rounded-3xl p-6 text-left hover:border-primary/60 transition-colors"><p className="section-label text-[10px]">Content model</p><h2 className="text-xl font-bold mt-4">Create and manage published content</h2><p className="text-sm text-muted-foreground leading-relaxed mt-3">Edit services, portfolio projects, insights, and testimonials without changing code.</p></button></section></>}
  </div>;
}

function SettingsPanel({ settings, onChange, onSubmit, databaseConfigured }: { settings: SiteSettings; onChange: (settings: SiteSettings) => void; onSubmit: (event: FormEvent) => void; databaseConfigured: boolean }) {
  if (!databaseConfigured) return <SetupRequired title="Connect PostgreSQL to manage live website settings." detail="The database connection is required for changes to persist and appear on the public site." />;
  const field = (key: keyof SiteSettings, label: string, type = 'text') => <label className="block"><span className="text-sm font-semibold">{label}</span><input type={type} value={typeof settings[key] === 'string' ? settings[key] as string : ''} onChange={(event) => onChange({ ...settings, [key]: event.target.value })} className="form-input mt-2" /></label>;
   return <form onSubmit={onSubmit} className="mt-10 glass-card rounded-3xl p-6 md:p-8"><div className="mb-7 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">These values are live website settings. Save, then refresh any public page to see the update. The business email is also the recipient for enquiry and newsletter notifications.</div><div className="grid md:grid-cols-2 gap-5">{field('companyName', 'Company name')}{field('tagline', 'Tagline')}{field('businessEmail', 'Business email', 'email')}{field('phone', 'Phone number')}{field('primaryColor', 'Brand colour')}<label className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 mt-7"><input type="checkbox" checked={settings.maintenanceMode} onChange={(event) => onChange({ ...settings, maintenanceMode: event.target.checked })} /><span className="text-sm font-semibold">Maintenance mode</span></label><label className="block md:col-span-2"><span className="text-sm font-semibold">Business address</span><textarea value={settings.address} onChange={(event) => onChange({ ...settings, address: event.target.value })} className="form-input mt-2 min-h-28" /></label></div><div className="mt-7 rounded-2xl border border-border bg-secondary/30 p-4 text-sm"><p className="font-semibold">Email notification setup</p><p className="text-muted-foreground mt-2 leading-relaxed">Set <span className="font-mono text-foreground">EMAIL_FROM</span> and <span className="font-mono text-foreground">EMAIL_API_KEY</span> in Replit Secrets. Do not put the API key in this form or in frontend code. Notifications are sent to the Business email above.</p></div><button className="btn-primary mt-7 px-6 py-3 text-sm">Save website settings</button></form>;
}

function InquiriesPanel({ inquiries, updateInquiry, databaseConfigured }: { inquiries: Inquiry[]; updateInquiry: (id: string, status: Inquiry['status'], internalNotes: string) => Promise<void>; databaseConfigured: boolean }) {
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  if (!databaseConfigured) return <SetupRequired title="Connect PostgreSQL to collect and manage enquiries." detail="The public consultation form writes requests to this database." />;
  return <div className="mt-10 space-y-4">{inquiries.length === 0 ? <div className="glass-card rounded-3xl p-10 text-center"><h2 className="text-xl font-bold">No enquiries yet</h2><p className="text-sm text-muted-foreground mt-3">New consultation requests will appear here after someone submits the public form.</p></div> : inquiries.map((inquiry) => <article key={inquiry.id} className="glass-card rounded-2xl p-5"><div className="flex flex-col xl:flex-row xl:justify-between gap-5"><div className="min-w-0"><h2 className="font-bold">{inquiry.name} <span className="font-normal text-muted-foreground">· {inquiry.company}</span></h2><p className="text-sm text-accent mt-1">{inquiry.email} · {inquiry.phone} · {inquiry.meetingType}</p><p className="text-xs text-muted-foreground mt-2">{inquiry.preferredDate || 'Flexible date'} {inquiry.preferredTime ? `· ${inquiry.preferredTime}` : ''}</p><p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-3xl">{inquiry.projectSummary}</p></div><div className="xl:w-80 shrink-0 space-y-3"><label className="block"><span className="text-xs font-semibold">Status</span><select value={inquiry.status} onChange={(event) => void updateInquiry(inquiry.id, event.target.value as Inquiry['status'], draftNotes[inquiry.id] ?? inquiry.internalNotes ?? '')} className="form-input text-sm py-2 mt-1"><option value="new">New</option><option value="in_progress">In progress</option><option value="replied">Replied</option><option value="archived">Archived</option></select></label><label className="block"><span className="text-xs font-semibold">Internal notes</span><textarea value={draftNotes[inquiry.id] ?? inquiry.internalNotes ?? ''} onChange={(event) => setDraftNotes((current) => ({ ...current, [inquiry.id]: event.target.value }))} className="form-input mt-1 min-h-20 text-sm" placeholder="Add notes for your team…" /></label><button type="button" onClick={() => void updateInquiry(inquiry.id, inquiry.status, draftNotes[inquiry.id] ?? inquiry.internalNotes ?? '')} className="btn-secondary w-full py-2 text-sm">Save inquiry changes</button></div></div></article>)}</div>;
}

function SetupRequired({ title, detail }: { title: string; detail: string }) { return <section className="mt-10 glass-card rounded-3xl p-8 md:p-10"><p className="section-label mb-4">Database unavailable</p><h2 className="text-2xl font-bold max-w-2xl">{title}</h2><p className="text-muted-foreground leading-relaxed mt-4 max-w-xl">{detail}</p></section>; }