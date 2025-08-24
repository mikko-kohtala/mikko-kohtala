import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="mb-8 flex flex-col sm:flex-row items-center gap-8">
            <Image
              src="/images/mikko.jpg"
              alt="Mikko Kohtala"
              width={120}
              height={120}
              className="rounded-full border-2 grayscale hover:grayscale-0 transition-all duration-300"
              priority
            />
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-primary">~</span>/mikko-kohtala
              </h1>
              <p className="text-muted-foreground text-sm">
                <span className="terminal-prompt">location</span>
                <span className="text-foreground ml-2">Tampere, Finland</span>
              </p>
            </div>
          </div>

          <div className="border border-border p-6 mb-8">
            <p className="text-lg leading-relaxed">
              Experienced software developer with a strong background in both
              consultancy and in-house roles, building solutions from concept to
              production.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm">
              <span className="text-accent font-bold">[focus]</span>
              <ul className="mt-2 space-y-1 ml-8">
                <li className="before:content-['→'] before:text-muted-foreground before:mr-2">
                  AI and emerging technologies
                </li>
                <li className="before:content-['→'] before:text-muted-foreground before:mr-2">
                  Technical expertise
                </li>
                <li className="before:content-['→'] before:text-muted-foreground before:mr-2">
                  Continuous learning
                </li>
                <li className="before:content-['→'] before:text-muted-foreground before:mr-2">
                  Creating value-driven systems
                </li>
              </ul>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">
            <span className="text-primary">$</span> projects
          </h2>
          <div className="mb-8">
            <Link
              href="/apps"
              className="block border border-border px-4 py-3 hover:border-primary transition-colors group"
            >
              <span className="text-accent group-hover:text-primary transition-colors">
                [apps]
              </span>
              <span className="ml-2 text-muted-foreground">
                View my projects and applications
              </span>
            </Link>
          </div>

          <h2 className="text-xl font-bold mb-4">
            <span className="text-primary">$</span> connect
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://x.com/mikko_kohtala"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-4 py-3 hover:border-primary transition-colors group"
            >
              <span className="text-accent group-hover:text-primary transition-colors">
                [x/twitter]
              </span>
              <span className="ml-2 text-muted-foreground">@mikko_kohtala</span>
            </a>

            <a
              href="https://linkedin.com/in/mikko-kohtala"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-4 py-3 hover:border-primary transition-colors group"
            >
              <span className="text-accent group-hover:text-primary transition-colors">
                [linkedin]
              </span>
              <span className="ml-2 text-muted-foreground">Professional</span>
            </a>

            <a
              href="https://github.com/mikko-kohtala"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-4 py-3 hover:border-primary transition-colors group"
            >
              <span className="text-accent group-hover:text-primary transition-colors">
                [github]
              </span>
              <span className="ml-2 text-muted-foreground">Open source</span>
            </a>
          </nav>
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
