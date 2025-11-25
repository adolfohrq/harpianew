/**
 * Script para gerar sitemap.xml e robots.txt
 *
 * Este script lê a configuração de src/config/seo.config.ts
 * e gera os arquivos automaticamente.
 *
 * Executado após o build do Vite via npm run build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Lê e parseia o arquivo de configuração TypeScript
function loadConfig() {
  const configPath = path.resolve(rootDir, 'src/config/seo.config.ts');
  const content = fs.readFileSync(configPath, 'utf-8');

  // Extrai COMPANY_INFO.url
  const urlMatch = content.match(/url:\s*['"]([^'"]+)['"]/);
  const baseUrl = urlMatch ? urlMatch[1] : 'https://agenciaharpia.com.br';

  // Extrai COMPANY_INFO.name
  const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
  const companyName = nameMatch ? nameMatch[1] : 'Harpia Agência';

  // Extrai SITEMAP_CONFIG.staticRoutes
  const staticRoutesMatch = content.match(/staticRoutes:\s*\[([\s\S]*?)\]/);
  const staticRoutes = [];

  if (staticRoutesMatch) {
    const routesContent = staticRoutesMatch[1];
    const routeRegex =
      /\{\s*path:\s*['"]([^'"]+)['"],\s*priority:\s*([\d.]+),\s*changefreq:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = routeRegex.exec(routesContent)) !== null) {
      staticRoutes.push({
        path: match[1],
        priority: parseFloat(match[2]),
        changefreq: match[3],
      });
    }
  }

  // Extrai PORTFOLIO_PROJECTS slugs
  const portfolioMatch = content.match(/PORTFOLIO_PROJECTS\s*=\s*\[([\s\S]*?)\];/);
  const portfolioSlugs = [];

  if (portfolioMatch) {
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = slugRegex.exec(portfolioMatch[1])) !== null) {
      portfolioSlugs.push(match[1]);
    }
  }

  return { baseUrl, companyName, staticRoutes, portfolioSlugs };
}

function generateSitemap(config) {
  const { baseUrl, staticRoutes, portfolioSlugs } = config;
  const today = new Date().toISOString().split('T')[0];

  // Combina rotas estáticas com rotas de portfolio
  const allRoutes = [
    ...staticRoutes,
    ...portfolioSlugs.map((slug) => ({
      path: `/portfolio/${slug}`,
      priority: 0.7,
      changefreq: 'monthly',
    })),
  ];

  const urls = allRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

function generateRobots(config) {
  const { baseUrl, companyName } = config;

  return `# Robots.txt para ${companyName}
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

Disallow: /404
`;
}

// Executa
try {
  // Verifica se o diretório dist existe
  if (!fs.existsSync(distDir)) {
    console.log('⚠️  Diretório dist/ não encontrado. Execute npm run build primeiro.');
    process.exit(1);
  }

  const config = loadConfig();

  // Gera sitemap.xml
  const sitemapContent = generateSitemap(config);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
  console.log('✓ sitemap.xml gerado');

  // Gera robots.txt
  const robotsContent = generateRobots(config);
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent, 'utf-8');
  console.log('✓ robots.txt gerado');

  console.log(`\n📊 Resumo:`);
  console.log(`   - URL base: ${config.baseUrl}`);
  console.log(`   - Rotas estáticas: ${config.staticRoutes.length}`);
  console.log(`   - Projetos portfolio: ${config.portfolioSlugs.length}`);
  console.log(`   - Total de URLs: ${config.staticRoutes.length + config.portfolioSlugs.length}`);
} catch (error) {
  console.error('❌ Erro ao gerar sitemap:', error.message);
  process.exit(1);
}
