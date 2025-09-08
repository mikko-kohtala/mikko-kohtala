import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import { format, parseISO } from "date-fns";

const postsDirectory = path.join(process.cwd(), "content/blog");
const draftsDirectory = path.join(process.cwd(), "content/drafts");

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  slug: string;
  readingTime?: string;
}

export interface Post extends PostMetadata {
  content: string;
  contentHtml?: string;
}

function getPostsFromDirectory(directory: string): PostMetadata[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Extract slug from YYYY-MM-DD-slug.md format
      const fileNameWithoutExt = fileName.replace(/\.md$/, "");
      const match = fileNameWithoutExt.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
      const slug = match ? match[1] : fileNameWithoutExt;

      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const stats = readingTime(content);

      return {
        slug,
        readingTime: stats.text,
        ...(data as Omit<PostMetadata, "slug" | "readingTime">),
      };
    });

  return allPostsData;
}

export function getAllPosts(includeDrafts = false): PostMetadata[] {
  const publishedPosts = getPostsFromDirectory(postsDirectory);
  const draftPosts = includeDrafts
    ? getPostsFromDirectory(draftsDirectory)
    : [];

  const allPosts = [...publishedPosts, ...draftPosts]
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return allPosts;
}

export function getRecentPosts(limit = 5): PostMetadata[] {
  return getAllPosts().slice(0, limit);
}

export async function getPostBySlug(
  slug: string,
  isDraft = false
): Promise<Post | null> {
  const directory = isDraft ? draftsDirectory : postsDirectory;
  
  // Find the file with the date prefix
  const files = fs.existsSync(directory) ? fs.readdirSync(directory) : [];
  const matchingFile = files.find(file => {
    // Match either YYYY-MM-DD-slug.md or just slug.md
    return file.endsWith(`-${slug}.md`) || file === `${slug}.md`;
  });
  
  if (!matchingFile) {
    // Try the other directory
    const altDirectory = isDraft ? postsDirectory : draftsDirectory;
    const altFiles = fs.existsSync(altDirectory) ? fs.readdirSync(altDirectory) : [];
    const altMatchingFile = altFiles.find(file => {
      return file.endsWith(`-${slug}.md`) || file === `${slug}.md`;
    });
    
    if (!altMatchingFile) {
      return null;
    }
    return getPostBySlug(slug, !isDraft);
  }
  
  const fullPath = path.join(directory, matchingFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const stats = readingTime(content);

  return {
    slug,
    content,
    contentHtml,
    readingTime: stats.text,
    ...(data as Omit<Post, "slug" | "content" | "contentHtml" | "readingTime">),
  };
}

export function getPostsByTag(tag: string): PostMetadata[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
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
  return format(date, "MMMM d, yyyy");
}
