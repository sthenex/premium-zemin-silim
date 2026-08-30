import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const fallbackUrl = 'https://zeminsilim.tr';
const siteUrl = (process.env.SITE_URL || fallbackUrl).trim().replace(/\/+$/, '');
const dist = resolve('dist');
const indexPath = resolve(dist, 'index.html');
const services = JSON.parse(await readFile(resolve('src/service-pages.json'), 'utf8'));
const today = new Date().toISOString().slice(0, 10);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const escapeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

let home = (await readFile(indexPath, 'utf8')).replaceAll('__SITE_URL__', siteUrl);
const homeFallback = `<div id="root"><main style="font-family:system-ui,sans-serif;padding:48px;max-width:920px;margin:auto"><h1>Türkiye Geneli Profesyonel Zemin Silim ve Cila Hizmetleri</h1><p>ZeminSilim; Türkiye genelinde mermer, beton, granit, karo, traverten, paladyen ve mozaik yüzeylerde tozsuz silim, parlatma ve koruyucu cila uygulamaları sunar.</p><h2>Uzmanlık alanlarımız</h2><ul>${services.map((service) => `<li><a href="/hizmetler/${service.slug}">${escapeHtml(service.title)}</a> — ${escapeHtml(service.shortDescription)}</li>`).join('')}</ul><h2>Sıkça Sorulan Sorular</h2><details><summary><strong>Zemin silim işlemi nedir ve hangi yüzeylere uygulanır?</strong></summary><p>Zemin silim; mermer, beton, granit, karo, traverten, mozaik ve paladyen gibi sert yüzeylerdeki çizik, leke, matlık ve kot farklarını kademeli elmas disklerle mikron seviyesinde aşındırıp parlatma ve koruyucu cila uygulama işlemidir.</p></details><details><summary><strong>Zemin silim uygulaması sırasında toz çıkar mı?</strong></summary><p>Hayır. Endüstriyel sulu ve vakumlu makinelerle çalışıldığı için yaşam veya çalışma alanlarında toz oluşmaz.</p></details><details><summary><strong>Türkiye genelinde hizmet veriyor musunuz?</strong></summary><p>Evet. Türkiye genelinde 81 ilde villa, otel, fabrika, depo ve ticari projeler için yerinde keşif ve profesyonel uygulama hizmeti sunuyoruz.</p></details><p><a href="tel:+905079480834">Ücretsiz keşif ve teklif: +90 507 948 08 34</a></p></main></div>`;
home = home.replace('<div id="root"></div>', homeFallback);
await writeFile(indexPath, home);

function replaceMeta(html, attribute, value, content) {
  const safeValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\s+${attribute}="${safeValue}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
  return html.replace(pattern, `<meta ${attribute}="${value}" content="${escapeHtml(content)}" />`);
}

