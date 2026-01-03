import Image from "next/image";
import Link from "next/link";

type App = {
  name: string;
  description: string;
  tech: string[];
  tags?: string[];
  links?: {
    github?: string;
    crates?: string;
    website?: string;
  };
  appStoreUrl?: string | null;
  status: string;
};

export default function AppsPage() {
  const apps: App[] = [
    {
      name: "Better Image Optimizer",
      description:
        "A native macOS app for batch image optimization. Drag-and-drop images, choose a compression level, and get optimized files in seconds. Features watch folders, menu bar integration, and 5 compression presets from lossless to maximum compression.",
      tech: ["Swift", "SwiftUI", "macOS", "libvips"],
      links: {
        website: "https://www.betterimageoptimizer.com",
      },
      appStoreUrl: null,
      status: "Active",
    },
    {
      name: "Git Worktree CLI",
      description:
        "A powerful command-line tool for managing Git worktrees efficiently. Simplifies branch management and enables seamless context switching.",
      tech: ["Rust", "Git", "CLI"],
      tags: ["Open Source"],
      links: {
        github: "https://github.com/mikko-kohtala/git-worktree-cli",
        crates: "https://crates.io/crates/git-worktree-cli",
      },
      status: "Active",
    },
    {
      name: "Port Monitor",
      description:
        "Monitor and manage network ports on your system. Track active connections, identify processes, and ensure system security.",
      tech: ["Go", "System Programming", "Networking"],
      links: {
        website: "https://www.port-monitor.app",
      },
      status: "Active",
    },
    {
      name: "Multi-AI CLI",
      description:
        "A Rust CLI tool that manages multiple AI development environments using git worktrees and iTerm2/tmux sessions. Simplifies working with multiple AI coding assistants by creating isolated worktrees and organized terminal layouts.",
      tech: ["Rust", "Git", "CLI", "iTerm2", "tmux"],
      tags: ["Open Source"],
      links: {
        github: "https://github.com/mikko-kohtala/multi-ai-cli",
      },
      status: "Active",
    },
    {
      name: "ai-cli",
      description:
        "A Rust CLI tool to manage AI CLI tools and MCP servers from one place. Install, update, and configure multiple AI coding assistants with a single unified interface.",
      tech: ["Rust", "CLI"],
      tags: ["Open Source"],
      links: {
        github: "https://github.com/mikko-kohtala/ai-cli",
      },
      status: "Active",
    },
  ];

  const comingUp: App[] = [
    {
      name: "Better Image Generator",
      description:
        "Credit-based AI image generation app powered by Google Gemini models. Generate high-quality images with intuitive controls and team collaboration features.",
      tech: ["Next.js", "React", "Convex", "Google Gemini", "Stripe"],
      status: "Coming Soon",
    },
    {
      name: "Multi AI",
      description:
        "Chat with multiple AI models simultaneously. Compare responses, get diverse perspectives, and leverage the strengths of different language models.",
      tech: ["Next.js", "TypeScript", "OpenAI", "Anthropic", "Google AI"],
      status: "Coming Soon",
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

              <p className="mb-4 text-muted-foreground leading-relaxed">{app.description}</p>

              <div className="flex flex-wrap gap-2">
                {app.tech.map((tech) => (
                  <span
                    className="border border-border px-2 py-1 text-xs transition-colors hover:border-accent"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
                {app.tags?.map((tag) => (
                  <span className="border border-accent bg-accent/10 px-2 py-1 text-accent text-xs" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {app.links && (
                <div className="mt-4 flex gap-4 text-sm">
                  {Object.entries(app.links).map(([key, url]) => (
                    <a
                      className="border-accent/50 border-b text-accent transition-colors hover:border-accent"
                      href={url}
                      key={key}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {{ website: "Website", github: "GitHub", crates: "Crates.io" }[key]} →
                    </a>
                  ))}
                </div>
              )}

              {app.appStoreUrl !== undefined && (
                <div className="mt-4 flex items-start border-border border-t pt-4">
                  {app.appStoreUrl ? (
                    <Link href={app.appStoreUrl} rel="noopener noreferrer" target="_blank">
                      <Image
                        alt="Download on the App Store"
                        className="h-10 w-auto"
                        height={40}
                        src="/app-store-badge.svg"
                        width={120}
                      />
                    </Link>
                  ) : (
                    <div className="flex flex-col items-start">
                      <Image
                        alt="Download on the App Store - Coming Soon"
                        className="h-10 w-auto opacity-40 grayscale"
                        height={40}
                        src="/app-store-badge.svg"
                        width={120}
                      />
                      <span className="mt-1 text-muted-foreground text-xs">Coming Soon</span>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        <section className="mt-12 border-border border-t pt-8">
          <h2 className="mb-6 font-bold text-xl">
            <span className="text-primary">~/</span>coming-up
          </h2>
          <div className="space-y-6">
            {comingUp.map((app, index) => (
              <article
                className="rounded-none border border-border/50 p-6 opacity-75 transition-colors hover:border-primary/50"
                key={app.name}
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="font-bold text-lg">
                    <span className="mr-2 text-accent/70">[{String(index + 1).padStart(2, "0")}]</span>
                    {app.name}
                  </h3>
                  <span className="bg-muted px-2 py-1 text-muted-foreground text-xs">{app.status}</span>
                </div>

                <p className="mb-4 text-muted-foreground leading-relaxed">{app.description}</p>

                <div className="flex flex-wrap gap-2">
                  {app.tech.map((tech) => (
                    <span className="border border-border/50 px-2 py-1 text-muted-foreground text-xs" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-border border-t pt-8">
          <p className="text-muted-foreground text-sm">
            <span className="terminal-prompt">More updates coming soon</span>
            <span className="terminal-cursor">_</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
