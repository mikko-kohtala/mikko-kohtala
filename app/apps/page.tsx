export default function AppsPage() {
  const apps = [
    {
      name: "Multi AI",
      description: "Chat with multiple AI models simultaneously. Compare responses, get diverse perspectives, and leverage the strengths of different language models.",
      tech: ["Next.js", "TypeScript", "OpenAI", "Anthropic", "Google AI"],
      status: "Active",
    },
    {
      name: "Git Worktree CLI",
      description: "A powerful command-line tool for managing Git worktrees efficiently. Simplifies branch management and enables seamless context switching.",
      tech: ["Rust", "Git", "CLI"],
      status: "Active",
    },
    {
      name: "Port Monitor",
      description: "Monitor and manage network ports on your system. Track active connections, identify processes, and ensure system security.",
      tech: ["Go", "System Programming", "Networking"],
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-primary">~/</span>apps
          </h1>
          <p className="text-muted-foreground">
            A collection of tools and applications I've built.
          </p>
        </header>

        <div className="space-y-8">
          {apps.map((app, index) => (
            <article
              key={app.name}
              className="border border-border rounded-none p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold">
                  <span className="text-accent mr-2">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                  {app.name}
                </h2>
                <span className="text-xs px-2 py-1 bg-primary text-primary-foreground">
                  {app.status}
                </span>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {app.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {app.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 border border-border hover:border-accent transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            <span className="terminal-prompt">More projects coming soon</span>
            <span className="terminal-cursor">_</span>
          </p>
        </footer>
      </div>
    </div>
  );
}