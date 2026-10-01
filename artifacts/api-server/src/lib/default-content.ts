import { db } from "@workspace/db";
import { aboutPages, blogPosts, contentSeedState, services, testimonials } from "@workspace/db/schema";
import type { AboutPageContent } from "@workspace/db/schema";

export const defaultServices = [
  { slug: "erp-systems", title: "ERP Systems", summary: "Custom ERP platforms built for manufacturers and mid-size enterprises. Unify procurement, production scheduling, finance, HR, and reporting in a single, role-based system.", icon: "CubeIcon", features: ["Multi-module architecture (Finance, HR, Production)", "Role-based access control", "Real-time reporting & KPI dashboards", "Mobile-responsive interface", "API integrations with existing tools"], displayOrder: "1", status: "published" as const },
  { slug: "crm-platforms", title: "CRM Platforms", summary: "Purpose-built CRM for B2B sales teams. Track leads from first contact to closed deal with automated follow-ups, pipeline analytics, and team performance dashboards.", icon: "UserGroupIcon", features: ["Lead & opportunity management", "Automated email follow-ups", "Sales pipeline visualization", "Activity logging & reminders", "Revenue forecasting reports"], displayOrder: "2", status: "published" as const },
  { slug: "inventory-management", title: "Inventory Management", summary: "Barcode-enabled inventory tracking with multi-warehouse support, automated reorder alerts, batch tracking, and supplier management — designed for manufacturers and distributors.", icon: "ArchiveBoxIcon", features: ["Barcode & QR code scanning", "Multi-warehouse management", "Automated reorder triggers", "Batch & expiry tracking", "Supplier & purchase order management"], displayOrder: "3", status: "published" as const },
  { slug: "dashboard-analytics", title: "Dashboard & Analytics", summary: "Interactive dashboards with live KPIs, drill-down reports, and role-based views. Connect to your existing databases, ERP, or CRM and surface the metrics your leadership team actually needs.", icon: "ChartBarIcon", features: ["Live KPI widgets", "Drill-down interactive charts", "Role-based data visibility", "Scheduled PDF report exports", "Multi-source data connectors"], displayOrder: "4", status: "published" as const },
  { slug: "business-automation", title: "Business Automation", summary: "Workflow automation, scheduled tasks, and API integrations that reduce manual data entry and repetitive operations by 60–80%. From invoice generation to approval chains.", icon: "BoltIcon", features: ["Visual workflow builder", "Scheduled job automation", "Third-party API webhooks", "Email & SMS trigger notifications", "Audit trail & rollback"], displayOrder: "5", status: "published" as const },
  { slug: "cloud-applications", title: "Cloud Applications", summary: "Cloud-native applications deployed on AWS or Azure with auto-scaling, CI/CD pipelines, and 99.9% uptime SLAs. Built for performance under real production load.", icon: "CloudIcon", features: ["AWS / Azure deployment", "Auto-scaling architecture", "CI/CD pipelines (GitHub Actions)", "SSL, WAF & security hardening", "99.9% uptime SLA"], displayOrder: "6", status: "published" as const },
];

export const defaultInsights = [
  { slug: "when-a-spreadsheet-becomes-a-system-risk", title: "When a spreadsheet becomes a system risk", excerpt: "The signs that a growing operation needs a connected business system—not another workbook.", content: "Spreadsheets are excellent for early exploration. They become fragile when several people need the same data, versions are emailed around, or a missed update changes a decision.\n\nA well-designed system brings ownership, permissions, reporting, and repeatable workflows into one place. The goal is not to replace every spreadsheet; it is to remove the operational risks around the ones that matter most.\n\nStart with the workflow that has the most manual hand-offs. Map what enters, who approves it, where errors appear, and what management needs to see. That sequence is often the best first software module.", category: "Business systems", status: "published" as const },
  { slug: "what-makes-an-erp-project-successful", title: "What makes an ERP project successful?", excerpt: "A practical way to turn business-process knowledge into a system people will actually use.", content: "An ERP succeeds when it makes the day-to-day job easier. Technology matters, but the project begins with process clarity: what is happening today, what should happen next, and where the hand-offs fail.\n\nBuild in small, measurable releases. Begin with the workflows that create the most duplicate entry or reporting delay, then use feedback from real users to refine the next module.\n\nA successful implementation also plans for ownership. Training, clear access roles, good data migration, and a support path matter just as much as the dashboard design.", category: "ERP", status: "published" as const },
  { slug: "dashboards-that-help-teams-decide", title: "Dashboards that help teams decide", excerpt: "The most useful dashboards answer a question; they do not simply display every available metric.", content: "A dashboard should help someone act. Before choosing charts, define the decision each viewer needs to make and the condition that should trigger attention.\n\nUse a small set of trusted metrics, clear time periods, and a direct route into the underlying records. A clean dashboard makes exceptions obvious without hiding the wider context.\n\nThe best reporting systems evolve with the business. Review which reports are opened, discussed, and acted on—then retire the rest.", category: "Analytics", status: "published" as const },
];

