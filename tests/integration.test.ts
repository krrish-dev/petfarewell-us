import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';

const distDir = path.resolve(__dirname, '../dist');

describe('Static Site Integration Tests', () => {
  let htmlFiles: string[] = [];

  beforeAll(() => {
    function walkDir(currentDir: string) {
      if (!fs.existsSync(currentDir)) return;
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
  });

  it('14.1: dist/sitemap-index.xml and dist/sitemap-0.xml exist and are valid XML', () => {
    const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
    const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
    
    expect(fs.existsSync(sitemapIndexPath)).toBe(true);
    expect(fs.existsSync(sitemap0Path)).toBe(true);

    const sitemapContent = fs.readFileSync(sitemap0Path, 'utf-8');
    expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemapContent).toContain('<urlset');
    
    // Check for some expected routes
    expect(sitemapContent).toContain('pet-cremation');
    expect(sitemapContent).toContain('at-home-pet-euthanasia');
  });

  it('14.2: dist/robots.txt permits crawling and references sitemap URL', () => {
    const robotsPath = path.join(distDir, 'robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);

    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    expect(robotsContent).toContain('User-agent: *');
    expect(robotsContent).toContain('Allow: /');
    expect(robotsContent).toContain('Sitemap: https://petfarewell.us/sitemap-index.xml');
  });

  it('14.3: /about/ URL metadata keeps a trailing slash', () => {
    const aboutPath = path.join(distDir, 'about', 'index.html');
    const sitemap0Path = path.join(distDir, 'sitemap-0.xml');

    expect(fs.existsSync(aboutPath)).toBe(true);
    expect(fs.existsSync(sitemap0Path)).toBe(true);

    const root = parse(fs.readFileSync(aboutPath, 'utf-8'));
    const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const ogUrl = root.querySelector('meta[property="og:url"]')?.getAttribute('content');
    const sitemapContent = fs.readFileSync(sitemap0Path, 'utf-8');

    expect(canonical).toBe('https://petfarewell.us/about/');
    expect(ogUrl).toBe('https://petfarewell.us/about/');
    expect(sitemapContent).toContain('<loc>https://petfarewell.us/about/</loc>');
  });

  it('14.4: internal links to About use the trailing slash URL', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const root = parse(content);
      const aboutLinks = root.querySelectorAll('a[href="/about"]');

      expect(aboutLinks.length, `File ${file} should link to /about/ instead of /about`).toBe(0);
    }
  });

  it('14.5: internal page links use trailing slash URLs', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const root = parse(content);
      const links = root.querySelectorAll('a[href]');

      for (const link of links) {
        const href = link.getAttribute('href');
        if (!href) continue;

        const [pathOnly] = href.split(/[?#]/);
        const isInternalPage =
          pathOnly.startsWith('/') &&
          pathOnly !== '/' &&
          !path.extname(pathOnly);

        if (isInternalPage) {
          expect(href, `File ${file} should use a trailing slash link`).toMatch(/^\/.+\/([?#].*)?$/);
        }
      }
    }
  });

  it('14.6: canonical URLs and sitemap page URLs use trailing slashes', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
      if (file.endsWith(`${path.sep}404.html`)) continue;

      const content = fs.readFileSync(file, 'utf-8');
      const root = parse(content);
      const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href');
      const ogUrl = root.querySelector('meta[property="og:url"]')?.getAttribute('content');

      expect(canonical, `File ${file} missing canonical`).toBeTruthy();
      expect(canonical, `File ${file} canonical should end with slash`).toMatch(/\/$/);
      expect(ogUrl, `File ${file} og:url should end with slash`).toMatch(/\/$/);
    }

    const sitemapContent = fs.readFileSync(path.join(distDir, 'sitemap-0.xml'), 'utf-8');
    const locs = Array.from(sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g), match => match[1]);
    expect(locs.length).toBeGreaterThan(0);

    for (const loc of locs) {
      expect(loc, `Sitemap URL should end with slash`).toMatch(/\/$/);
    }
  });

  it('14.7: service pages publish dog and cat pricing facts for SEO', () => {
    const homePath = path.join(distDir, 'index.html');
    const servicePath = path.join(distDir, 'at-home-pet-euthanasia', 'index.html');
    const cremationPath = path.join(distDir, 'pet-cremation', 'index.html');

    for (const file of [homePath, servicePath, cremationPath]) {
      expect(fs.existsSync(file)).toBe(true);
    }

    const homeContent = fs.readFileSync(homePath, 'utf-8');
    const serviceContent = fs.readFileSync(servicePath, 'utf-8');
    const cremationContent = fs.readFileSync(cremationPath, 'utf-8');

    expect(homeContent).toContain('dog euthanasia');
    expect(homeContent).toContain('cat euthanasia');
    expect(serviceContent).toContain('$450');
    expect(serviceContent).toContain('$550');
    expect(serviceContent).toContain('$750');
    expect(serviceContent).toContain('within 50 miles of Victorville');
    expect(serviceContent).toContain('8:00 AM to 8:00 PM');
    expect(cremationContent).toContain('private cremation');
  });

  it('14.8: every page includes mobile call actions', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const root = parse(content);
      const headerCall = root.querySelector('a.mobile-header-call');
      const bottomCall = root.querySelector('a.mobile-call-bar');

      expect(headerCall, `File ${file} missing mobile header call action`).toBeTruthy();
      expect(bottomCall, `File ${file} missing sticky mobile call bar`).toBeTruthy();
      expect(headerCall?.getAttribute('href')).toBe('tel:+17609120848');
      expect(bottomCall?.getAttribute('href')).toBe('tel:+17609120848');
    }
  });

  it('14.9: dist/404.html exists and contains navigation links', () => {
    const notFoundPath = path.join(distDir, '404.html');
    expect(fs.existsSync(notFoundPath)).toBe(true);

    const notFoundContent = fs.readFileSync(notFoundPath, 'utf-8');
    const root = parse(notFoundContent);
    const h1 = root.querySelector('h1');
    expect(h1?.text).toBe('404');
    
    const link = root.querySelector('a[href="/"]');
    expect(link).toBeTruthy();
  });

  it('14.10: Every page has exactly one h1 element', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const root = parse(content);
      const h1s = root.querySelectorAll('h1');
      expect(h1s.length, `File ${file} should have exactly one H1`).toBe(1);
    }
  });

  it('14.11: Every page has required Open Graph tags', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const root = parse(content);
      
      const ogTitle = root.querySelector('meta[property="og:title"]');
      const ogDescription = root.querySelector('meta[property="og:description"]');
      const ogImage = root.querySelector('meta[property="og:image"]');
      const ogUrl = root.querySelector('meta[property="og:url"]');
      const ogType = root.querySelector('meta[property="og:type"]');

      expect(ogTitle, `File ${file} missing og:title`).toBeTruthy();
      expect(ogDescription, `File ${file} missing og:description`).toBeTruthy();
      expect(ogImage, `File ${file} missing og:image`).toBeTruthy();
      expect(ogUrl, `File ${file} missing og:url`).toBeTruthy();
      expect(ogType, `File ${file} missing og:type`).toBeTruthy();
    }
  });

  it('14.12: Validate JSON-LD blocks exist and are parsable JSON', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const root = parse(content);
      
      const jsonLdScripts = root.querySelectorAll('script[type="application/ld+json"]');
      
      // All pages except 404 should have at least one JSON-LD block (BreadcrumbList at minimum)
      if (!file.endsWith('404.html') && !file.includes('privacy-policy') && !file.includes('terms-of-service')) {
        if (jsonLdScripts.length === 0) {
          console.error('No JSON-LD found in:', file);
        }
        expect(jsonLdScripts.length).toBeGreaterThan(0);
      }

      for (const script of jsonLdScripts) {
        expect(() => JSON.parse(script.text)).not.toThrow();
        const data = JSON.parse(script.text);
        
        // Basic schema validation
        const validateItem = (item: any) => {
          expect(item['@context']).toBe('https://schema.org');
          expect(item['@type']).toBeTruthy();
        };

        if (Array.isArray(data)) {
          data.forEach(validateItem);
        } else {
          validateItem(data);
        }
      }
    }
  });
});
