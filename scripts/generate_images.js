const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure directories exist
const imagesDir = path.resolve(__dirname, '../public/images');
const resourcesDir = path.resolve(__dirname, '../public/images/resources');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(resourcesDir)) fs.mkdirSync(resourcesDir, { recursive: true });

// 1. Generate Favicon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A354F" />
      <stop offset="100%" stop-color="#7B6D8D" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="20" fill="url(#g)" />
  <path d="M50 30 C35 15, 15 35, 50 75 C85 35, 65 15, 50 30 Z" fill="#F7F4EF" opacity="0.9" />
  <path d="M50 40 C42 30, 30 42, 50 64 C70 42, 58 30, 50 40 Z" fill="#D4AF37" />
</svg>`;
fs.writeFileSync(path.resolve(__dirname, '../public/favicon.svg'), faviconSvg);
console.log('Generated favicon.svg');

// 2. Generate Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="300" height="80">
  <defs>
    <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A354F" />
      <stop offset="100%" stop-color="#6B5E62" />
    </linearGradient>
  </defs>
  <g transform="translate(15, 15)">
    <circle cx="25" cy="25" r="24" fill="url(#logo-g)" />
    <path d="M25 15 C18 8, 8 18, 25 38 C42 18, 32 8, 25 15 Z" fill="#F7F4EF" opacity="0.9" transform="scale(0.8) translate(6, 6)" />
    <path d="M25 19 C21 14, 15 21, 25 32 C35 21, 29 14, 25 19 Z" fill="#D4AF37" transform="scale(0.8) translate(6, 6)" />
  </g>
  <text x="80" y="42" font-family="'Outfit', 'Inter', sans-serif" font-size="24" font-weight="700" fill="#4A354F">Pet Farewell</text>
  <text x="80" y="58" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#6B5E62" letter-spacing="1">COMPASSIONATE CARE</text>
</svg>`;
fs.writeFileSync(path.resolve(__dirname, '../public/images/logo.svg'), logoSvg);
console.log('Generated logo.svg');

// 3. Helper to generate modern gradient JPGs using sharp
async function generateGradientJpg(filePath, width, height, title, subtitle, themeColor = '#4A354F', themeColorSub = '#7B6D8D') {
  const svgString = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F7F4EF" />
          <stop offset="50%" stop-color="#EBE6DD" />
          <stop offset="100%" stop-color="#DFD8CD" />
        </linearGradient>
        <linearGradient id="shapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${themeColor}" />
          <stop offset="100%" stop-color="${themeColorSub}" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
      
      <path d="M 0,${height * 0.4} Q ${width * 0.25},${height * 0.2} ${width * 0.5},${height * 0.5} T ${width},${height * 0.3} L ${width},${height} L 0,${height} Z" fill="url(#shapeGrad)" opacity="0.12" />
      <path d="M 0,${height * 0.6} Q ${width * 0.3},${height * 0.4} ${width * 0.6},${height * 0.7} T ${width},${height * 0.5} L ${width},${height} L 0,${height} Z" fill="url(#shapeGrad)" opacity="0.08" />
      
      <g transform="translate(${width * 0.5 - 40}, ${height * 0.25 - 40})" opacity="0.15">
        <path d="M40 0 C15 0, 0 15, 0 40 C0 65, 15 80, 40 80 C65 80, 80 65, 80 40 C80 15, 65 0, 40 0 Z" fill="${themeColor}" />
        <path d="M40 15 C25 5, 5 25, 40 65 C75 25, 55 5, 40 15 Z" fill="#F7F4EF" />
      </g>

      <text 
        x="50%" 
        y="${height * 0.52}" 
        text-anchor="middle" 
        font-family="'Outfit', 'Inter', 'Segoe UI', sans-serif" 
        font-size="${height * 0.06}" 
        font-weight="700" 
        fill="${themeColor}"
        letter-spacing="-0.5"
      >
        ${title}
      </text>

      <text 
        x="50%" 
        y="${height * 0.64}" 
        text-anchor="middle" 
        font-family="'Inter', 'Segoe UI', sans-serif" 
        font-size="${height * 0.032}" 
        font-weight="500" 
        fill="#6B5E62"
      >
        ${subtitle}
      </text>

      <text 
        x="50%" 
        y="${height * 0.88}" 
        text-anchor="middle" 
        font-family="'Inter', sans-serif" 
        font-size="12" 
        font-weight="600" 
        fill="${themeColor}" 
        letter-spacing="2" 
        opacity="0.6"
      >
        PET FAREWELL
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svgString))
    .jpeg({ quality: 90 })
    .toFile(filePath);
}

