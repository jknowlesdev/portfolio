# Jason Knowles

Senior software engineer specializing in frontend architecture, branching into full-stack ownership. This repo is the source of **[jknowlesdev.com](https://jknowlesdev.com)** and its documentation.

## Contents

- [About Me](#about-me)
  - [Highlights](#highlights)
  - [Engineering Approach](#engineering-approach)
- [About This Portfolio](#about-this-portfolio)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Getting Started](#getting-started)
- [Contact](#contact)

## About Me

Software engineer with nearly 8 years of experience, specializing in React frontend architecture, configurable multi-tenant SaaS, AI-augmented engineering, and accessibility-first UI. Framework-flexible across the JavaScript and TypeScript ecosystem; deep frontend expertise, branching into full-stack ownership.

### Highlights

- Shaped and evolved the React architecture of a multi-tenant K-12 platform for 20+ EdTech publishers
- Consolidated per-tenant repositories into a shared multi-tenant codebase, reducing custom theme delivery from 10 days to 2
- Migrated 20+ interactive question types from jQuery to React, rebuilding each to be modular and accessible
- Engineered the frontend of a bilingual English and Arabic tablet exam portal in Angular and RxJS, supporting hundreds of thousands of concurrent students

### Engineering Approach

- **AI-augmented engineering, not vibe coding.** I direct AI agents daily through a layered framework of Markdown conventions I define, from general rules down to project-specific patterns. The agent maps out the work for my approval before it writes code, and I review and refine each change until I can stand behind it as my own work.
- **Accessibility at implementation.** I build every new feature to WCAG 2.2 AA at implementation, not as a retrofit, and check it with NVDA, VoiceOver, and Axe DevTools.
- **Guardrails that are enforced, not just written.** In this repo, permission rules and a guard hook stop the agent from committing without my approval, pushing, rewriting history, or reading secrets.

The details are in the [Development Process](https://github.com/jknowlesdev/portfolio/blob/main/docs/development/process.md).

## About This Portfolio

**Today:** a configuration-driven Next.js site. Each theme is a JSON file that sets the colors, fonts, wording, and which widgets appear, with no per-theme code. Four themes and eight widgets show the pattern.

**The concept:** a site that documents, tests, and demonstrates itself. The docs become the main content, a Customize panel lets visitors operate the configuration the docs describe, and a Dev view shows the checks running live. The full design is in the [Concept](https://github.com/jknowlesdev/portfolio/blob/main/docs/concept.md).

## Documentation

- [Architecture Overview](https://github.com/jknowlesdev/portfolio/blob/main/docs/architecture/overview.md) - the request flow from URL to page, themes, widgets, styling, routes, and the project structure
- [Development Process](https://github.com/jknowlesdev/portfolio/blob/main/docs/development/process.md) - how the work runs, the guardrails, and how they are checked

**Tech stack:** Next.js 16 (App Router) with React 19, TypeScript, Tailwind CSS v4, next-intl, Zod, and react-markdown, deployed on Vercel. Neon PostgreSQL with Drizzle ORM is set up for features that will need it.

## Roadmap

The [Roadmap](https://github.com/jknowlesdev/portfolio/blob/main/docs/roadmap.md) lists every phase with a checklist. In short:

- **Next:** a clean Conventional Commits history; automated tests and CI with Vitest, Playwright, and axe; a documented journal with an RSS feed; one validated configuration schema; SEO; and a full docs guide
- **Later:** a Customize panel and a Dev view for visitors
- **Direction:** full stack as features need it, and a separate monorepo for multi-framework work, with Angular alongside React, NestJS services, event-driven communication, and micro-frontends

## Getting Started

Requires Node 24 (pinned in `.nvmrc`) and pnpm.

```bash
git clone https://github.com/jknowlesdev/portfolio.git
cd portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3030](http://localhost:3030).

## Contact

- **Website:** [jknowlesdev.com](https://jknowlesdev.com)
- **GitHub:** [github.com/jknowlesdev](https://github.com/jknowlesdev)
- **Email:** [jknowlesdev@gmail.com](mailto:jknowlesdev@gmail.com)
