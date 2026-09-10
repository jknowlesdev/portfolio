# jknowlesdev.com

Personal portfolio and interactive demo site for Jason Knowles - a senior software engineer with 8+ years of front-end architecture experience.

Live at **[jknowlesdev.com](https://jknowlesdev.com)**.

## What this portfolio demonstrates

The portfolio itself is the demo. It showcases a multi-tenant SaaS (Software as a Service) pattern: one codebase serving many tenants, each with their own branding, features, and content driven by per-tenant configuration. I was a primary developer and maintainer of a K-12 ed-tech product built on this pattern, serving nearly two dozen client publishers through per-tenant customization. See [my resume](https://jknowlesdev.com/resume) for more details.

### Key principles

- **Config-driven themes.** Each theme is a self-contained JSON, CSS, and translations bundle. Add a new theme by dropping in a new file - no per-theme code, no forks.
- **Flag-driven widgets.** Widgets opt into themes via boolean flags in the theme config. Any theme can enable any widget; every widget is theme-agnostic.
- **Reusable and adaptable.** Each widget is written once and adapts to any theme. Configuration drives customization, visibility, and behavior. This eliminates the need to copy-paste features across clients.
- **Accessible by default.** Every widget is planned and built to pass a traditional accessibility audit as part of initial implementation, rather than requiring emergency retrofits when gaps surface during a later audit.
- **Privacy-first.** No cookies or tracking that requires user consent.

### Current implementation

The portfolio ships four themes (default, newspaper, terminal, custom) built on a shared widget library. Home-page widgets present my identity and career highlights - name, role, tagline, bio, plus a card grid summarizing the engineering principles behind this project. Each widget is theme-agnostic and gated by a boolean flag in the theme's JSON, so themes opt widgets in by setting flags to true. Dedicated `/resume` and `/readme` routes render RESUME.md (career history, experience, and skills) and README.md (this file) directly via react-markdown. Theme resolution is per-request via URL query param: `?theme=X` is intercepted by a proxy, converted to a request header, and utilized to load the matching JSON server-side, which then merges with defaults before rendering.

### Coming soon

- **Config-driven widget order:** per-theme widget ordering via a JSON array, gated by a feature flag so opted-out themes keep the default order.
- **Interactive customization mode:** UI panel to toggle theme widgets on/off at runtime and see the config-driven architecture in action.
- **Auth and admin surface:** login-gated UI for editing theme JSON through a web app, demonstrating the "admin per tenant" pattern the architecture is built for.
- **Data:** PostgreSQL (Neon) and Drizzle ORM - infrastructure ready (schema, migrations, and seed script wired up in `package.json`); utilization and REST communication with the front-end coming soon.
- **REST API:** `/api/themes` and `/api/themes/[id]` endpoints exposing themes as a first-class resource for external consumers.
- **SEO metadata:** Open Graph tags, canonical URLs, robots.txt, sitemap.xml.
- **Multi-language support:** extending each theme's key-value phrasing to support multiple languages, so users can choose their language within any theme.
- **And more:** additional widgets, themes, and features as this portfolio evolves.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack) with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with per-theme CSS custom properties
- **Icons:** lucide-react
- **i18n:** next-intl (each theme has its own key-value phrasing, currently English for all themes)
- **Validation:** Zod (theme schema)
- **Markdown:** react-markdown and remark-gfm (for the /resume and /readme routes)
- **Deployment:** Vercel

## Getting started

Requires Node 20+ and pnpm.

```bash
git clone https://github.com/jknowlesdev/portfolio.git
cd portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3030](http://localhost:3030).

## Repository layout

A quick tour of the main directories. Note: This is an example of the structure and will be added to over time (as the project evolves).

```
app/               Next.js App Router routes (page.tsx, layout.tsx, /resume, /readme, ...)
css/               Colocated component and widget styles
lib/
  components/        Shared UI primitives
  theme/             Theme system (schema, defaults, provider, loader)
  widgets/           Flag-driven portfolio widgets
  urls.ts            Shared URL and route constants
i18n/              next-intl request config
content/           Theme JSON overrides
```

## Contact

- **Website:** [jknowlesdev.com](https://jknowlesdev.com)
- **GitHub:** [github.com/jknowlesdev](https://github.com/jknowlesdev)
- **Email:** [jknowlesdev@gmail.com](mailto:jknowlesdev@gmail.com)