// 4. Generate all required JPEGs
const imagesToGenerate = [
  {
    fileName: 'og-default.jpg',
    width: 1200,
    height: 630,
    title: 'Pet Farewell',
    subtitle: 'Dignified & Compassionate Pet End-of-Life Resources'
  },
  {
    fileName: 'hero-home.jpg',
    width: 1200,
    height: 600,
    title: 'Compassionate End-of-Life Care',
    subtitle: 'Support, comfort, and peace for your pet\'s final journey'
  },
  {
    fileName: 'about-home.jpg',
    width: 800,
    height: 600,
    title: 'A Shoulder to Lean On',
    subtitle: 'Dignity for pets, compassionate guidance for families'
  },
  {
    fileName: 'about-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Our Mission & Core Values',
    subtitle: 'Providing ethical, honest, and loving care transitions'
  },
  {
    fileName: 'contact-hero.jpg',
    width: 1200,
    height: 600,
    title: 'We Are Here For You',
    subtitle: 'Support, scheduling, or compassionate guidance 24/7'
  },
  {
    fileName: 'pet-cremation-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Dignified Pet Cremation',
    subtitle: 'Private and communal services with loving respect'
  },
  {
    fileName: 'dog-cremation-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Dog Cremation Services',
    subtitle: 'Honoring your loyal, loving canine companion'
  },
  {
    fileName: 'cat-cremation-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Cat Cremation Services',
    subtitle: 'Gentle, respectful care for your feline friend'
  },
  {
    fileName: 'at-home-euthanasia-hero.jpg',
    width: 1200,
    height: 600,
    title: 'At-Home Euthanasia',
    subtitle: 'A peaceful, pain-free transition in the comfort of home'
  },
  {
    fileName: 'pet-hospice-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Palliative & Hospice Care',
    subtitle: 'Ensuring warmth, comfort, and relief in their final days'
  },
  {
    fileName: 'pet-grief-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Pet Grief & Bereavement',
    subtitle: 'Support, guidance, and resources to help you heal'
  },
  {
    fileName: 'pet-urns-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Memorial Urns & Keepsakes',
    subtitle: 'Beautiful vessels to honor your pet\'s memory forever'
  },
  {
    fileName: 'pet-memorial-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Honoring Their Memory',
    subtitle: 'Meaningful ways to celebrate a lifetime of love'
  },
  {
    fileName: 'pet-burial-hero.jpg',
    width: 1200,
    height: 600,
    title: 'Pet Burial Guidance',
    subtitle: 'Cemetery selection, home burials, and green burials'
  },
  {
    fileName: 'resources/quality-of-life-scale-dog.jpg',
    width: 800,
    height: 450,
    title: 'Dog Quality of Life Scale',
    subtitle: 'A gentle guide to assessing your dog\'s daily comfort'
  },
  {
    fileName: 'resources/pet-cremation-cost.jpg',
    width: 800,
    height: 450,
    title: 'Pet Cremation Costs',
    subtitle: 'Transparent guidance on private and communal costs'
  },
  {
    fileName: 'resources/backyard-pet-burial-laws.jpg',
    width: 800,
    height: 450,
    title: 'Backyard Burial Laws',
    subtitle: 'Understanding local regulations, safety, and options'
  }
];

async function run() {
  for (const img of imagesToGenerate) {
    const destPath = path.resolve(imagesDir, img.fileName);
    try {
      await generateGradientJpg(destPath, img.width, img.height, img.title, img.subtitle);
      console.log(`Successfully generated image: ${img.fileName}`);
    } catch (err) {
      console.error(`Error generating image ${img.fileName}:`, err);
    }
  }
  console.log('All images successfully processed.');
}

run();
