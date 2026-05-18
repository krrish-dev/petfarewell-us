import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';

export default function checkInternalLinks(): AstroIntegration {
  return {
    name: 'petfarewell-check-internal-links',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        logger.info(`Checking internal links in ${distDir}`);

        const htmlFiles: string[] = [];

        function walkDir(currentDir: string) {
          const files = fs.readdirSync(currentDir);
          for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
              walkDir(filePath);
            } else if (file.endsWith('.html')) {
              htmlFiles.push(filePath);
            }
          }
        }

        walkDir(distDir);

        const availablePaths = new Set(
          htmlFiles.map(file => {
            let rel = path.relative(distDir, file).replace(/\\/g, '/');
            if (rel === 'index.html') return '/';
            if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -11);
            if (rel.endsWith('.html')) return '/' + rel.slice(0, -5);
            return '/' + rel;
          })
        );
        availablePaths.add('/sitemap-index.xml'); // Add known valid generated files

        let brokenLinksFound = false;

        for (const file of htmlFiles) {
          const content = fs.readFileSync(file, 'utf-8');
          const root = parse(content);
          const links = root.querySelectorAll('a[href]');

          for (const link of links) {
            const href = link.getAttribute('href');
            if (!href) continue;

            // Skip external links, mailto, tel, anchor links
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
              continue;
            }

            // Normalize href
            let cleanHref = href.split('#')[0].split('?')[0];
            if (cleanHref.endsWith('/') && cleanHref.length > 1) {
              cleanHref = cleanHref.slice(0, -1);
            }

            if (!availablePaths.has(cleanHref)) {
              logger.error(`Broken internal link found: ${href} in ${path.relative(distDir, file)}`);
              brokenLinksFound = true;
            }
          }
        }

        if (brokenLinksFound) {
          throw new Error('Build failed: Broken internal links detected.');
        } else {
          logger.info('Internal link check passed successfully.');
        }
      },
    },
  };
}
