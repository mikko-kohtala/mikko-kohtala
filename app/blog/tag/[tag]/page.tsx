import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { env } from '@/env';
import { formatDate, getAllTags, getPostsByTag } from '@/lib/markdown';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const includeDrafts = env.APP_ENV === 'local';
  const tags = getAllTags(includeDrafts);
  // Tags are already in kebab-case format from markdown.ts
  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);

  // Find if tag exists
  const includeDrafts = env.APP_ENV === 'local';
  const allTags = getAllTags(includeDrafts);
  const tagExists = allTags.includes(tag);

  if (!tagExists) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `Posts tagged "${tag}" | Mikko Kohtala`,
    description: `All blog posts tagged with ${tag}`,
    openGraph: {
      title: `Posts tagged "${tag}"`,
      description: `All blog posts tagged with ${tag}`,
      type: 'website',
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);

  // Check if tag exists
  const includeDrafts = env.APP_ENV === 'local';
  const allTags = getAllTags(includeDrafts);
  const tagExists = allTags.includes(tag);

  if (!tagExists) {
    notFound();
  }

  const posts = getPostsByTag(tag, includeDrafts);

  if (posts.length === 0) {
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
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">
            <span className="text-accent">#</span>
            {tag}
          </span>
        </nav>

        <header className="mb-12">
          <h1 className="mb-4 font-bold text-3xl">
            <span className="text-primary">#</span> {tag}
          </h1>
          <p className="text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with &ldquo;{tag}&rdquo;
          </p>
        </header>

        <section className="mb-12">
          <h2 className="mb-6 font-bold text-lg">
            <span className="text-accent">[posts]</span>
          </h2>

          <div className="space-y-6">
            {posts.map((post) => (
              <article
                className="group border border-border p-6 transition-colors hover:border-primary"
                key={post.slug}
              >
                <Link className="block" href={`/blog/${post.slug}`}>
                  <div className="flex gap-4">
                    {post.coverImageThumbnail && (
                      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded">
                        <img
                          alt={`Cover image for ${post.title}`}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          src={post.coverImageThumbnail}
                        />
                        {post.isDraft && (
                          <div className="absolute top-1 left-1">
                            <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-1 py-0.5 font-bold text-orange-400 text-xs">
                              DRAFT
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg transition-colors group-hover:text-primary">{post.title}</h3>
                          {post.isDraft && !post.coverImageThumbnail && (
                            <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 font-bold text-orange-400 text-xs">
                              DRAFT
                            </span>
                          )}
                        </div>
                        <div className="shrink-0 text-muted-foreground text-sm">
                          <span className="text-accent">[</span>
                          {formatDate(post.date)}
                          <span className="text-accent">]</span>
                        </div>
                      </div>

                      <p className="mb-3 text-muted-foreground">{post.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="text-muted-foreground">
                          <span className="text-accent">⏱</span> {post.readingTime}
                        </div>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                              <span
                                className={`text-xs ${t === tag ? 'font-bold text-primary' : 'text-muted-foreground'}`}
                                key={t}
                              >
                                <span className="text-accent">#</span>
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-bold text-lg">
            <span className="text-accent">[other tags]</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags
              .filter((t) => t !== tag)
              .map((t) => (
                <Link
                  className="border border-border px-3 py-1 text-sm transition-colors hover:border-primary"
                  href={`/blog/tag/${t}`}
                  key={t}
                >
                  <span className="text-accent">#</span>
                  {t}
                </Link>
              ))}
          </div>
        </section>

        <footer className="border-border border-t pt-8">
          <div className="flex gap-4">
            <Link
              className="inline-block border border-border px-4 py-2 transition-colors hover:border-primary"
              href="/blog"
            >
              <span className="text-accent">←</span> All posts
            </Link>
            <Link
              className="inline-block border border-border px-4 py-2 transition-colors hover:border-primary"
              href="/"
            >
              <span className="text-accent">←</span> Home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
