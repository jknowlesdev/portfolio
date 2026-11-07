# Roadmap

What is done, what is in progress, and what comes next, with each step checked off as it lands. The [Concept](concept.md) describes the finished design these phases build.

**Structure:** development of this portfolio runs in phases, in order. Each phase is tagged as a release in this repo once all of its steps are checked off, numbered by phase: Phase 2 tagged the launch as `v0.1.0` and the site before this roadmap as `v0.2.0`, and each later phase ships as the next version (Phase 3 as `v0.3.0`). A number such as 4.1 is part 1 of Phase 4. Each part is completed before the next begins, so development can pause after any part without leaving the site half-done.

## Done

### Launch (2026-09-02)

- [x] A Next.js 16 App Router site, deployed on Vercel
- [x] Four themes as JSON files, chosen per request with `?theme=`
- [x] Eight widgets, each turned on per theme by a flag
- [x] Accessible by default, with no cookies or tracking

How it works today: [Architecture Overview](architecture/overview.md).

## Now

### Phase 1: Guardrails for AI-augmented work

- [x] Project permission rules in [.claude/settings.json](../.claude/settings.json)
- [x] Personal rules: every commit needs approval; pushes, history rewrites, and installs are denied
- [x] A guard hook that blocks risky commands, disguised forms included, then alerts and halts the agent
- [x] Every push form refused, checked live
- [x] Settings load confirmed with `/status`
- [ ] A commit in auto mode prompts, and a reject leaves no commit (waits until auto mode is available)
- [ ] A Neon `dev` branch for local development

Details: [Development Process](development/process.md).

### Phase 2: Clean history

- [x] Remove the resume page and its links
- [x] Rewrite the history to Conventional Commits, with a dry run in a fresh clone that confirms every file and date matches
- [x] Tag the launch and the site before this roadmap as the first releases, with GitHub Releases
- [ ] Protect `main` with a ruleset, and enforce the commit format with a hook
- [ ] Add a `LICENSE` and `.env.example`

## Next

### Phase 3: Tests and CI

- [ ] `typecheck`, `test`, `test:e2e`, and `verify` scripts
- [ ] Unit tests with Vitest
- [ ] End-to-end tests with Playwright, with axe accessibility checks on every route
- [ ] A test that confirms the site sets no cookies
- [ ] CI on every pull request, with required status checks on `main`
- [ ] A pull request template, and Dependabot for dependency updates
- [ ] A documented journal: tagged entries in `docs/journal/`, a journal page, and an RSS feed
- [ ] Tag the Phase 3 release

### Phase 4: One config schema

#### 4.1 Server-rendered tokens

- [ ] Theme tokens in the first HTML response
- [ ] The Loader removed, since styles no longer wait for the browser

#### 4.2 The schema

- [ ] One validated config schema, with a compile step from a few brand inputs to the full set of tokens
- [ ] Themes stop being separate site modes; Terminal and Newspaper return as presets in 6.3
- [ ] Defaults as data, and unused flags removed
- [ ] Update the site's own copy (the intro bio, the Showcase cards, and the page description) to the new direction
- [ ] Tag the Phase 4 release

### Phase 5: SEO, docs, and AI setup

#### 5.1 SEO

- [ ] Unique titles and descriptions, and one canonical URL per page
- [ ] A sitemap, `robots`, and structured data
- [ ] Open Graph images
- [ ] Search Console, verified by DNS, with no script and no cookies

#### 5.2 Docs and AI setup

- [ ] A full `AGENTS.md` and path-scoped rules for agents
- [ ] A copy check that keeps docs consistent
- [ ] A fresh-context reviewer agent
- [ ] The docs tree with a Start here guide
- [ ] Render each doc on the site with react-markdown, so the `/docs` page links to site pages instead of GitHub
- [ ] Tag the Phase 5 release

## Later

### Phase 6: Customize this page and Dev view

Visitors operate the config the docs describe, and watch the checks run live.

#### 6.1 Customize panel

- [ ] Show, hide, and move sections, with a JSON view kept in sync
- [ ] Validation, undo, reset, and a share link

#### 6.2 Slots and placement

- [ ] A section registry with allowed slots, and placement controls

#### 6.3 Look and presets

- [ ] Brand color swatches, each pre-checked for contrast, and a font choice
- [ ] The Terminal and Newspaper presets

#### 6.4 Command palette, Ticker, and Journal

- [ ] A command palette (Ctrl+K) that doubles as docs search
- [ ] A ticker of real build facts, and the latest journal entries

#### 6.5 Dev view

- [ ] A drawer with live checks, axe results, Core Web Vitals, renders, and the config diff
- [ ] Tag the Phase 6 release

## Direction

Longer-term direction, not commitments:

- **Full stack, as features need it:** Next.js route handlers first, and the database once share links or an AI feature need storage
- **A separate monorepo for multi-framework work:** Angular alongside React, NestJS services, event-driven communication between services, and micro-frontends. This portfolio stays a React app; the monorepo is where the frameworks meet
