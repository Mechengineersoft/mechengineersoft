import type { Metadata } from 'next';
import { projects, getProjectBySlug } from '../data/projects';
import ProjectDetail from './ProjectDetail';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found | Mech Engineer Soft' };
  return {
    title: `${project.title} | Portfolio | Mech Engineer Soft`,
    description: project.shortDesc,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} | Mech Engineer Soft`,
      description: project.shortDesc,
      url: `/portfolio/${project.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Mech Engineer Soft`,
      description: project.shortDesc,
    },
  };
}

export default function ProjectDetailPage() {
  return <ProjectDetail />;
}
