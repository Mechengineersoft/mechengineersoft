import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/StaticLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { articles } from '../data';

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = articles.find((item) => item.slug === slug); return article ? { title: `${article.title} | Mech Engineer Soft`, description: article.excerpt, alternates: { canonical: `/blog/${article.slug}` } } : {}; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = articles.find((item) => item.slug === slug); if (!article) notFound(); return <><Header /><main className="pt-32 pb-24 px-6 min-h-screen"><article className="max-w-3xl mx-auto"><Link href="/blog" className="text-sm text-accent hover:underline">← All insights</Link><p className="section-label mt-10 mb-4">{article.category}</p><h1 className="text-display font-extrabold">{article.title}</h1><p className="mt-5 text-sm text-muted-foreground">{article.date} · {article.readTime}</p><div className="mt-12 space-y-6 text-lg text-foreground/80 leading-8">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-14 p-7 glass-card rounded-2xl"><p className="font-semibold">Thinking about a workflow like this?</p><Link href="/contact" className="inline-block mt-3 text-sm text-accent hover:underline">Talk through your project →</Link></div></article></main><Footer /></>; }
