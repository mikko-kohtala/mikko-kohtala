import Image from "next/image";
import Link from "next/link";
import { env } from "@/env";
import { formatDate, getRecentPosts } from "@/lib/markdown";

export default function Home() {
  const includeDrafts = env.APP_ENV !== "production";
  const recentPosts = getRecentPosts(5, includeDrafts);

  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <div className="mb-8 flex flex-col items-center gap-8 sm:flex-row">
            <Image
              alt="Mikko Kohtala"
              className="rounded-full border-2 grayscale transition-all duration-300 hover:grayscale-0"
              height={120}
              priority
              src="/images/mikko.jpg"
              width={120}
            />
            <div className="text-center sm:text-left">
              <h1 className="mb-4 font-bold text-4xl">
                <span className="text-primary">~</span>/mikko-kohtala
              </h1>
              <p className="text-muted-foreground text-sm">
                <span className="terminal-prompt">location</span>
                <span className="ml-2 text-foreground">Tampere, Finland</span>
              </p>
            </div>
          </div>

          <div className="mb-8 border border-border p-6">
            <p className="text-lg leading-relaxed">
              Experienced software developer with a strong background in both consultancy and in-house roles, building
              solutions from concept to production.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm">
              <span className="font-bold text-accent">[focus]</span>
              <ul className="mt-2 ml-8 space-y-1">
                <li className="before:mr-2 before:text-muted-foreground before:content-['→']">
                  AI and emerging technologies
                </li>
                <li className="before:mr-2 before:text-muted-foreground before:content-['→']">Technical expertise</li>
                <li className="before:mr-2 before:text-muted-foreground before:content-['→']">Continuous learning</li>
                <li className="before:mr-2 before:text-muted-foreground before:content-['→']">
                  Build the Right Thing and Build the Thing Right
                </li>
              </ul>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> projects
          </h2>
          <div className="mb-8">
            <Link
              className="group block border border-border px-4 py-3 transition-colors hover:border-primary"
              href="/apps"
            >
              <span className="text-accent transition-colors group-hover:text-primary">[apps]</span>
              <span className="ml-2 text-muted-foreground">View my projects and applications</span>
            </Link>
          </div>

          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> connect
          </h2>
          <nav className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a
              className="group border border-border px-4 py-3 transition-colors hover:border-primary"
              href="https://x.com/mikko_kohtala"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-accent transition-colors group-hover:text-primary">[x/twitter]</span>
              <span className="ml-2 text-muted-foreground">@mikko_kohtala</span>
            </a>

            <a
              className="group border border-border px-4 py-3 transition-colors hover:border-primary"
              href="https://linkedin.com/in/mikko-kohtala"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-accent transition-colors group-hover:text-primary">[linkedin]</span>
              <span className="ml-2 text-muted-foreground">Professional</span>
            </a>

            <a
              className="group border border-border px-4 py-3 transition-colors hover:border-primary"
              href="https://github.com/mikko-kohtala"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-accent transition-colors group-hover:text-primary">[github]</span>
              <span className="ml-2 text-muted-foreground">Open source</span>
            </a>
          </nav>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> blog
          </h2>
          <p className="mb-4 text-muted-foreground">Thoughts on software development, AI, and life in general.</p>
          <div className="mb-6">
            <Link
              className="mb-4 inline-block text-muted-foreground text-sm transition-colors hover:text-primary"
              href="/blog"
            >
              <span className="text-accent">→</span> View all posts
            </Link>
          </div>
          {recentPosts.length > 0 && (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  className="group block border border-border px-4 py-3 transition-colors hover:border-primary"
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                >
                  <div className="flex gap-3">
                    {post.coverImageThumbnail && (
                      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded">
                        <img
                          alt={`Cover image for ${post.title}`}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          src={post.coverImageThumbnail}
                        />
                        {post.isDraft && (
                          <div className="absolute top-0.5 left-0.5">
                            <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-1 py-0.5 font-bold text-orange-400 text-xs">
                              DRAFT
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="mb-1 font-bold transition-colors group-hover:text-primary">{post.title}</h3>
                          {post.isDraft && !post.coverImageThumbnail && (
                            <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-1 py-0.5 font-bold text-orange-400 text-xs">
                              DRAFT
                            </span>
                          )}
                        </div>
                        <p className="line-clamp-2 text-muted-foreground text-sm">{post.description}</p>
                      </div>
                      <div className="shrink-0 text-muted-foreground text-xs">
                        <span className="text-accent">[</span>
                        {formatDate(post.date)}
                        <span className="text-accent">]</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* <footer className="pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            <span className="terminal-prompt">status</span>
            <span className="text-primary ml-2">online</span>
            <span className="terminal-cursor">_</span>
          </p>
        </footer> */}
      </div>
    </div>
  );
}
