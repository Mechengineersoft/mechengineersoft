# Mech Engineer Soft

The official, premium website for Mech Engineer Soft—built to present custom business software, ERP, CRM, dashboard, automation, and cloud-application services.

## What is included

- Premium responsive marketing site: home, about, services, industries, portfolio, insights, contact, and legal pages.
- Consultation booking form with server-side validation.
- SEO foundations: metadata, robots, sitemap, structured organization data, canonical URLs, and semantic routes.
- PWA foundations: manifest, service worker registration, and offline page.
- Protected admin foundation: signed owner sessions, setup health, website settings, and consultation-inquiry management.
- PostgreSQL / Supabase-ready Drizzle schema for content, media, enquiries, appointments, newsletter subscribers, and activity logs.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set the values you need.

3. Start the website:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:4028`.

## Connecting the CMS and enquiries

Create a PostgreSQL database (Supabase is supported), then set `DATABASE_URL` in `.env.local`.

Generate and apply the database migration:

```bash
npm run db:generate
npm run db:migrate
```

To enable owner access, also set a strong `ADMIN_PASSWORD` and a long random `ADMIN_AUTH_SECRET`. Sign in at `/admin/login`. The admin workspace deliberately has no default credentials.

To enable enquiry notifications, configure `EMAIL_FROM` and `EMAIL_API_KEY`, then connect the email provider in `src/app/api/contact/route.ts`.

## Production

Before deploying, set `NEXT_PUBLIC_SITE_URL` to the public site URL and provide the same required secrets through your hosting provider’s environment-variable screen. Then validate with:

```bash
npm run type-check
npm run build
```

The site is structured for Vercel, Render, Replit, Node.js hosting, and PostgreSQL/Supabase.

## Deploying to Render

`render.yaml` is included as a Render Blueprint.

1. Render Dashboard → New → Blueprint → select this GitHub repository.
2. Render reads `render.yaml`: build `npm install && npm run build`, start `npm run start:render`.
3. Set the secret env vars marked `sync: false` in the Render UI:
   `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_AUTH_SECRET`,
   `EMAIL_FROM`, `EMAIL_API_KEY`.
4. Deploy. Render runs a full Node server, so API routes (`/api/contact`,
   `/api/newsletter`, `/api/admin/*`) and `/admin` work there.

`NEXT_PUBLIC_STATIC_EXPORT=false` (set in `render.yaml`) keeps clean extensionless
URLs on Render; leaving it unset keeps the `.html` links needed by static hosting.
