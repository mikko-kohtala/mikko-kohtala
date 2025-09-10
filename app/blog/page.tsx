import type { Metadata } from "next";
import Link from "next/link";
import { env } from "@/env";
import { formatDate, getAllPosts, getAllTags } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Blog | Mikko Kohtala",
  description: "Thoughts on software development, AI, and life in general.",
  openGraph: {
    title: "Blog | Mikko Kohtala",
    description: "Thoughts on software development, AI, and life in general.",
    type: "website",
  },
};

export default function BlogPage() {
  const includeDrafts = env.APP_ENV !== "production";
  const posts = getAllPosts(includeDrafts);
  const tags = getAllTags(includeDrafts);

  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8">
          <Link className="text-muted-foreground transition-colors hover:text-primary" href="/">
            <span className="mr-2">←</span> Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">Blog</span>
        </nav>

        <header className="mb-12">
          <h1 className="mb-4 font-bold text-3xl">
            <span className="text-primary">$</span> blog
          </h1>
          <p className="text-muted-foreground">Thoughts on software development, AI, and life in general.</p>
        </header>

        {tags.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 font-bold text-lg">
              <span className="text-accent">[tags]</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  className="border border-border px-3 py-1 text-sm transition-colors hover:border-primary"
                  href={`/blog/tag/${tag}`}
                  key={tag}
                >
                  <span className="text-accent">#</span>
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-6 font-bold text-lg">
            <span className="text-accent">[posts]</span>
            <span className="ml-2 font-normal text-muted-foreground text-sm">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          </h2>

          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="border border-border p-6 text-center text-muted-foreground">
                No posts published yet. Check back soon!
              </div>
            ) : (
              posts.map((post) => (
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
                            <h3 className="font-bold text-lg transition-colors group-hover:text-primary">
                              {post.title}
                            </h3>
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
                              {post.tags.map((tag) => (
                                <span className="text-muted-foreground text-xs" key={tag}>
                                  <span className="text-accent">#</span>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))
            )}
          </div>
        </section>

        <footer className="mt-12 border-border border-t pt-8">
          <Link className="inline-block border border-border px-4 py-2 transition-colors hover:border-primary" href="/">
            <span className="text-accent">←</span> Back to home
          </Link>
        </footer>
      </div>
    </div>
  );
}
