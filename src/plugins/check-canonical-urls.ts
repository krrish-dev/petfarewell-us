import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';

export default function checkCanonicalUrls(): AstroIntegration {
  return {
    name: 'petfarewell-check-canonical-urls',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        logger.info(`Checking canonical URL uniqueness in ${distDir}`);

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

        const canonicalUrlMap = new Map<string, string>();
        let duplicatesFound = false;

        for (const file of htmlFiles) {
          const content = fs.readFileSync(file, 'utf-8');
          const root = parse(content);
          const canonicalLink = root.querySelector('link[rel="canonical"]');

          if (canonicalLink) {
            const href = canonicalLink.getAttribute('href');
            if (href) {
              const relFilePath = path.relative(distDir, file);
              
              if (canonicalUrlMap.has(href)) {
                logger.error(`Duplicate canonical URL found: ${href}`);
                logger.error(`Used in: ${canonicalUrlMap.get(href)} and ${relFilePath}`);
                duplicatesFound = true;
              } else {
                canonicalUrlMap.set(href, relFilePath);
              }
            }
          } else {
            // Optional: warn if missing canonical
            logger.warn(`Missing canonical URL in: ${path.relative(distDir, file)}`);
          }
        }

        if (duplicatesFound) {
          throw new Error('Build failed: Duplicate canonical URLs detected.');
        } else {
          logger.info(`Canonical URL check passed. ${canonicalUrlMap.size} unique URLs verified.`);
        }
      },
    },
  };
}
