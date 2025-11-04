import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-native Fullstack Software Developer | Mikko Kohtala",
  description:
    "Curriculum vitae for Mikko Kohtala highlighting AI-native fullstack software development across B2B services, IoT, virtual events, and finance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CvPage() {
  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="border border-border p-6">
          <h1 className="mb-2 font-bold text-3xl">
            <span className="text-primary">~/</span>cv
          </h1>
          <p className="font-semibold text-lg">
            AI-native Fullstack Software Developer
          </p>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <span className="terminal-prompt">email</span>
              <div>
                <a
                  className="text-foreground underline"
                  href="mailto:mikko.kohtala@knowit.fi"
                >
                  mikko@mbit.fi
                </a>
              </div>
            </div>
            <div>
              <span className="terminal-prompt">phone</span>
              <div>
                <a
                  className="text-foreground underline"
                  href="tel:+358408291001"
                >
                  +358 40 829 1001
                </a>
              </div>
            </div>
            <div>
              <span className="terminal-prompt">location</span>
              <div className="text-foreground">Tampere, Finland</div>
            </div>
          </div>
        </header>

        <section>
          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> summary
          </h2>
          <div className="space-y-4 border border-border p-6 text-muted-foreground leading-relaxed">
            <p>
              Mikko has worked as a software developer across a broad range of
              projects, including both in-house development and client-facing
              solutions. He has designed and built software across sectors such
              as B2B services, IoT systems, virtual event platforms, and
              financial applications.
            </p>
            <p>
              He is comfortable contributing from early planning through to
              production, collaborating on solutions that are practical,
              scalable, and user-friendly. His technical foundation includes
              cloud platforms like AWS and GCP, and modern web technologies such
              as TypeScript, React, Node.js, and Next.js.
            </p>
            <p>
              Most recently, Mikko has been heavily focused on AI and generative
              AI development. He leverages AI-assisted development tools
              including Cursor, Claude Code, GitHub Copilot, and Codex, works
              extensively with LLMs from OpenAI, Google, and Anthropic, and
              utilizes AI platforms such as ChatGPT, Gemini, Vertex AI, v0, and
              Lovable to deliver modern, AI-enhanced solutions.
            </p>
            <p>
              Mikko is dedicated to continuous learning and enjoys solving
              real-world problems by building thoughtful and robust software.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> languages
          </h2>
          <div className="border border-border p-6">
            <ul className="space-y-2 text-sm">
              <li className="before:mr-2 before:text-accent before:content-['→']">
                Finnish - Native
              </li>
              <li className="before:mr-2 before:text-accent before:content-['→']">
                English - Advanced
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> experience
          </h2>
          <div className="space-y-6">
            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold text-lg">
                    Senior Software Developer
                  </h3>
                  <p className="text-muted-foreground">
                    Large Finnish industrial company
                  </p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Mar 2025 - Present
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Developing solutions to optimize factory operations through
                  data-driven insights and predictive analytics.
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Member of the AI Ambassador program, driving AI adoption and
                  evangelizing AI best practices across the organization.
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Part of the code competence team, developing and promoting
                  improved engineering practices and ways of working.
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold text-lg">Lead Developer</h3>
                  <p className="text-muted-foreground">Inderes</p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Sep 2023 - Mar 2025
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Led the IR Software team delivering IR Suite, a B2B investor
                  relations platform used by listed companies to manage
                  regulatory announcements.
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Owned end-to-end delivery of high-SLA services with secure,
                  reliable announcement distribution.
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold text-lg">
                    Senior Software Developer
                  </h3>
                  <p className="text-muted-foreground">Inderes</p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Feb 2022 - Sep 2023
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Architected and implemented the new Videosync virtual event
                  platform used by 400+ Nordic listed companies.
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold text-lg">
                    Senior Software Developer
                  </h3>
                  <p className="text-muted-foreground">Futurice (Kone)</p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Nov 2021 - Feb 2022
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Worked on infrastructure and backend for an IoT data platform
                  aggregating elevator monitoring data.
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold text-lg">
                    Senior Software Developer
                  </h3>
                  <p className="text-muted-foreground">Futurice (Kone)</p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Aug 2020 - Oct 2021
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Collaborated in a multi-vendor team to architect and build a
                  multi-region B2B API portal for managing access to elevator
                  and building assets.
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Delivered APIs enabling elevator data retrieval, elevator
                  control, and robot integrations.
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold text-lg">
                    Senior Software Developer
                  </h3>
                  <p className="text-muted-foreground">Futurice (VR)</p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Feb 2019 - Aug 2020
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Maintained and developed ticket vending machines, spanning
                  embedded touchscreen systems, payment terminals, and ticket
                  printing.
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Contributed to the rewrite of the train conductor Android
                  application and supporting backend services.
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold text-lg">Software Developer</h3>
                  <p className="text-muted-foreground">
                    Black Woodpecker Software
                  </p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Nov 2017 - Dec 2019
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Early team member shipping multiple greenfield products from
                  concept to production before the company was acquired by
                  Euronext.
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Ticker - Insider list management software automating
                  MAR-compliant workflows.
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Timber - Mobile quality manual empowering sawmill companies to
                  manage and share product imagery.
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Sidonnaisuusrekisteri - Digital liability register helping
                  Finnish councils meet Municipality Act requirements.
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold text-lg">Software Developer</h3>
                  <p className="text-muted-foreground">Vilkas Group</p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Aug 2015 - Nov 2017
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Developed and maintained an e-commerce platform for Nordic
                  customers, integrating Verifone online payment terminal
                  services.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> education
          </h2>
          <div className="space-y-4">
            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-bold">
                    Electronics and Embedded Systems, Information Technology
                  </h3>
                  <p className="text-muted-foreground">
                    Tampere University of Technology
                  </p>
                </div>
                <div className="text-muted-foreground text-sm">
                  Mar 2008 - Mar 2015
                </div>
              </div>
            </article>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> certificates
          </h2>
          <div className="space-y-4">
            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-semibold">
                    AWS Certified Solutions Architect - Associate
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Amazon Web Services Training and Certification
                  </p>
                </div>
                <div className="text-muted-foreground text-xs">
                  Oct 2021 - Oct 2024
                </div>
              </div>
            </article>
            <article className="border border-border p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-semibold">
                    AWS Certified Cloud Practitioner
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Amazon Web Services Training and Certification
                  </p>
                </div>
                <div className="text-muted-foreground text-xs">
                  Oct 2021 - Oct 2024
                </div>
              </div>
            </article>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold text-xl">
            <span className="text-primary">$</span> skills
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <article className="border border-border p-6">
              <h3 className="mb-3 font-semibold">Languages & Core</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  TypeScript
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  JavaScript
                </li>

                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Rust, hobby
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Kotlin
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <h3 className="mb-3 font-semibold">Frontend</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  React
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Next.js
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  React Native
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Tailwind CSS
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <h3 className="mb-3 font-semibold">AI & Generative AI</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  AI-assisted development tools: Cursor, Claude Code, GitHub
                  Copilot, Codex
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  LLMs by OpenAI, Google, and Anthropic
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  AI tools: ChatGPT, Gemini, Vertex AI, v0, Lovable
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Full-stack AI development with Vercel, Convex, Node.js,
                  TypeScript, Next.js and React
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <h3 className="mb-3 font-semibold">Backend & Data</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Node.js
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  PostgreSQL
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  SQL
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  REST APIs
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <h3 className="mb-3 font-semibold">Cloud & Infrastructure</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  AWS
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  AWS CDK
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Google Cloud Platform
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Serverless Computing
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Docker
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Kubernetes
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Terraform
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <h3 className="mb-3 font-semibold">DevOps & Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  CI/CD
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  GitHub Actions
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Git
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Linux
                </li>
              </ul>
            </article>

            <article className="border border-border p-6">
              <h3 className="mb-3 font-semibold">Professional Practices</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Software Architecture
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  API Design & Management
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Project Management
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  IoT Systems
                </li>
                <li className="before:mr-2 before:text-accent before:content-['→']">
                  Testing & Quality Assurance
                </li>
              </ul>
            </article>
          </div>
        </section>

        <footer className="border-border border-t pt-8 text-muted-foreground text-xs">
          <p>Last updated January 2025</p>
        </footer>
      </div>
    </div>
  );
}
