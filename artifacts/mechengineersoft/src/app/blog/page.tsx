import type { Metadata } from '@/lib/metadata';
import Link from '@/components/StaticLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/app/components/StickyCTA';
import { articles } from './data';
import { usePublicContent } from '@/app/use-public-content';

export const metadata: Metadata = { title: 'Insights | Mech Engineer Soft', description: 'Practical notes on business software, automation, ERP, and operations.', alternates: { canonical: '/blog' } };

export default function BlogPage() {
  const storedArticles = usePublicContent('insights', []);
  const displayedArticles = storedArticles.length > 0
    ? storedArticles.map((article: { slug: string; category: string; title: string; excerpt: string; content: string; publishedAt?: string | null }) => ({
      slug: article.slug,
      category: article.category,
      title: article.title,
      excerpt: article.excerpt,
      date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'Published insight',
      readTime: `${Math.max(1, Math.ceil(article.content.trim().split(/\s+/).length / 220))} min read`,
      body: article.content.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean),
    }))
    : articles;
  return <><Header /><main className="pt-32 pb-24 px-6 min-h-screen"><section className="max-w-7xl mx-auto"><p className="section-label mb-4">Insights</p><h1 className="text-display font-extrabold max-w-3xl">Clear thinking for smarter business systems.</h1><p className="mt-6 text-lg text-muted-foreground max-w-2xl">Practical perspectives on software, automation, reporting, and the operations behind them.</p><div className="grid md:grid-cols-3 gap-5 mt-14">{displayedArticles.map((article, i) => <article key={article.slug} className={`glass-card glass-card-hover rounded-3xl p-7 flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}><p className="section-label text-[10px]">{article.category}</p><h2 className="text-2xl font-bold mt-5 leading-snug">{article.title}</h2><p className="text-sm text-muted-foreground leading-relaxed mt-4">{article.excerpt}</p><div className="mt-auto pt-8 flex justify-between items-center text-xs text-muted-foreground"><span>{article.date} · {article.readTime}</span><Link className="text-accent font-semibold hover:underline" href={`/blog/${article.slug}`}>Read article</Link></div></article>)}</div></section></main><Footer /><StickyCTA /></>;
}