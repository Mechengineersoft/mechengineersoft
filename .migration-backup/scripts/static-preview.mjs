// Flattens the Next.js build output into a statically servable tree.
// Static preview hosts serve `dist/` directly, so prerendered HTML must live at
// dist/<route>.html (+ index.html) and client assets at dist/_next/static.
import { cp, mkdir, readdir, stat, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.env.DIST_DIR || 'dist');
const appDir = path.join(dist, 'server', 'app');

if (!existsSync(appDir)) {
  console.warn('[static-preview] no server/app directory, skipping');
  process.exit(0);
}

// 1. Client assets: /_next/static/*
if (existsSync(path.join(dist, 'static'))) {
  await cp(path.join(dist, 'static'), path.join(dist, '_next', 'static'), { recursive: true });
}

// 2. Prerendered HTML documents
async function walk(dir, rel = '') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(abs, path.join(rel, entry.name));
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;
    const base = entry.name.replace(/\.html$/, '');
    const targetDir = path.join(dist, rel, base === 'index' ? '' : base);
    await mkdir(targetDir, { recursive: true });
    await copyFile(abs, path.join(targetDir, 'index.html'));
    if (rel || base !== 'index') {
      await mkdir(path.join(dist, rel), { recursive: true });
      await copyFile(abs, path.join(dist, rel, `${base}.html`));
    }
  }
}
await walk(appDir);

// 3. SPA-style fallback for unmatched routes
const notFound = path.join(appDir, '_not-found.html');
if (existsSync(notFound)) await copyFile(notFound, path.join(dist, '404.html'));

const index = path.join(dist, 'index.html');
console.log(`[static-preview] index.html ${(await stat(index)).size} bytes`);
