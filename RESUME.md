# JASON KNOWLES

Webster, MA · (774) 321-0974 · jknowlesdev@gmail.com · jknowlesdev.com · github.com/jknowlesdev

## SENIOR SOFTWARE ENGINEER
JavaScript · TypeScript · React · Angular · Next.js · Node.js · Java / Spring Boot · SQL

- Senior software engineer building front-end architecture at scale, currently exploring full-stack opportunities for deeper end-to-end experience.
- Delivered paradigm-level architecture: multi-tenant satellite configuration system, cross-role
  reporting subsystem, and gradebook foundation for a K-12 platform serving 1.1B+ answered
  student questions and 37.8M+ learning hours
- Particular strength in refactoring legacy applications into modernized, scalable architectures
  — multiple migrations from AngularJS, jQuery, and Kendo UI stacks into current React / MobX
  and Angular codebases
- Framework-flexible (React, Angular) with a Spring / Java backend background; extensive
  JavaScript foundations extend naturally to Node.js, NestJS, and Next.js for full-stack work
- Active in team code review — flags risks early, reinforces conventions, and recognizes strong
  work from teammates
- Embraces AI as an efficiency tool rather than an autonomous decision-maker

## EXPERIENCE

### EvoText (Content2Classroom) — Carlisle, MA · Remote
**Software Engineer** · June 2021 – Present

Content2Classroom is EvoText's multi-tenant K-12 SaaS platform (2025 SIIA CODIE Award winner),
supporting millions of users and billions of content transactions per month.

- **Pivotal in shaping the multi-tenant SaaS platform from the ground up.** Began contributing in
  August 2020 when the codebase was largely a shell; became a central contributor as it scaled to
  over 20 white-label "satellites", serving district admins, school admins, teachers, and students.
  Designed and own the current *dynamic satellite* paradigm — replaced the per-satellite-fork
  model with a unified repo where new tenants are provisioned via JSON + CSS themes (no
  per-customer code, no fork), cutting onboarding from a code-and-deploy effort to a configuration
  exercise. Set the team-wide discipline (canonical defaults, no one-off flags, cross-repo
  migration audits) that keeps the configuration surface coherent as the portfolio grows.

- **Designed the front-end of the course and standards reporting subsystem.** Built a report
  structure flowing top-down from district admin through school admin, teacher, and student —
  shared logic, role-specific views, no per-role duplication.

- **Built the foundation of the gradebook architecture.** Designed for scalability from the outset;
  those foundational primitives still shape how gradebook features are added and extended.

- **Modernized the legacy lesson-delivery application into its React replacement.** Ported and
  rewrote the full lesson player and question-type library from jQuery / HTML / CSS / Kendo UI
  into a modern React / MobX codebase — preserved delivered behavior while replacing the
  underlying architecture, unlocking the accessibility, testability, and extensibility
  improvements the legacy stack blocked.

- **Actively shapes team code culture.** Reviews incoming commits to maintain shared context,
  flags problematic patterns early, reinforces linting and code-convention standards (DRY, YAGNI,
  newspaper-style organization), and consistently recognizes strong work from teammates.

- **Accessibility as a default requirement**, not a retrofit. Every new component built to pass
  ARIA / WCAG audits at the design stage — visible focus indicators, semantic ARIA patterns,
  screen-reader-friendly hidden text, and correct handling of dynamic show/hide state.

- **Backend integration with the Java content management service** (Spring Boot, Liquibase, REST)
  — primarily consumed APIs rather than authored backend features in this role.

### Aveniros — Woburn, MA
**Software Engineer** · December 2018 – June 2021

Aveniros was a K-12 engineering startup that built its own Angular-based LMS, and maintained a
longstanding partnership with EvoText (current employer).

- Contributed to EvoText's Content2Classroom platform starting August 2020; promoted to direct
  EvoText employment in June 2021.
- Primary frontend engineer for Egypt's national digital assessment platform (via Pearson
  partnership with the Egyptian Ministry of Education). Built the tablet-based portal (bilingual
  English/Arabic, full RTL support) for students to complete digital assessments across many
  subjects. Platform reached hundreds of thousands of concurrent students.
- Developed and maintained the Angular-based LMS, and delivered several standalone UI apps end
  to end.
- Modernized multiple legacy applications, migrating from AngularJS and jQuery into modern
  Angular and React (Content2Classroom) codebases.
- Backend contributions in Spring / Spring Boot, Tomcat, SQL, and Firebase.

## EDUCATION

**Worcester State University** — Worcester, MA
Bachelor of Science in Computer Science, concentration in Software Development · 2015 – 2018
Dean's List, 2015 – 2018.

*Capstone / internship: Ampath Informatics — Eldoret, Kenya · Remote, Jan – Sep 2018.* Led a team of
classmates to build a proof-of-concept, offline-first extension for OpenMRS (Angular + PouchDB /
IndexedDB frontend, integrating with OpenMRS's Spring Boot + SQL backend) demonstrating that
medical records could be accessed in the field without continuous online connectivity. My first
professional contribution to a live open-source codebase; formative real-world engineering
preparation covering REST APIs, MVC architecture, design patterns, and full agile process (sprint
tracking, retrospective blogs).

## PERSONAL PROJECTS

**Interactive Portfolio & Personal Site — jknowlesdev.com**
github.com/jknowlesdev/portfolio

Modern full-stack portfolio built with Next.js on Vercel. Designed as a scalable demo gallery
where each interactive demo showcases specific engineering patterns (scalability, DRY,
accessibility, multi-tenant configuration). Adding a new demo is a single-file drop — the
architecture itself demonstrates the principles.
- Frontend: Next.js (App Router, Turbopack), TypeScript, Tailwind CSS
- Backend / Data: PostgreSQL (Neon), Drizzle ORM
- i18n: next-intl
- Deployment: Vercel

**Learning Management System (LMS) — Proof of Concept**
github.com/jknowlesdev/[repo]

Independent full-stack project exploring modern LMS architecture with the technologies I would
choose for a greenfield build.
- Frontend: Angular
- Backend: Dockerized NestJS + MongoDB

## TECHNICAL SKILLS

### Current Stack (Daily, Professional at EvoText)
- **Languages:** JavaScript, HTML, CSS / LESS / SCSS
- **Frontend:** React, MobX, Semantic UI React, react-i18next
- **Backend interaction:** Java / Spring Boot APIs, Liquibase, REST (primarily API consumption)
- **Tools:** Git (Bitbucket), VSCode, Eclipse / STS4, ESLint

### Additional Experience (Prior Roles and Personal Projects)
- **Languages:** TypeScript, SQL
- **Frontend:** Angular, Next.js
- **Backend:** Node.js, NestJS, Express, Spring / Spring Boot, Tomcat, REST APIs, Firebase (BaaS)
- **Databases:** SQL (MySQL, PostgreSQL), NoSQL (MongoDB, Firestore)
- **Build / Infra:** Vite, Turbopack, Docker, AWS, Vercel
- **ORMs:** Drizzle

### Legacy Systems (maintained and migrated to modern stacks)
AngularJS · jQuery · Kendo UI · Rollup · CRACO · Webpack

*Adaptable and quick to ramp on new frameworks, libraries, and tools — grounded in strong
JavaScript / TypeScript foundations and full-stack architectural fluency.*

### Practices
- Legacy system modernization and scalable refactoring
- Multi-tenant SaaS architecture
- Config-driven / feature-flag-driven development
- Accessibility (WCAG / ARIA)
- Collaborative code quality
- Mentorship
