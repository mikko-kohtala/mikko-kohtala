const _fs = require("node:fs");
const sharp = require("sharp");

async function createPlaceholder() {
  const width = 1200;
  const height = 675;

  // Create a dark background SVG
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="45%" text-anchor="middle" font-family="monospace" font-size="64" fill="white">MULTI-AI CLI</text>
      <text x="50%" y="55%" text-anchor="middle" font-family="monospace" font-size="48" fill="#60a5fa">TOOLS EXPERIMENT</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile("/Users/mikko/code/mikko-kohtala/public/images/blog/2025-01-09-multi-ai-cli-experiment-cover.png");

  console.log("✅ Placeholder image created");
}

createPlaceholder().catch(console.error);
