import { useEffect, useMemo, useState } from 'react';
import { adminFetch } from '../admin-api';
import { Project, projects } from '@/app/portfolio/data/projects';

type CollectionKey = 'services' | 'portfolio' | 'insights' | 'testimonials' | 'about';
type FieldType = 'text' | 'textarea' | 'array' | 'boolean' | 'select' | 'json';
type FormValue = string | boolean | string[] | null | Record<string, unknown>;
type ContentItem = { id: string; [key: string]: unknown };
type Field = { key: string; label: string; type: FieldType; required?: boolean; options?: string[] };
type CollectionConfig = { label: string; singular: string; fields: Field[]; empty: Record<string, FormValue> };

const configs: Record<CollectionKey, CollectionConfig> = {
  services: {
    label: 'Services',
    singular: 'service',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'summary', label: 'Summary', type: 'textarea', required: true },
      { key: 'icon', label: 'Icon name', type: 'text', required: true },
      { key: 'features', label: 'Features (one per line)', type: 'array' },
      { key: 'displayOrder', label: 'Display order', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
    ],
    empty: { title: '', slug: '', summary: '', icon: 'CodeBracketIcon', features: [], displayOrder: '0', status: 'draft' },
  },
  portfolio: {
    label: 'Portfolio',
    singular: 'portfolio item',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text', required: true },
      { key: 'summary', label: 'Summary', type: 'textarea', required: true },
      { key: 'content', label: 'Full case study', type: 'textarea', required: true },
      { key: 'tags', label: 'Tags (one per line)', type: 'array' },
      { key: 'technologies', label: 'Technologies (one per line)', type: 'array' },
      { key: 'features', label: 'Features (one per line)', type: 'array' },
      { key: 'challenge', label: 'The challenge', type: 'textarea' },
      { key: 'solution', label: 'The solution', type: 'textarea' },
      { key: 'benefits', label: 'Benefits (one per line)', type: 'array' },
      { key: 'futureScope', label: 'Future scope (one per line)', type: 'array' },
      { key: 'clientType', label: 'Client type', type: 'text' },
      { key: 'coverColor', label: 'Cover gradient classes', type: 'text' },
      { key: 'accentColor', label: 'Accent colour', type: 'text' },
      { key: 'icon', label: 'Icon / emoji', type: 'text' },
      { key: 'mockupType', label: 'Mockup type', type: 'select', options: ['desktop', 'laptop', 'tablet', 'mobile', 'dashboard'] },
      { key: 'demoUrl', label: 'Demo URL', type: 'text' },
      { key: 'githubUrl', label: 'GitHub URL', type: 'text' },
      { key: 'coverImage', label: 'Cover image URL', type: 'text' },
      { key: 'featured', label: 'Featured project', type: 'boolean' },
      { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
    ],
    empty: { title: '', slug: '', category: '', summary: '', content: '', tags: [], technologies: [], features: [], challenge: '', solution: '', benefits: [], futureScope: [], clientType: '', coverImage: null, coverColor: 'from-slate-800/80 to-blue-900/80', accentColor: '#0A7BFF', icon: '◈', mockupType: 'dashboard', demoUrl: null, githubUrl: null, featured: false, status: 'published' },
  },
  insights: {
    label: 'Insights',
    singular: 'insight',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text', required: true },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
      { key: 'content', label: 'Article content', type: 'textarea', required: true },
      { key: 'coverImage', label: 'Cover image URL', type: 'text' },
      { key: 'seoTitle', label: 'SEO title', type: 'text' },
      { key: 'seoDescription', label: 'SEO description', type: 'textarea' },
      { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
    ],
    empty: { title: '', slug: '', category: '', excerpt: '', content: '', coverImage: null, seoTitle: null, seoDescription: null, status: 'draft' },
  },
  testimonials: {
    label: 'Testimonials',
    singular: 'testimonial',
    fields: [
      { key: 'name', label: 'Client name', type: 'text', required: true },
      { key: 'company', label: 'Company', type: 'text', required: true },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'quote', label: 'Quote', type: 'textarea', required: true },
      { key: 'photo', label: 'Photo URL', type: 'text' },
      { key: 'displayOrder', label: 'Display order', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
    ],
    empty: { name: '', company: '', role: null, quote: '', photo: null, displayOrder: '0', status: 'draft' },
  },
  about: {
    label: 'About page',
    singular: 'About page',
    fields: [
      { key: 'slug', label: 'Page key', type: 'text', required: true },
      { key: 'heroTitle', label: 'Hero title', type: 'textarea', required: true },
      { key: 'heroDescription', label: 'Hero description', type: 'textarea', required: true },
      { key: 'whoHeading', label: 'Who we are heading', type: 'text', required: true },
      { key: 'whoParagraphs', label: 'Who we are paragraphs (one per line)', type: 'array' },
      { key: 'founderLabel', label: 'Founder label', type: 'text' },
      { key: 'founderName', label: 'Founder name', type: 'text', required: true },
      { key: 'founderRole', label: 'Founder role', type: 'text' },
      { key: 'founderCredentials', label: 'Founder credentials', type: 'text' },
      { key: 'founderBio', label: 'Founder biography (one paragraph per line)', type: 'array' },
      { key: 'founderQuote', label: 'Founder quote', type: 'textarea' },
      { key: 'founderImage', label: 'Founder image URL', type: 'text' },
      { key: 'founderChips', label: 'Founder highlights (one per line)', type: 'array' },
      { key: 'missionHeadline', label: 'Mission headline', type: 'text' },
      { key: 'missionBody', label: 'Mission body', type: 'textarea' },
      { key: 'visionHeadline', label: 'Vision headline', type: 'text' },
      { key: 'visionBody', label: 'Vision body', type: 'textarea' },
      { key: 'timeline', label: 'Journey timeline (JSON)', type: 'json' },
      { key: 'coreValues', label: 'Core values (JSON)', type: 'json' },
      { key: 'education', label: 'Education (JSON)', type: 'json' },
      { key: 'skillGroups', label: 'Skill groups (JSON)', type: 'json' },
      { key: 'differentiators', label: 'Why us differentiators (JSON)', type: 'json' },
      { key: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
    ],
    empty: { slug: 'about', heroTitle: '', heroDescription: '', whoHeading: '', whoParagraphs: [], founderLabel: 'Founder', founderName: '', founderRole: '', founderCredentials: '', founderBio: [], founderQuote: '', founderImage: null, founderChips: [], missionHeadline: '', missionBody: '', visionHeadline: '', visionBody: '', timeline: [], coreValues: [], education: [], skillGroups: [], differentiators: [], status: 'published' },
  },
};

