import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { SocialShare } from "@/components/social-share";
import { env } from "@/env";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/markdown";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const includeDrafts = env.APP_ENV !== "production";
  const posts = getAllPosts(includeDrafts);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  // Try regular post first, then draft if in non-production environment
  let post = await getPostBySlug(resolvedParams.slug);
  if (!post && env.APP_ENV !== "production") {
    post = await getPostBySlug(resolvedParams.slug, true);
  }

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Mikko Kohtala`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  // Try regular post first, then draft if in non-production environment
  let post = await getPostBySlug(resolvedParams.slug);
  if (!post && env.APP_ENV !== "production") {
    post = await getPostBySlug(resolvedParams.slug, true);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8">
          <Link className="text-muted-foreground transition-colors hover:text-primary" href="/">
            <span className="mr-2">←</span> Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link className="text-muted-foreground transition-colors hover:text-primary" href="/blog">
            Blog
          </Link>
        </nav>

        <article>
          {post.coverImageThumbnail && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
              <img
                alt={`Cover image for ${post.title}`}
                className="h-full w-full object-cover"
                src={post.coverImageThumbnail}
              />
              {post.isDraft && (
                <div className="absolute top-4 left-4">
                  <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 font-bold text-orange-400 text-sm">
                    DRAFT
                  </span>
                </div>
              )}
            </div>
          )}

          <header className="mb-8 border-border border-b pb-8">
            <div className="mb-4 flex items-center gap-3">
              <h1 className="font-bold text-3xl">
                <span className="text-primary">#</span> {post.title}
              </h1>
              {post.isDraft && !post.coverImageThumbnail && (
                <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 font-bold text-orange-400 text-sm">
                  DRAFT
                </span>
              )}
            </div>

            <div className="mb-4 flex flex-wrap gap-4 text-muted-foreground text-sm">
              <div>
                <span className="text-accent">[date]</span>
                <span className="ml-2">{formatDate(post.date)}</span>
              </div>
              <div>
                <span className="text-accent">[author]</span>
                <span className="ml-2">{post.author}</span>
              </div>
              <div>
                <span className="text-accent">[reading]</span>
                <span className="ml-2">{post.readingTime}</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    className="border border-border px-2 py-1 text-xs transition-colors hover:border-primary"
                    href={`/blog/tag/${tag}`}
                    key={tag}
                  >
                    <span className="text-accent">#</span>
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-6">
              <SocialShare
                title={post.title}
                url={`${env.NEXT_PUBLIC_BASE_URL || 'https://mikko-kohtala.com'}/blog/${post.slug}`}
                description={post.description}
              />
            </div>
          </header>

          <Markdown html={post.contentHtml || ""} />
        </article>

        <footer className="mt-12 border-border border-t pt-8">
          <Link
            className="inline-block border border-border px-4 py-2 transition-colors hover:border-primary"
            href="/blog"
          >
            <span className="text-accent">←</span> Back to all posts
          </Link>
        </footer>
      </div>
    </div>
  );
}
