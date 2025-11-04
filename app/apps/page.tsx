export default function AppsPage() {
  const apps = [
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
              </div>
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
