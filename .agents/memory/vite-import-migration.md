---
name: Next-to-Vite migrations
description: Non-obvious browser-runtime and styling constraints when porting imported Next.js sites into this workspace's Vite artifacts.
---

Browser code in a Vite artifact cannot read Node's `process.env`; use Vite's `import.meta.env` values and `import.meta.env.DEV` for development checks. Imported Tailwind v3 directive files also need to be adapted through a Tailwind v4-compatible entry point rather than assumed to work unchanged.

**Why:** The imported Next runtime supplied server-side environment handling and Tailwind processing that do not exist in the browser/Vite entry point; leaving either assumption in place produces runtime failures or missing styles.

**How to apply:** During a Next-to-Vite port, scan all client components for `process.env`, replace only browser-safe configuration with Vite variables, and verify the final app with a production Vite build plus a browser screenshot.