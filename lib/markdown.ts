import fs from 'node:fs';
import path from 'node:path';
import { format, parseISO } from 'date-fns';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import html from 'remark-html';
import { ensureThumbnailsExist, getCoverImagePath } from './images';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const draftsDirectory = path.join(process.cwd(), 'content/drafts');

// Convert a tag to kebab-case format
function toKebabCase(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  slug: string;
  readingTime?: string;
  isDraft?: boolean;
  coverImage?: string;
  coverImageThumbnail?: string;
}

export interface Post extends PostMetadata {
  content: string;
  contentHtml?: string;
}

function getPostsFromDirectory(directory: string, isDraftsDir = false): PostMetadata[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Extract slug from YYYY-MM-DD-slug.md format
      const fileNameWithoutExt = fileName.replace(/\.md$/, '');
      const match = fileNameWithoutExt.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
      const slug = match ? match[1] : fileNameWithoutExt;

      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const stats = readingTime(content);

      // Generate cover image thumbnail path if cover image exists
      const coverImageThumbnail = data.coverImage ? (getCoverImagePath(slug, 'card') ?? undefined) : undefined;

      // Convert tags to kebab-case
      const tags = data.tags ? data.tags.map((tag: string) => toKebabCase(tag)) : [];

      return {
        slug,
        readingTime: stats.text,
        isDraft: isDraftsDir,
        coverImageThumbnail,
        ...(data as Omit<PostMetadata, 'slug' | 'readingTime' | 'isDraft' | 'coverImageThumbnail' | 'tags'>),
        tags,
      };
    });

  return allPostsData;
}

export function getAllPosts(includeDrafts = false): PostMetadata[] {
  const publishedPosts = getPostsFromDirectory(postsDirectory, false);
  const draftPosts = includeDrafts ? getPostsFromDirectory(draftsDirectory, true) : [];

  const allPosts = [...publishedPosts, ...draftPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return allPosts;
}

export function getRecentPosts(limit = 5, includeDrafts = false): PostMetadata[] {
  return getAllPosts(includeDrafts).slice(0, limit);
}

export async function getPostBySlug(slug: string, isDraft = false): Promise<Post | null> {
  const directory = isDraft ? draftsDirectory : postsDirectory;

  // Find the file with the date prefix
  const files = fs.existsSync(directory) ? fs.readdirSync(directory) : [];
  const matchingFile = files.find((file) => {
    // Match either YYYY-MM-DD-slug.md or just slug.md
    return file.endsWith(`-${slug}.md`) || file === `${slug}.md`;
  });

  if (!matchingFile) {
    // Try the other directory
    const altDirectory = isDraft ? postsDirectory : draftsDirectory;
    const altFiles = fs.existsSync(altDirectory) ? fs.readdirSync(altDirectory) : [];
    const altMatchingFile = altFiles.find((file) => {
      return file.endsWith(`-${slug}.md`) || file === `${slug}.md`;
    });

    if (!altMatchingFile) {
      return null;
    }
    return getPostBySlug(slug, !isDraft);
  }

  const fullPath = path.join(directory, matchingFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const stats = readingTime(content);

  // Generate cover image thumbnail path if cover image exists
  const coverImageThumbnail = data.coverImage ? (getCoverImagePath(slug, 'hero') ?? undefined) : undefined;

  // Convert tags to kebab-case
  const tags = data.tags ? data.tags.map((tag: string) => toKebabCase(tag)) : [];

  return {
    slug,
    content,
    contentHtml,
    readingTime: stats.text,
    isDraft,
    coverImageThumbnail,
    ...(data as Omit<
      Post,
      'slug' | 'content' | 'contentHtml' | 'readingTime' | 'isDraft' | 'coverImageThumbnail' | 'tags'
    >),
    tags,
  };
}

export function getPostsByTag(tag: string, includeDrafts = false): PostMetadata[] {
  return getAllPosts(includeDrafts).filter((post) => post.tags?.includes(tag));
}

export function getAllTags(includeDrafts = false): string[] {
  const posts = getAllPosts(includeDrafts);
  const tagSet = new Set<string>();

  for (const post of posts) {
    if (post.tags) {
      for (const tag of post.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).sort();
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy');
}
