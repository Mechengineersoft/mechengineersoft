import Link from '@/components/StaticLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type LegalPageProps = { title: string; updated: string; sections: { heading: string; copy: string }[] };
export default function LegalPage({ title, updated, sections }: LegalPageProps) {
  return <><Header /><main className="pt-32 pb-24 px-6 min-h-screen"><article className="max-w-3xl mx-auto"><p className="section-label mb-4">Legal</p><h1 className="text-display font-extrabold">{title}</h1><p className="mt-5 text-sm text-muted-foreground">Last updated: {updated}</p><div className="mt-12 space-y-10">{sections.map((section) => <section key={section.heading}><h2 className="text-xl font-bold">{section.heading}</h2><p className="mt-3 text-muted-foreground leading-7">{section.copy}</p></section>)}</div><p className="mt-12 text-sm text-muted-foreground">Questions about this page? <Link href="/contact" className="text-accent hover:underline">Contact Mech Engineer Soft</Link>.</p></article></main><Footer /></>;
}
