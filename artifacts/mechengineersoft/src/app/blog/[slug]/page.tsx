import type { Metadata } from '@/lib/metadata';
import { useParams } from 'wouter';
import Link from '@/components/StaticLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles } from '../data';
import { usePublicContent } from '@/app/use-public-content';

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const storedArticles = usePublicContent('insights', []);
  const article = (storedArticles.length > 0
    ? storedArticles.map((item: { slug: string; category: string; title: string; content: string; publishedAt?: string | null }) => ({
      slug: item.slug,
      category: item.category,
      title: item.title,
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'Published insight',
      readTime: `${Math.max(1, Math.ceil(item.content.trim().split(/\s+/).length / 220))} min read`,
      body: item.content.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean),
    }))
    : articles).find((item) => item.slug === slug);
  if (!article) return <><Header /><main className="pt-40 pb-24 px-6 min-h-screen text-center"><h1 className="text-display font-extrabold">Article not found</h1><Link href="/blog" className="inline-block mt-6 text-accent hover:underline">Back to insights</Link></main><Footer /></>;
  return <><Header /><main className="pt-32 pb-24 px-6 min-h-screen"><article className="max-w-3xl mx-auto"><Link href="/blog" className="text-sm text-accent hover:underline">← All insights</Link><p className="section-label mt-10 mb-4">{article.category}</p><h1 className="text-display font-extrabold">{article.title}</h1><p className="mt-5 text-sm text-muted-foreground">{article.date} · {article.readTime}</p><div className="mt-12 space-y-6 text-lg text-foreground/80 leading-8">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-14 p-7 glass-card rounded-2xl"><p className="font-semibold">Thinking about a workflow like this?</p><Link href="/contact" className="inline-block mt-3 text-sm text-accent hover:underline">Talk through your project →</Link></div></article></main><Footer /></>;
}
