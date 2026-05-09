import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    src: 'C:/Users/LENOVO/.gemini/antigravity/brain/ef158dc9-5e11-4bfe-9e42-6fab05fe7c00/quiet_collection_banner_1778330357956.png',
    dest: 'public/images/quiet-collection-banner.png'
  },
  {
    src: 'C:/Users/LENOVO/.gemini/antigravity/brain/ef158dc9-5e11-4bfe-9e42-6fab05fe7c00/about_hero_1778330767828.png',
    dest: 'public/images/about-hero.png'
  },
  {
    src: 'C:/Users/LENOVO/.gemini/antigravity/brain/ef158dc9-5e11-4bfe-9e42-6fab05fe7c00/about_story_1778330783090.png',
    dest: 'public/images/about-story.png'
  }
];

const destDir = path.join(__dirname, 'public/images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

images.forEach(img => {
  if (fs.existsSync(img.src)) {
    fs.copyFileSync(img.src, path.join(__dirname, img.dest));
    console.log(`Copied ${img.dest}`);
  } else {
    console.log(`Source not found: ${img.src}`);
  }
});
