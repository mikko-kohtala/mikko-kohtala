#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { ensureThumbnailsExist } from '../lib/images';

const CONTENT_DIRS = [path.join(process.cwd(), 'content/blog'), path.join(process.cwd(), 'content/drafts')];

async function generateAllThumbnails() {
  console.log('🖼️  Generating thumbnails for blog post images...\n');

  let processedCount = 0;
  let generatedCount = 0;

  for (const contentDir of CONTENT_DIRS) {
    if (!fs.existsSync(contentDir)) {
      console.log(`📁 Directory ${contentDir} does not exist, skipping...`);
      continue;
    }

    const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      if (!data.coverImage) {
        continue;
      }

      // Extract slug from filename
      const fileNameWithoutExt = file.replace(/\.md$/, '');
      const match = fileNameWithoutExt.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
      const slug = match ? match[1] : fileNameWithoutExt;

      try {
        console.log(`📝 Processing: ${file}`);
        console.log(`   Cover image: ${data.coverImage}`);

        const thumbnails = await ensureThumbnailsExist(data.coverImage, slug);

        if (Object.keys(thumbnails).length > 0) {
          generatedCount++;
          console.log('   ✅ Generated thumbnails:');
          for (const [variant, path] of Object.entries(thumbnails)) {
            console.log(`      ${variant}: ${path}`);
          }
        } else {
          console.log('   ⚠️  No thumbnails generated (original image may not exist)');
        }

        processedCount++;
      } catch (error) {
        console.error(`   ❌ Error processing ${file}:`, error);
      }

      console.log('');
    }
  }

  console.log(`🎉 Complete! Processed ${processedCount} posts with cover images.`);
  console.log(`📸 Generated thumbnails for ${generatedCount} posts.`);
}

if (require.main === module) {
  generateAllThumbnails().catch(console.error);
}
