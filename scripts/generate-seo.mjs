import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const fallbackUrl = 'https://premium-zemin-silim.pages.dev';
const siteUrl = (process.env.SITE_URL || fallbackUrl).trim().replace(/\/+$/, '');
const dist = resolve('dist');
const indexPath = resolve(dist, 'index.html');
const index = (await readFile(indexPath, 'utf8')).replaceAll('__SITE_URL__', siteUrl);

await writeFile(indexPath, index);
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`);

console.log(`SEO files generated for ${siteUrl}`);
