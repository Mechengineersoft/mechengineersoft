import { useEffect, useState } from 'react';

export type AboutContent = {
  heroTitle: string;
  heroDescription: string;
  whoHeading: string;
  whoParagraphs: string[];
  founderLabel: string;
  founderName: string;
  founderRole: string;
  founderCredentials: string;
  founderBio: string[];
  founderQuote: string;
  founderImage: string;
  founderChips: string[];
  missionHeadline: string;
  missionBody: string;
  visionHeadline: string;
  visionBody: string;
};

export const defaultAboutContent: AboutContent = {
  heroTitle: 'Engineering Excellence. Software Innovation. Business Growth.',
  heroDescription: 'We are a modern software company that combines engineering precision with cutting-edge technology to build business software that actually works — the way your business works.',
  whoHeading: 'We build software that solves real problems',
  whoParagraphs: [
    'Mech Engineer Soft is a modern software company focused on creating digital solutions that solve real business problems. Our approach combines engineering thinking with modern software development to deliver scalable, efficient and reliable solutions.',
    "We don't simply develop websites. We design systems that improve productivity, automate workflows and help businesses grow. We believe software should reduce complexity rather than create it.",
    'From ERP systems and CRM platforms to inventory management and business dashboards — every product we build is designed with the end user in mind and the business outcome as the goal.',
  ],
  founderLabel: 'Founder',
  founderName: 'S M Waqaar Yezdani',
  founderRole: 'Business Software Developer',
  founderCredentials: 'M.Tech (Mechanical Engineering – Thermal Engineering) · MCA',
  founderBio: [
    'S M Waqaar Yezdani founded Mech Engineer Soft with the vision of combining engineering principles and modern software development to help businesses improve efficiency through technology.',
    'With a strong academic background in Mechanical Engineering and Computer Applications, he understands both industrial operations and modern software architecture.',
    'Experienced in developing solutions for production management, inventory systems, operational reporting and business process automation — his expertise spans business automation, custom software development, ERP systems, dashboards, and scalable web applications.',
  ],
  founderQuote: 'I am passionate about solving real business problems using software. My engineering background allows me to understand industrial processes while my software expertise enables me to build scalable digital solutions.',
  founderImage: '/assets/images/founder.jpg',
  founderChips: ['Engineering Mindset', 'Business Automation', 'Modern Software', 'Cloud Technologies'],
  missionHeadline: 'Empower through automation',
  missionBody: 'To empower businesses with intelligent software solutions that automate operations, increase productivity and accelerate growth — removing complexity, not adding it.',
  visionHeadline: "India's most trusted software company",
  visionBody: "To become one of India's most trusted software companies — delivering innovative digital products that serve manufacturers, healthcare, education, and enterprises worldwide.",
};

export function useAboutContent() {
  const [content, setContent] = useState<AboutContent>(defaultAboutContent);

  useEffect(() => {
    let active = true;
    fetch('/api/site/content/about', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) return;
        const result = await response.json();
        const remoteContent = result.items?.[0]?.content;
        if (active && remoteContent && typeof remoteContent === 'object') {
          setContent({ ...defaultAboutContent, ...remoteContent });
        }
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  return content;
}