function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.join('\n');
  if (value && typeof value === 'object') return JSON.stringify(value, null, 2);
  if (value === null || value === undefined) return '';
  return String(value);
}

export default function ContentManager({ databaseConfigured, onNotice }: { databaseConfigured: boolean; onNotice: (message: string) => void }) {
  const [collection, setCollection] = useState<CollectionKey>('services');
  const [items, setItems] = useState<ContentItem[]>([]);
  const [form, setForm] = useState<Record<string, FormValue>>(configs.services.empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const config = useMemo(() => configs[collection], [collection]);

  async function loadItems(nextCollection = collection) {
    setLoading(true);
    try {
      const response = await adminFetch(`/api/admin/content/${nextCollection}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Content could not be loaded.');
      setItems(Array.isArray(result.items) ? result.items : []);
    } catch (error) {
      onNotice(error instanceof Error ? error.message : 'Content could not be loaded.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadItems(collection); }, [collection]);

  function selectCollection(nextCollection: CollectionKey) {
    setCollection(nextCollection);
    setEditingId(null);
    setForm(configs[nextCollection].empty);
  }

  function startNew() {
    setEditingId(null);
    setForm({ ...config.empty });
  }

  function startEdit(item: ContentItem) {
    const nextForm: Record<string, FormValue> = { ...config.empty };
    for (const field of config.fields) {
      const value = (collection === 'portfolio' || collection === 'about') && item[collection === 'about' ? 'content' : 'metadata'] && typeof item[collection === 'about' ? 'content' : 'metadata'] === 'object'
        ? ((item[collection === 'about' ? 'content' : 'metadata'] as Record<string, unknown>)[field.key] ?? item[field.key])
        : item[field.key];
      nextForm[field.key] = Array.isArray(value) ? value.map(String) : (value as FormValue);
    }
    setEditingId(item.id);
    setForm(nextForm);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateField(key: string, value: FormValue) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    const payload: Record<string, FormValue> = { ...form };
    for (const field of config.fields) {
      if (field.type === 'array') payload[field.key] = String(form[field.key] || '').split('\n').map((value) => value.trim()).filter(Boolean);
      if (field.type === 'json') {
        try {
          payload[field.key] = JSON.parse(String(form[field.key] || '[]'));
        } catch {
          onNotice(`${field.label} must contain valid JSON.`);
          setSaving(false);
          return;
        }
      }
      if (field.type === 'text' || field.type === 'textarea') {
        const value = String(form[field.key] ?? '').trim();
        payload[field.key] = value || (field.required ? '' : null);
      }
    }
    if (collection === 'portfolio') {
      const metadataKeys = ['tags', 'features', 'challenge', 'solution', 'benefits', 'futureScope', 'clientType', 'coverColor', 'accentColor', 'icon', 'mockupType', 'demoUrl', 'githubUrl'];
      const metadata: Record<string, unknown> = {};
      for (const key of metadataKeys) {
        metadata[key] = payload[key] ?? null;
        delete payload[key];
      }
      payload.metadata = metadata;
    }
    if (collection === 'about') {
      const content: Record<string, unknown> = {};
      for (const field of config.fields) {
        if (field.key !== 'slug' && field.key !== 'status') content[field.key] = payload[field.key] ?? null;
        delete payload[field.key];
      }
      payload.content = content;
    }
    try {
      const response = await adminFetch(editingId ? `/api/admin/content/${collection}/${editingId}` : `/api/admin/content/${collection}`, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Content could not be saved.');
      setItems((current) => editingId ? current.map((item) => item.id === editingId ? result.item : item) : [result.item, ...current]);
      onNotice(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} saved.`);
      startNew();
    } catch (error) {
      onNotice(error instanceof Error ? error.message : 'Content could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: ContentItem) {
    if (!window.confirm(`Delete this ${config.singular}? This cannot be undone.`)) return;
    const response = await adminFetch(`/api/admin/content/${collection}/${item.id}`, { method: 'DELETE' });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      onNotice(result.message || 'Content could not be deleted.');
      return;
    }
    setItems((current) => current.filter((entry) => entry.id !== item.id));
    if (editingId === item.id) startNew();
    onNotice(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} deleted.`);
  }

  async function restoreOriginalPortfolio() {
    if (collection !== 'portfolio' || items.length > 0) return;
    setSaving(true);
    try {
      for (const project of projects) {
        const response = await adminFetch('/api/admin/content/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(toPortfolioPayload(project)),
        });
        if (!response.ok) throw new Error('The original portfolio could not be restored.');
      }
      await loadItems('portfolio');
      onNotice('The original portfolio has been restored to the database. You can edit each project now.');
    } catch (error) {
      onNotice(error instanceof Error ? error.message : 'The original portfolio could not be restored.');
    } finally {
      setSaving(false);
    }
  }

  if (!databaseConfigured) {
    return <div className="mt-10 glass-card rounded-3xl p-8"><p className="section-label mb-4">Database unavailable</p><h2 className="text-2xl font-bold">Connect PostgreSQL to edit content.</h2><p className="text-sm text-muted-foreground mt-3">The database connection is required for content changes to persist.</p></div>;
  }

  return <div className="mt-8 space-y-6">
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Content collections">
      {(Object.keys(configs) as CollectionKey[]).map((key) => <button key={key} type="button" role="tab" aria-selected={collection === key} onClick={() => selectCollection(key)} className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${collection === key ? 'border-primary bg-primary/15 text-foreground' : 'border-border text-muted-foreground hover:text-foreground'}`}>{configs[key].label}</button>)}
    </div>
    <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4"><div><p className="section-label text-[10px]">Live collection</p><h2 className="text-2xl font-bold mt-2">{config.label}</h2></div><button type="button" onClick={startNew} className="btn-primary px-4 py-2.5 text-sm">+ New {config.singular}</button></div>
        {loading ? <div className="glass-card rounded-2xl p-8 text-sm text-muted-foreground">Loading {config.label.toLowerCase()}…</div> : items.length === 0 ? <div className="glass-card rounded-2xl p-8 text-sm text-muted-foreground">{collection === 'portfolio' ? <><p>Your original portfolio is still preserved in the website source. Restore all 11 projects into the database so you can edit their full details here.</p><button type="button" onClick={() => void restoreOriginalPortfolio()} disabled={saving} className="btn-primary mt-5 px-4 py-2.5 text-sm disabled:opacity-60">{saving ? 'Restoring…' : 'Restore original portfolio'}</button></> : <>No {config.label.toLowerCase()} yet. Create the first one using the editor.</>}</div> : items.map((item) => <article key={item.id} className={`glass-card rounded-2xl p-5 ${editingId === item.id ? 'border-primary/60' : ''}`}><div className="flex items-start justify-between gap-4"><div><h3 className="font-bold">{String(item.title || item.name || (item.content as Record<string, unknown> | undefined)?.founderName || 'Untitled')}</h3><p className="text-xs text-muted-foreground mt-1">{String(item.slug || item.company || item.category || '')} · {String(item.status || 'draft')}</p><p className="text-sm text-muted-foreground mt-3 line-clamp-2">{String(item.summary || item.excerpt || item.quote || (item.content as Record<string, unknown> | undefined)?.founderQuote || '')}</p></div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => startEdit(item)} className="btn-secondary px-3 py-2 text-xs">Edit</button><button type="button" onClick={() => void remove(item)} className="rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-300 hover:bg-red-500/10">Delete</button></div></div></article>)}
      </section>
      <form onSubmit={save} className="glass-card rounded-2xl p-5 xl:sticky xl:top-6">
        <div className="flex items-start justify-between gap-3"><div><p className="section-label text-[10px]">{editingId ? 'Edit item' : 'Create item'}</p><h2 className="text-xl font-bold mt-2">{editingId ? `Edit ${config.singular}` : `New ${config.singular}`}</h2></div>{editingId && <button type="button" onClick={startNew} className="text-xs text-muted-foreground hover:text-foreground">Cancel</button>}</div>
        <div className="mt-5 space-y-4">{config.fields.map((field) => <label key={field.key} className={field.type === 'textarea' || field.type === 'array' || field.type === 'json' ? 'block' : 'block'}><span className="text-sm font-semibold">{field.label}</span>{field.type === 'boolean' ? <span className="mt-2 flex items-center gap-3"><input type="checkbox" checked={Boolean(form[field.key])} onChange={(event) => updateField(field.key, event.target.checked)} /><span className="text-sm text-muted-foreground">Enabled</span></span> : field.type === 'select' ? <select value={String(form[field.key] || '')} onChange={(event) => updateField(field.key, event.target.value)} className="form-input mt-2">{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.type === 'textarea' || field.type === 'array' || field.type === 'json' ? <textarea required={field.required} value={displayValue(form[field.key])} onChange={(event) => updateField(field.key, event.target.value)} className={`form-input mt-2 ${field.type === 'json' ? 'min-h-48 font-mono text-xs' : 'min-h-24'}`} placeholder={field.type === 'array' ? 'One item per line' : field.type === 'json' ? '{\n  \"key\": \"value\"\n}' : ''} /> : <input required={field.required} type="text" value={displayValue(form[field.key])} onChange={(event) => updateField(field.key, event.target.value)} className="form-input mt-2" />}</label>)}</div>
        <button type="submit" disabled={saving} className="btn-primary w-full mt-6 py-3 text-sm disabled:opacity-60">{saving ? 'Saving…' : editingId ? 'Save changes' : `Create ${config.singular}`}</button>
      </form>
    </div>
  </div>;
}

function toPortfolioPayload(project: Project) {
  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    summary: project.shortDesc,
    content: project.longDesc,
    technologies: project.tech,
    coverImage: null,
    featured: project.featured,
    status: 'published',
    metadata: {
      tags: project.tags,
      features: project.features,
      challenge: project.challenge,
      solution: project.solution,
      benefits: project.benefits,
      futureScope: project.futureScope,
      clientType: project.clientType,
      coverColor: project.coverColor,
      accentColor: project.accentColor,
      icon: project.icon,
      mockupType: project.mockupType,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
    },
  };
}