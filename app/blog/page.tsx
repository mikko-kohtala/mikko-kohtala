import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags, formatDate } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Blog | Mikko Kohtala",
  description:
    "Thoughts on software development, AI, and life in general.",
  openGraph: {
    title: "Blog | Mikko Kohtala",
    description:
      "Thoughts on software development, AI, and life in general.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="mr-2">←</span> Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">Blog</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-4">
            <span className="text-primary">$</span> blog
          </h1>
          <p className="text-muted-foreground">
            Thoughts on software development, AI, and life in general.
          </p>
        </header>

        {tags.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">
              <span className="text-accent">[tags]</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                  className="border border-border px-3 py-1 text-sm hover:border-primary transition-colors"
                >
                  <span className="text-accent">#</span>
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-bold mb-6">
            <span className="text-accent">[posts]</span>
            <span className="text-muted-foreground ml-2 text-sm font-normal">
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
                  key={post.slug}
                  className="border border-border p-6 hover:border-primary transition-colors group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <div className="text-sm text-muted-foreground shrink-0">
                        <span className="text-accent">[</span>
                        {formatDate(post.date)}
                        <span className="text-accent">]</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-3">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="text-muted-foreground">
                        <span className="text-accent">⏱</span>{" "}
                        {post.readingTime}
                      </div>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-muted-foreground"
                            >
                              <span className="text-accent">#</span>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))
            )}
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="inline-block border border-border px-4 py-2 hover:border-primary transition-colors"
          >
            <span className="text-accent">←</span> Back to home
          </Link>
        </footer>
      </div>
    </div>
  );
}
