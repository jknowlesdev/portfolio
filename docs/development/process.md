# Development Process

How this portfolio is developed with AI-augmented engineering: the process, the guardrails, and how they are checked.

This portfolio is built with AI-augmented engineering, not vibe coding. Claude Code with Opus 5.5 is my main agent, and GitHub Copilot handles inline completions, but my process is not tied to one tool or model. The agent drafts inside a plan I set, and I review and refine each change until I can stand behind it as my own work.

## How the work runs

1. **Plan.** The agent maps out the work for my approval before it writes code. I approve or redirect it first.
2. **Conventions.** I direct the agent through a layered framework of Markdown conventions I define, from general rules down to project-specific patterns. In this repo, [AGENTS.md](../../AGENTS.md) is the project layer; it grows into a full guide in Phase 5.2 (see the [roadmap](../roadmap.md)). When I correct the agent, the correction becomes a new rule.
3. **Build.** The agent handles repetitive scaffolding, so I focus on architecture and trade-off decisions.
4. **Review.** I review AI output for correctness and consistency, and screen for hallucinations. A separate agent in a fresh context can check work it did not write, and my own review comes after it.
5. **Own.** Nothing is committed without my approval, and every push is mine.

Accessibility and privacy are part of the plan from the start, not a later pass: every feature is built to pass an axe audit, and the site sets no cookies.

## Guardrails

Instructions tell an agent what to do; permissions decide what it can do. The rules that must never break are permissions and hooks, so they hold even if the agent misreads an instruction.

| Layer | Where | What it does |
|---|---|---|
| Project permissions | [.claude/settings.json](../../.claude/settings.json), in this repo | Allows read-only git commands, `pnpm lint`, and `pnpm build` without asking. Denies reading or editing `.env` files and running the database scripts. Blocks file writes outside the project's working folders |
| Personal permissions | My user settings, outside this repo | Sends every commit to an approval prompt. Denies every form of `git push`, history rewrites, package installs, `sudo`, and git commands that discard work |
| Guard hook | My user settings, outside this repo | Checks every shell command before it runs, including disguised forms such as `git -C`, chained commands, and `bash -c`. A blocked command shows a desktop alert, ends the agent's turn, and gives the command to run manually. Covered by 77 table tests |
| Permission mode | The editor | Sessions run in Manual mode: every edit and every command outside the allow list asks first |

Permission rules from every layer are merged, and a deny always wins over an allow, so a project setting can never loosen a personal one.

## How the guardrails are checked

A check passes on an outcome I can see, never on whether I remember a prompt appearing. For example, the push check passes because a hidden push was refused, the alert appeared, and the agent's turn ended, not because nothing seemed to happen.

Checked so far:

- [x] `git push`, `git -C . push`, `git -c x=y push`, and a push hidden inside `bash -c` are all refused
- [x] The project and personal settings both load, confirmed with `/status`
- [x] A blocked command shows the alert and ends the turn
- [ ] A commit in auto mode prompts, and rejecting it leaves no commit. This waits until auto mode is available to test

## Commits

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`type(scope): what changed`). Earlier history uses an older `task:` style; Phase 2 rewrites it, so the full history follows one convention. AI involvement is documented here and in pull request descriptions, not in commit trailers.

Scopes follow how the code is organized. A scope is optional when a change spans several areas.

| Scope | Covers |
|---|---|
| `theme` | The theme system: schema, defaults, loader, provider, and the theme JSON files |
| `widgets` | The home page widgets in `lib/widgets/` |
| `nav` | The site navigation and the theme switcher |
| `layout` | Page layout and spacing |
| `styles` | Global styles and shared CSS |
| `markdown` | Rendered Markdown pages, such as `/readme` |
| `db` | The database schema, migrations, and seed script |
| `claude` | Claude Code's project settings in `.claude/` |

## What comes next

- **Phase 3:** automated tests (Vitest, Playwright, and axe) and a CI gate that agents pass the same way I do
- **Phase 5.2:** a full `AGENTS.md`, path-scoped rules, and a fresh-context reviewer agent

The full plan is in the [roadmap](../roadmap.md).