export const defaultTestimonials = [
  { name: "Client testimonial pending", company: "Your company", role: "Add a role", quote: "Client reviews are published here as engagements complete.", photo: null, displayOrder: "1", status: "published" as const },
  { name: "Client testimonial pending", company: "Your company", role: "Add a role", quote: "Add a customer story from the admin panel.", photo: null, displayOrder: "2", status: "published" as const },
  { name: "Client testimonial pending", company: "Your company", role: "Add a role", quote: "Replace this placeholder with a published testimonial.", photo: null, displayOrder: "3", status: "published" as const },
];

export const defaultAboutContent: AboutPageContent = {
  heroTitle: "Engineering Excellence. Software Innovation. Business Growth.",
  heroDescription: "We are a modern software company that combines engineering precision with cutting-edge technology to build business software that actually works — the way your business works.",
  whoHeading: "We build software that solves real problems",
  whoParagraphs: [
    "Mech Engineer Soft is a modern software company focused on creating digital solutions that solve real business problems. Our approach combines engineering thinking with modern software development to deliver scalable, efficient and reliable solutions.",
    "We don't simply develop websites. We design systems that improve productivity, automate workflows and help businesses grow. We believe software should reduce complexity rather than create it.",
    "From ERP systems and CRM platforms to inventory management and business dashboards — every product we build is designed with the end user in mind and the business outcome as the goal.",
  ],
  founderLabel: "Founder",
  founderName: "S M Waqaar Yezdani",
  founderRole: "Business Software Developer",
  founderCredentials: "M.Tech (Mechanical Engineering – Thermal Engineering) · MCA",
  founderBio: [
    "S M Waqaar Yezdani founded Mech Engineer Soft with the vision of combining engineering principles and modern software development to help businesses improve efficiency through technology.",
    "With a strong academic background in Mechanical Engineering and Computer Applications, he understands both industrial operations and modern software architecture.",
    "Experienced in developing solutions for production management, inventory systems, operational reporting and business process automation — his expertise spans business automation, custom software development, ERP systems, dashboards, and scalable web applications.",
  ],
  founderQuote: "I am passionate about solving real business problems using software. My engineering background allows me to understand industrial processes while my software expertise enables me to build scalable digital solutions.",
  founderImage: "/assets/images/founder.jpg",
  founderChips: ["Engineering Mindset", "Business Automation", "Modern Software", "Cloud Technologies"],
  missionHeadline: "Empower through automation",
  missionBody: "To empower businesses with intelligent software solutions that automate operations, increase productivity and accelerate growth — removing complexity, not adding it.",
  visionHeadline: "India's most trusted software company",
  visionBody: "To become one of India's most trusted software companies — delivering innovative digital products that serve manufacturers, healthcare, education, and enterprises worldwide.",
  timeline: [
    { year: "2014", tag: "Foundation", title: "Engineering Begins", body: "Enrolled in B.Tech Mechanical Engineering — building a rigorous analytical foundation in thermodynamics, manufacturing processes, and production systems.", accent: "#0A7BFF", icon: "⚙️" },
    { year: "2016", tag: "Insight", title: "Business Process Discovery", body: "Worked extensively on production management, inventory systems, operational reporting and business process automation — seeing firsthand where manual workflows break.", accent: "#00C2FF", icon: "🔍" },
    { year: "2018", tag: "Milestone", title: "B.Tech Completed", body: "Graduated in Mechanical Engineering from Adamas Institute of Technology under MAKAUT — with deep expertise in industrial systems and process optimization.", accent: "#0A7BFF", icon: "🎓" },
    { year: "2020", tag: "Mastery", title: "M.Tech — Thermal Engineering", body: "Completed Master of Technology at Aliah University, deepening expertise in industrial systems, complex process optimization, and engineering research.", accent: "#00C2FF", icon: "🔬" },
    { year: "2021", tag: "Pivot", title: "Software Development", body: "Began building custom business software — combining engineering thinking with modern web technologies to solve real operational problems for businesses.", accent: "#0A7BFF", icon: "💻" },
    { year: "2022", tag: "Expansion", title: "MCA — Computer Applications", body: "Pursued Master of Computer Applications at IGNOU to formalize software architecture knowledge and deepen full-stack development expertise.", accent: "#00C2FF", icon: "📚" },
    { year: "2023", tag: "Modern Tech", title: "Cloud & AI Ready", body: "Mastered cloud databases, Supabase, Firebase, REST APIs, and AI integrations — building scalable applications ready for the next generation of business software.", accent: "#0A7BFF", icon: "☁️" },
    { year: "2024", tag: "Launch", title: "Mech Engineer Soft Founded", body: "Founded Mech Engineer Soft with a clear mission: build intelligent business software that eliminates operational complexity for manufacturers, startups, and enterprises.", accent: "#00C2FF", icon: "🚀" },
  ],
  coreValues: [
    { label: "Innovation", icon: "💡", color: "#0A7BFF" },
    { label: "Integrity", icon: "🤝", color: "#00C2FF" },
    { label: "Quality", icon: "⭐", color: "#0A7BFF" },
    { label: "Commitment", icon: "🎯", color: "#00C2FF" },
    { label: "Continuous Learning", icon: "📈", color: "#0A7BFF" },
    { label: "Customer Success", icon: "🏆", color: "#00C2FF" },
  ],
  education: [
    { degree: "M.Tech", field: "Mechanical Engineering", spec: "Thermal Engineering", institution: "Aliah University", year: "2020", icon: "⚙️", color: "#0A7BFF" },
    { degree: "B.Tech", field: "Mechanical Engineering", spec: "", institution: "Adamas Institute of Technology · MAKAUT", year: "2018", icon: "🔩", color: "#00C2FF" },
    { degree: "MCA", field: "Master of Computer Applications", spec: "", institution: "Indira Gandhi National Open University", year: "2022", icon: "💻", color: "#38BDF8" },
  ],
  skillGroups: [
    { category: "Frontend", color: "#0A7BFF", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"] },
    { category: "Backend", color: "#00C2FF", skills: ["Node.js", "Express", "REST API", "JWT Auth", "Zod Validation"] },
    { category: "Database & Cloud", color: "#38BDF8", skills: ["PostgreSQL", "Supabase", "Firebase", "SQL", "Cloud DB"] },
    { category: "Business Solutions", color: "#818CF8", skills: ["ERP Systems", "CRM", "Inventory Mgmt", "Dashboards", "Automation"] },
    { category: "Engineering", color: "#34D399", skills: ["Mechanical Eng.", "Thermal Systems", "Process Analysis", "Workflow Optimization"] },
    { category: "Tools", color: "#FB923C", skills: ["Git", "GitHub", "VS Code", "Google Apps Script", "Google Sheets"] },
  ],
  differentiators: [
    { icon: "⚙️", title: "Engineering Thinking", body: "We approach software like engineers — systematic, precise, and process-driven. Every solution is designed to eliminate inefficiency, not just digitize it.", accent: "#0A7BFF" },
    { icon: "🏭", title: "Business Understanding", body: "We have worked inside production floors, warehouses, and offices. We understand how businesses actually operate — not just how they appear on paper.", accent: "#00C2FF" },
    { icon: "🛠️", title: "Custom Development", body: "No templates. No off-the-shelf products. Every solution is built from scratch to match your exact workflow, team structure, and growth plans.", accent: "#0A7BFF" },
    { icon: "🚀", title: "Future Ready", body: "Built with modern cloud architecture, AI-ready APIs, and scalable databases — your software grows with your business without costly rewrites.", accent: "#00C2FF" },
    { icon: "🔒", title: "Secure Applications", body: "Security is not an afterthought. Every application is built with JWT authentication, role-based access, input validation, and encrypted data storage.", accent: "#0A7BFF" },
    { icon: "🤝", title: "Long Term Partnership", body: "We do not disappear after delivery. We provide ongoing support, updates, and enhancements — treating your business success as our own.", accent: "#00C2FF" },
  ],
};

export async function ensureDefaultContent() {
  const collections = ["services", "insights", "testimonials", "about"] as const;
  const seedRows = await db.select({ collection: contentSeedState.collection }).from(contentSeedState);
  const seeded = new Set(seedRows.map((row) => row.collection));
  const defaultsByCollection = {
    services: () => db.insert(services).values(defaultServices).onConflictDoNothing(),
    insights: () => db.insert(blogPosts).values(defaultInsights).onConflictDoNothing(),
    testimonials: () => db.insert(testimonials).values(defaultTestimonials).onConflictDoNothing(),
    about: () => db.insert(aboutPages).values({ slug: "about", content: defaultAboutContent, status: "published" }),
  };

  for (const collection of collections) {
    if (seeded.has(collection)) continue;
    await defaultsByCollection[collection]();
    await db.insert(contentSeedState).values({ collection }).onConflictDoNothing();
  }
}