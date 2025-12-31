import Image from "next/image";
import Link from "next/link";

interface App {
  name: string;
  description: string;
  tech: string[];
  status: string;
  url?: string;
  appStoreUrl?: string | null;
}

export default function AppsPage() {
  const apps: App[] = [
    {
      name: "Better Image Optimizer",
      description:
        "A native macOS app for batch image optimization. Drag-and-drop images, choose a compression level, and get optimized files in seconds. Features watch folders, menu bar integration, and 5 compression presets from lossless to maximum compression.",
      tech: ["Swift", "SwiftUI", "macOS", "libvips"],
      status: "Active",
      url: "https://www.betterimageoptimizer.com",
      appStoreUrl: null,
    },
    {
      name: "Multi AI",
      description:
        "Chat with multiple AI models simultaneously. Compare responses, get diverse perspectives, and leverage the strengths of different language models.",
      tech: ["Next.js", "TypeScript", "OpenAI", "Anthropic", "Google AI"],
      status: "Active",
    },
    {
      name: "Git Worktree CLI",
      description:
        "A powerful command-line tool for managing Git worktrees efficiently. Simplifies branch management and enables seamless context switching.",
      tech: ["Rust", "Git", "CLI"],
      status: "Active",
    },
    {
      name: "Port Monitor",
      description:
        "Monitor and manage network ports on your system. Track active connections, identify processes, and ensure system security.",
      tech: ["Go", "System Programming", "Networking"],
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <h1 className="mb-2 font-bold text-3xl">
            <span className="text-primary">~/</span>apps
          </h1>
          <p className="text-muted-foreground">A collection of tools and applications I&apos;ve built.</p>
        </header>

        <div className="space-y-8">
          {apps.map((app, index) => (
            <article
              className="rounded-none border border-border p-6 transition-colors hover:border-primary"
              key={app.name}
            >
              <div className="mb-4 flex items-start justify-between">
                <h2 className="font-bold text-xl">
                  <span className="mr-2 text-accent">[{String(index + 1).padStart(2, "0")}]</span>
                  {app.name}
                </h2>
                <span className="bg-primary px-2 py-1 text-primary-foreground text-xs">{app.status}</span>
              </div>

              <p className="mb-4 text-muted-foreground leading-relaxed">
                {app.description}
                {app.url && (
                  <>
                    {" "}
                    <Link
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent transition-colors hover:text-primary hover:underline"
                    >
                      {app.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </Link>
                  </>
                )}
              </p>

              <div className="flex flex-wrap gap-2">
                {app.tech.map((tech) => (
                  <span
                    className="border border-border px-2 py-1 text-xs transition-colors hover:border-accent"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {app.appStoreUrl !== undefined && (
                <div className="mt-4 flex items-start border-border border-t pt-4">
                  {app.appStoreUrl ? (
                    <Link href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/app-store-badge.svg"
                        alt="Download on the App Store"
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                      />
                    </Link>
                  ) : (
                    <div className="flex flex-col items-start">
                      <Image
                        src="/app-store-badge.svg"
                        alt="Download on the App Store - Coming Soon"
                        width={120}
                        height={40}
                        className="h-10 w-auto opacity-40 grayscale"
                      />
                      <span className="mt-1 text-muted-foreground text-xs">Coming Soon</span>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        <footer className="mt-12 border-border border-t pt-8">
          <p className="text-muted-foreground text-sm">
            <span className="terminal-prompt">More projects coming soon</span>
            <span className="terminal-cursor">_</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
