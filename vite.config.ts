import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';

/**
 * Plugin para gerar sitemap.xml e robots.txt após o build
 * Lê configuração de src/config/seo.config.ts automaticamente
 */
function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    closeBundle() {
      try {
        execSync('node scripts/build-sitemap.js', { stdio: 'inherit' });
      } catch {
        console.error(
          '⚠️ Erro ao gerar sitemap. Execute manualmente: node scripts/build-sitemap.js'
        );
      }
    },
  };
}

export default defineConfig({
  server: {
    port: 5020,
    host: '0.0.0.0',
  },
  plugins: [react(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
