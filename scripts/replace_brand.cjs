const fs = require('fs');
const path = require('path');

const files = [
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
  'src/content/locations/california/los-angeles.json'
];

files.forEach(file => {
  const absolutePath = path.resolve(__dirname, '..', file);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    
    // Replace "Pet Farewell" with "Pet Home Euthanasia Service"
    const original = content;
    content = content.replace(/Pet Farewell/g, 'Pet Home Euthanasia Service');
    
    if (original !== content) {
      fs.writeFileSync(absolutePath, content, 'utf8');
      console.log(`Updated: ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
