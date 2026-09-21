'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from '@/components/StaticLink';
import MESLogo from '@/components/MESLogo';

type Tab = 'overview' | 'settings' | 'inquiries' | 'content';
type PlatformStatus = { databaseConfigured: boolean; authenticationConfigured: boolean; emailConfigured: boolean };
type Metrics = { databaseConfigured: boolean; counts: { inquiries: number; services: number; portfolio: number; posts: number } | null };
type SiteSettings = { companyName: string; tagline: string; businessEmail: string; phone: string; address: string; primaryColor: string; maintenanceMode: boolean };
type Inquiry = { id: string; name: string; email: string; company: string; meetingType: string; projectSummary: string; status: 'new' | 'in_progress' | 'replied' | 'archived'; createdAt: string };

const blankSettings: SiteSettings = { companyName: 'Mech Engineer Soft', tagline: 'Engineering Business Solutions Through Software', businessEmail: '--------', phone: '--------', address: '--------', primaryColor: '#2563EB', maintenanceMode: false };
const tabItems: { id: Tab; label: string; helper: string }[] = [
  { id: 'overview', label: 'Overview', helper: 'Platform health' },
  { id: 'settings', label: 'Website settings', helper: 'Brand and contact details' },
  { id: 'inquiries', label: 'Inquiries', helper: 'Consultation requests' },
  { id: 'content', label: 'Content model', helper: 'CMS-ready collections' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [platform, setPlatform] = useState<PlatformStatus | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(blankSettings);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  const loadOverview = async () => {
    const [platformResponse, metricResponse] = await Promise.all([fetch('/api/admin/status'), fetch('/api/admin/metrics')]);
    if (platformResponse.ok) setPlatform(await platformResponse.json());
    if (metricResponse.ok) setMetrics(await metricResponse.json());
    setLoading(false);
  };
  useEffect(() => { void loadOverview(); }, []);
  useEffect(() => {
    if (activeTab === 'settings' && platform?.databaseConfigured) {
      fetch('/api/admin/settings').then(async (response) => response.ok && setSettings((await response.json()).settings)).catch(() => undefined);
    }
    if (activeTab === 'inquiries' && platform?.databaseConfigured) {
      fetch('/api/admin/inquiries').then(async (response) => response.ok && setInquiries((await response.json()).enquiries)).catch(() => undefined);
    }
  }, [activeTab, platform?.databaseConfigured]);

  async function saveSettings(event: FormEvent) {
    event.preventDefault(); setNotice('Saving website settings…');
    const response = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    const result = await response.json();
    setNotice(response.ok ? 'Website settings saved.' : result.message || 'Settings could not be saved.');
  }
  async function updateInquiry(id: string, status: Inquiry['status']) {
    const response = await fetch('/api/admin/inquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    if (response.ok) setInquiries((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  }
  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); window.location.assign('/admin/login'); }

  return <main className="min-h-screen bg-background text-foreground">
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b lg:border-b-0 lg:border-r border-border p-5 lg:p-7">
        <Link href="/" className="flex items-center gap-3"><MESLogo size={36} /><span className="font-bold text-sm">Mech Engineer Soft</span></Link>
        <div className="mt-8 flex gap-2 overflow-x-auto lg:block lg:space-y-2" role="tablist" aria-label="Admin navigation">
          {tabItems.map((item) => <button key={item.id} onClick={() => { setActiveTab(item.id); setNotice(''); }} className={`shrink-0 w-auto lg:w-full rounded-xl px-4 py-3 text-left transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`} role="tab" aria-selected={activeTab === item.id}><span className="block text-sm font-semibold">{item.label}</span><span className={`hidden lg:block text-xs mt-1 ${activeTab === item.id ? 'text-white/70' : 'text-muted-foreground'}`}>{item.helper}</span></button>)}
        </div>
        <div className="mt-8 pt-6 border-t border-border hidden lg:block"><Link href="/" className="text-sm text-muted-foreground hover:text-accent">View public website ↗</Link><button onClick={logout} className="block mt-4 text-sm text-muted-foreground hover:text-red-300">Sign out</button></div>
      </aside>
      <section className="p-6 md:p-10 max-w-6xl w-full mx-auto lg:mx-0">
        <header className="flex gap-5 justify-between items-start"><div><p className="section-label mb-3">Owner workspace</p><h1 className="text-3xl md:text-4xl font-extrabold">{tabItems.find((item) => item.id === activeTab)?.label}</h1></div><button onClick={logout} className="lg:hidden text-sm text-muted-foreground hover:text-red-300">Sign out</button></header>
        {notice && <div role="status" className="mt-7 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">{notice}</div>}
        {activeTab === 'overview' && <Overview platform={platform} metrics={metrics} loading={loading} />}
        {activeTab === 'settings' && <SettingsPanel settings={settings} onChange={setSettings} onSubmit={saveSettings} databaseConfigured={Boolean(platform?.databaseConfigured)} />}
        {activeTab === 'inquiries' && <InquiriesPanel inquiries={inquiries} updateInquiry={updateInquiry} databaseConfigured={Boolean(platform?.databaseConfigured)} />}
        {activeTab === 'content' && <ContentPanel databaseConfigured={Boolean(platform?.databaseConfigured)} />}
      </section>
    </div>
  </main>;
}

function Overview({ platform, metrics, loading }: { platform: PlatformStatus | null; metrics: Metrics | null; loading: boolean }) {
  const setupItems = [{ label: 'Database', ready: Boolean(platform?.databaseConfigured), detail: 'DATABASE_URL' }, { label: 'Admin access', ready: Boolean(platform?.authenticationConfigured), detail: 'ADMIN_PASSWORD + ADMIN_AUTH_SECRET' }, { label: 'Email notifications', ready: Boolean(platform?.emailConfigured), detail: 'EMAIL_FROM + EMAIL_API_KEY' }];
  const countCards = [{ label: 'Inquiries', value: metrics?.counts?.inquiries }, { label: 'Services', value: metrics?.counts?.services }, { label: 'Portfolio items', value: metrics?.counts?.portfolio }, { label: 'Insight posts', value: metrics?.counts?.posts }];
  return <div className="mt-10 space-y-8">{loading ? <p className="text-muted-foreground">Checking platform health…</p> : <><section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{countCards.map((card) => <div key={card.label} className="glass-card rounded-2xl p-5"><p className="text-xs text-muted-foreground">{card.label}</p><p className="text-3xl font-extrabold mt-3">{metrics?.databaseConfigured ? card.value : '—'}</p><p className="text-xs text-muted-foreground mt-2">{metrics?.databaseConfigured ? 'Live database count' : 'Connect the database to activate'}</p></div>)}</section><section className="glass-card rounded-3xl p-6 md:p-8"><div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5"><div><h2 className="text-xl font-bold">Launch readiness</h2><p className="text-sm text-muted-foreground mt-2 max-w-xl">The public site is ready. Complete the items below to activate persistent CMS data, protected administration, and enquiry notifications.</p></div><span className="rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-muted-foreground">{setupItems.filter((item) => item.ready).length}/3 connected</span></div><div className="mt-7 grid md:grid-cols-3 gap-4">{setupItems.map((item) => <div key={item.label} className="rounded-2xl border border-border p-4"><span className={`inline-flex w-2.5 h-2.5 rounded-full ${item.ready ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]' : 'bg-amber-400'}`} /><h3 className="font-semibold mt-4">{item.label}</h3><p className="font-mono-custom text-[11px] text-muted-foreground mt-2">{item.ready ? 'Connected' : `Set ${item.detail}`}</p></div>)}</div></section><section className="grid lg:grid-cols-2 gap-5"><div className="glass-card rounded-3xl p-6"><p className="section-label text-[10px]">Security</p><h2 className="text-xl font-bold mt-4">Protected owner access</h2><p className="text-sm text-muted-foreground leading-relaxed mt-3">Admin sessions are signed with your private environment secret and expire after eight hours. No default credentials are included.</p></div><div className="glass-card rounded-3xl p-6"><p className="section-label text-[10px]">Data model</p><h2 className="text-xl font-bold mt-4">Designed for future expansion</h2><p className="text-sm text-muted-foreground leading-relaxed mt-3">The database already models website settings, services, portfolio, insights, testimonials, media, enquiries, appointments, activity logs, and newsletter subscribers.</p></div></section></>}</div>;
}

function SettingsPanel({ settings, onChange, onSubmit, databaseConfigured }: { settings: SiteSettings; onChange: (settings: SiteSettings) => void; onSubmit: (event: FormEvent) => void; databaseConfigured: boolean }) {
  if (!databaseConfigured) return <SetupRequired title="Connect PostgreSQL or Supabase to manage live website settings." detail="Add DATABASE_URL, run the included database migration, and return here to manage brand information without editing code." />;
  const field = (key: keyof SiteSettings, label: string, type = 'text') => <label className="block"><span className="text-sm font-semibold">{label}</span><input type={type} value={typeof settings[key] === 'string' ? settings[key] as string : ''} onChange={(event) => onChange({ ...settings, [key]: event.target.value })} className="form-input mt-2" /></label>;
  return <form onSubmit={onSubmit} className="mt-10 glass-card rounded-3xl p-6 md:p-8"><div className="grid md:grid-cols-2 gap-5">{field('companyName', 'Company name')}{field('tagline', 'Tagline')}{field('businessEmail', 'Business email', 'email')}{field('phone', 'Phone number')}{field('primaryColor', 'Brand colour')}<label className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 mt-7"><input type="checkbox" checked={settings.maintenanceMode} onChange={(event) => onChange({ ...settings, maintenanceMode: event.target.checked })} /><span className="text-sm font-semibold">Maintenance mode</span></label><label className="block md:col-span-2"><span className="text-sm font-semibold">Business address</span><textarea value={settings.address} onChange={(event) => onChange({ ...settings, address: event.target.value })} className="form-input mt-2 min-h-28" /></label></div><button className="btn-primary mt-7 px-6 py-3 text-sm">Save website settings</button></form>;
}

function InquiriesPanel({ inquiries, updateInquiry, databaseConfigured }: { inquiries: Inquiry[]; updateInquiry: (id: string, status: Inquiry['status']) => void; databaseConfigured: boolean }) {
  if (!databaseConfigured) return <SetupRequired title="Connect the database to collect and manage enquiries." detail="The public consultation form validates input and will persist every request once DATABASE_URL has been connected." />;
  return <div className="mt-10 space-y-4">{inquiries.length === 0 ? <div className="glass-card rounded-3xl p-10 text-center"><h2 className="text-xl font-bold">No enquiries yet</h2><p className="text-sm text-muted-foreground mt-3">New consultation requests will appear here.</p></div> : inquiries.map((inquiry) => <article key={inquiry.id} className="glass-card rounded-2xl p-5"><div className="flex flex-col md:flex-row md:justify-between gap-4"><div><h2 className="font-bold">{inquiry.name} <span className="font-normal text-muted-foreground">· {inquiry.company}</span></h2><p className="text-sm text-accent mt-1">{inquiry.email} · {inquiry.meetingType}</p><p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-3xl">{inquiry.projectSummary}</p></div><div className="shrink-0"><label className="sr-only" htmlFor={`status-${inquiry.id}`}>Inquiry status</label><select id={`status-${inquiry.id}`} value={inquiry.status} onChange={(event) => updateInquiry(inquiry.id, event.target.value as Inquiry['status'])} className="form-input text-sm py-2"><option value="new">New</option><option value="in_progress">In progress</option><option value="replied">Replied</option><option value="archived">Archived</option></select></div></div></article>)}</div>;
}

function ContentPanel({ databaseConfigured }: { databaseConfigured: boolean }) { const collections = [['Services', 'Structured service pages, features, icons, visibility'], ['Portfolio', 'Case studies, technologies, media, featured projects'], ['Insights', 'Search-optimised articles, categories, publication status'], ['Testimonials', 'Client quotes, profiles, display order'], ['Media library', 'Reusable uploads, folders, alt text, file metadata']]; return <div className="mt-10"><div className="glass-card rounded-3xl p-7"><p className="section-label text-[10px]">CMS architecture</p><h2 className="text-2xl font-bold mt-4">Content collections are ready in the database model.</h2><p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-2xl">This is the stable foundation for the full editor. Once the database is connected, content records can be added through these protected collections without changing the public-site architecture.</p></div><div className="grid md:grid-cols-2 gap-4 mt-5">{collections.map(([name, detail]) => <div key={name} className="glass-card rounded-2xl p-5"><span className={`inline-block w-2 h-2 rounded-full ${databaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`} /><h3 className="font-bold mt-4">{name}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-2">{detail}</p></div>)}</div></div>; }

function SetupRequired({ title, detail }: { title: string; detail: string }) { return <section className="mt-10 glass-card rounded-3xl p-8 md:p-10"><p className="section-label mb-4">Setup required</p><h2 className="text-2xl font-bold max-w-2xl">{title}</h2><p className="text-muted-foreground leading-relaxed mt-4 max-w-xl">{detail}</p><p className="mt-7 text-xs font-mono-custom text-accent">See .env.example and run npm run db:generate followed by npm run db:migrate.</p></section>; }
