import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.join(process.cwd(), 'public/images/blog');
const THUMBNAILS_DIR = path.join(process.cwd(), 'public/images/blog/thumbnails');

export interface ImageVariant {
  width: number;
  height: number;
  suffix: string;
}

// Define image variants for different use cases
export const IMAGE_VARIANTS: Record<string, ImageVariant> = {
  thumbnail: { width: 400, height: 225, suffix: '-thumb' },
  card: { width: 600, height: 338, suffix: '-card' },
  hero: { width: 1200, height: 675, suffix: '-hero' },
};

/**
 * Generate thumbnails for a blog post cover image
 */
export async function generateThumbnails(originalImagePath: string, slug: string): Promise<Record<string, string>> {
  const results: Record<string, string> = {};

  if (!fs.existsSync(originalImagePath)) {
    throw new Error(`Original image not found: ${originalImagePath}`);
  }

  // Ensure thumbnails directory exists
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
  }

  for (const [variantName, variant] of Object.entries(IMAGE_VARIANTS)) {
    const outputFileName = `${slug}${variant.suffix}.webp`;
    const outputPath = path.join(THUMBNAILS_DIR, outputFileName);

    await sharp(originalImagePath)
      .resize(variant.width, variant.height, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 85 })
      .toFile(outputPath);

    results[variantName] = `/images/blog/thumbnails/${outputFileName}`;
  }

  return results;
}

/**
 * Get the cover image path for a blog post
 */
export function getCoverImagePath(slug: string, variant: keyof typeof IMAGE_VARIANTS = 'card'): string | null {
  const variantConfig = IMAGE_VARIANTS[variant];
  if (!variantConfig) return null;

  const thumbnailPath = path.join(THUMBNAILS_DIR, `${slug}${variantConfig.suffix}.webp`);

  if (fs.existsSync(thumbnailPath)) {
    return `/images/blog/thumbnails/${slug}${variantConfig.suffix}.webp`;
  }

  return null;
}

/**
 * Get the original cover image path for a blog post
 */
export function getOriginalCoverImagePath(coverImage: string): string | null {
  if (!coverImage) return null;

  const originalPath = path.join(process.cwd(), 'public', coverImage);

  if (fs.existsSync(originalPath)) {
    return coverImage;
  }

  return null;
}

/**
 * Check if thumbnails exist for a cover image, generate them if they don't
 */
export async function ensureThumbnailsExist(coverImage: string, slug: string): Promise<Record<string, string>> {
  if (!coverImage) return {};

  const originalPath = path.join(process.cwd(), 'public', coverImage);

  if (!fs.existsSync(originalPath)) {
    return {};
  }

  // Check if all variants exist
  const existingVariants: Record<string, string> = {};
  let needsGeneration = false;

  for (const [variantName, variant] of Object.entries(IMAGE_VARIANTS)) {
    const thumbnailPath = path.join(THUMBNAILS_DIR, `${slug}${variant.suffix}.webp`);
    const webPath = `/images/blog/thumbnails/${slug}${variant.suffix}.webp`;

    if (fs.existsSync(thumbnailPath)) {
      existingVariants[variantName] = webPath;
    } else {
      needsGeneration = true;
      break;
    }
  }

  // If any variant is missing, regenerate all
  if (needsGeneration) {
    return await generateThumbnails(originalPath, slug);
  }

  return existingVariants;
}