function servicePageHtml(service) {
  const url = `${siteUrl}/hizmetler/${service.slug}`;
  let html = home.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(service.title)} - Profesyonel Silim ve Cila | ZeminSilim</title>`);
  html = replaceMeta(html, 'name', 'description', service.metaDescription);
  html = replaceMeta(html, 'property', 'og:title', `${service.title} - Zemin Silim ve Cila | ZeminSilim`);
  html = replaceMeta(html, 'property', 'og:description', service.metaDescription);
  html = replaceMeta(html, 'property', 'og:url', url);
  html = replaceMeta(html, 'property', 'og:image', `${siteUrl}${service.image}`);
  html = replaceMeta(html, 'property', 'og:image:alt', `${service.title} profesyonel uygulama örneği`);
  html = replaceMeta(html, 'name', 'twitter:title', `${service.title} | ZeminSilim`);
  html = replaceMeta(html, 'name', 'twitter:description', service.metaDescription);
  html = replaceMeta(html, 'name', 'twitter:image', `${siteUrl}${service.image}`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${url}" />`);
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Service', '@id': `${url}#service`, name: service.title, serviceType: service.title, description: service.metaDescription, url, image: `${siteUrl}${service.image}`, provider: { '@id': `${siteUrl}/#business` }, areaServed: [{ '@type': 'Country', name: 'Türkiye' }] },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${siteUrl}/#hizmetler` }, { '@type': 'ListItem', position: 3, name: service.title, item: url }] }
    ]
  };
  html = html.replace('</head>', `<script type="application/ld+json">${escapeJson(schema)}</script>\n</head>`);
  const fallback = `<div id="root"><main style="font-family:system-ui,sans-serif;padding:48px;max-width:920px;margin:auto"><nav><a href="/">Ana Sayfa</a> / Hizmetler</nav><h1>${escapeHtml(service.title)}</h1><h2>${escapeHtml(service.heading)}</h2><p>${escapeHtml(service.intro)}</p><h2>Yüzey analizi</h2><p>${escapeHtml(service.diagnosis)}</p><h2>Uygulama yöntemi</h2><p>${escapeHtml(service.method)}</p><h2>Hedeflenen sonuç</h2><p>${escapeHtml(service.result)}</p><h2>Kullanım alanları</h2><ul>${service.useCases.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul><p><a href="tel:+905079480834">Ücretsiz keşif: +90 507 948 08 34</a></p></main></div>`;
  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, fallback);
}

for (const service of services) {
  const directory = resolve(dist, 'hizmetler', service.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), servicePageHtml(service));
}

const legalPages = [
  ['gizlilik-politikasi', 'Gizlilik Politikası ve KVKK Aydınlatma Metni', 'ZeminSilim kişisel verilerin işlenmesi, aktarımı, saklanması ve KVKK kapsamındaki haklar hakkında aydınlatma metni.'],
  ['cerez-politikasi', 'Çerez Politikası', 'ZeminSilim sitesinin çerez ve benzer teknolojileri kullanımı ile üçüncü taraf bağlantıları hakkında bilgi.'],
  ['kullanim-kosullari', 'Kullanım ve Hizmet Koşulları', 'ZeminSilim keşif, teklif ve profesyonel zemin uygulamalarına ilişkin genel kullanım ve hizmet koşulları.']
];
for (const [slug, title, description] of legalPages) {
  let html = home.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title} | ZeminSilim</title>`);
  html = replaceMeta(html, 'name', 'description', description);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${siteUrl}/${slug}" />`);
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root"><main style="font-family:system-ui,sans-serif;padding:48px;max-width:850px;margin:auto"><nav><a href="/">Ana Sayfa</a></nav><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><p>Premium Zemin Silim · Esenkent, Leylek Sk No:46 D:1, 34776 Ümraniye/İstanbul</p><p><a href="mailto:premiumzeminsilim@gmail.com">premiumzeminsilim@gmail.com</a> · <a href="tel:+905079480834">+90 507 948 08 34</a></p></main></div>`);
  const directory = resolve(dist, slug);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}

const urls = [`${siteUrl}/`, ...services.map((service) => `${siteUrl}/hizmetler/${service.slug}`), ...legalPages.map(([slug]) => `${siteUrl}/${slug}`)];
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
const imageForUrl = (url) => {
  if (url === `${siteUrl}/`) return `${siteUrl}/templates/premium-zemin-silim/hero-zemin-parlatma.webp`;
  const service = services.find((item) => url.endsWith(`/hizmetler/${item.slug}`));
  return service ? `${siteUrl}${service.image}` : null;
};
await writeFile(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.map((url) => { const image = imageForUrl(url); return `  <url><loc>${url}</loc><lastmod>${today}</lastmod>${image ? `<image:image><image:loc>${image}</image:loc></image:image>` : ''}</url>`; }).join('\n')}\n</urlset>\n`);
console.log(`SEO files generated for ${siteUrl}: ${urls.length} indexable URLs`);
