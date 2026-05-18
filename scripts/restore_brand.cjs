const fs = require('fs');
const path = require('path');

const files = [
  'src/config/site.ts',
  'src/pages/terms-of-service.astro',
  'src/pages/resources/index.astro',
  'src/pages/privacy-policy.astro',
  'src/pages/pet-urns.astro',
  'src/pages/pet-memorial-ideas.astro',
  'src/pages/pet-hospice.astro',
  'src/pages/pet-grief-support.astro',
  'src/pages/pet-cremation.astro',
  'src/pages/pet-burial.astro',
  'src/pages/locations/[state]/[city]/index.astro',
  'src/pages/locations/[state]/index.astro',
  'src/pages/locations/index.astro',
  'src/pages/dog-cremation.astro',
  'src/pages/contact.astro',
  'src/pages/cat-cremation.astro',
  'src/pages/at-home-pet-euthanasia.astro',
  'src/pages/404.astro',
  'src/layouts/ResourcePageLayout.astro',
  'src/content/resources/quality-of-life-scale-dog.mdx',
  'src/content/resources/pet-cremation-cost.mdx',
  'src/content/resources/backyard-pet-burial-laws.mdx',
  'src/content/locations/california/los-angeles.json',
  'src/pages/about.astro',
  'src/pages/index.astro',
  'scripts/generate_images.cjs'
];

files.forEach(file => {
  const absolutePath = path.resolve(__dirname, '..', file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    
    // Restore "Pet Home Euthanasia Service" -> "Pet Farewell"
    const original = content;
    content = content.replace(/Pet Home Euthanasia Service/g, 'Pet Farewell');
    content = content.replace(/Pet Home Euthanasia/g, 'Pet Farewell');
    
    // Restore URL in site.ts if found
    if (file === 'src/config/site.ts') {
      content = content.replace(/https:\/\/pethomeeuthanasiaservice\.com/g, 'https://petfarewell.us');
    }
    
    if (original !== content) {
      fs.writeFileSync(absolutePath, content, 'utf8');
      console.log(`Restored: ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
