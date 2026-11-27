import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Deployment metadata for the single-route site.
 *
 * The production origin is resolved from the build environment — never from a
 * hardcoded placeholder:
 *   1. VITE_SITE_URL                  (explicit custom domain, e.g. https://afjackets.com)
 *   2. VERCEL_PROJECT_PRODUCTION_URL  (Vercel production domain, no protocol)
 *   3. VERCEL_URL                     (the deployment URL, preview or production)
 *
 * Local builds have no origin: no canonical/og:url/sitemap is invented, and a
 * generic robots.txt is still emitted.
 */
function resolveOrigin() {
  for (const key of ['VITE_SITE_URL', 'VERCEL_PROJECT_PRODUCTION_URL', 'VERCEL_URL']) {
    const raw = String(process.env[key] || '').trim()
    if (!raw) continue
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
    return withProtocol.replace(/\/+$/, '')
  }
  return ''
}

function siteMetadataPlugin() {
  const origin = resolveOrigin()
  const image = origin ? `${origin}/jaket.jpg` : ''

  return {
    name: 'af-site-metadata',
    enforce: 'post',

    transformIndexHtml(html) {
      if (!origin) return html

      const head = [
        `  <link rel="canonical" href="${origin}/">`,
        `  <meta property="og:url" content="${origin}/">`,
        `  <meta property="og:image" content="${image}">`,
        `  <meta name="twitter:card" content="summary_large_image">`,
        `  <meta name="twitter:image" content="${image}">`,
        `  <script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Ahmed Fayed',
          url: `${origin}/`,
          image,
          telephone: '+20 109 309 6278',
          description: "Bespoke made-to-measure men's jackets by a master tailor.",
        })}</script>`,
      ].join('\n')

      return html.replace('</head>', `${head}\n  </head>`)
    },

    generateBundle() {
      const sitemapLine = origin ? `\nSitemap: ${origin}/sitemap.xml` : ''
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `# Ahmed Fayed — bespoke men's jackets\nUser-agent: *\nAllow: /${sitemapLine}\n`,
      })

      if (!origin) return
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n` +
          `    <loc>${origin}/</loc>\n` +
          `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n` +
          `    <changefreq>weekly</changefreq>\n` +
          `    <priority>1.0</priority>\n` +
          `  </url>\n` +
          `</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), siteMetadataPlugin()],
})
