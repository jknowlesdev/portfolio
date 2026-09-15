# JASON KNOWLES

Versatile Senior Software Engineer specializing in scalable frontend architecture (including converting legacy stacks into modernized codebases). Exploring full-stack opportunities to further expand across the JavaScript / TypeScript ecosystem.

Location: Worcester, MA area (open to remote) ·
Email: jknowlesdev@gmail.com ·
Phone: (774) 321-0974 ·
GitHub: github.com/jknowlesdev ·
Portfolio: jknowlesdev.com

## EXPERIENCE

**EvoText (Content2Classroom / C2C)**, Carlisle, MA (Remote) | *Software Engineer*  
JUNE 2021 - PRESENT

Multi-tenant EdTech SaaS platform driven by a React / JavaScript / MobX frontend and a Spring Boot / Java / Hibernate backend. Nearly two dozen publisher clients digitize their educational content on the platform and distribute it to K-12 districts and schools, reaching millions of users.

- Shaped and evolved C2C's configuration-driven multi-tenant SaaS pattern, built on per-publisher themes and flag-based features. Each theme defines CSS variables (branding), i18n translations (text), and feature-behavior flags.
- Consolidated per-tenant standalone repositories into a single dynamic-tenant codebase, cutting new themed-tenant delivery from 5-10 days to 1-2 days, freeing the team to focus on new features rather than continuous per-tenant maintenance.
- Modernized the legacy lesson-delivery player from jQuery / Kendo UI into a modern React / MobX codebase, supporting better accessibility, modularity, and maintainability.
- Accessibility-first: every new component planned and built to pass WCAG 2.2 AA audits at implementation, saving hours of post-audit remediation.

---

**Aveniros**, Woburn, MA | *Software Engineer*  
DECEMBER 2018 - JUNE 2021

K-12 engineering startup and partner of major EdTech vendors such as Pearson, Learnosity, and EvoText. Delivered EdTech software for both domestic and international clients; modernized legacy AngularJS and jQuery codebases into modern Angular.

- Served as primary frontend engineer across Aveniros's major projects, spanning both domestic and international EdTech clients.
- Built a Dockerized bilingual English and Arabic tablet portal frontend for Egypt's national exam reform (a Pearson contract with the Egyptian Ministry of Education), with RTL layout, implemented using idiomatic Angular (TypeScript, Material, RxJS, JSON-driven i18n pipe), supporting hundreds of thousands of concurrent students.
- Modernized several legacy AngularJS and jQuery codebases into modern Angular with TypeScript; integrated with Spring Boot backend via REST APIs.
- Selected for a challenging embedded contract at EvoText in August 2020, joining a team of senior engineers to expand the multi-tenant SaaS platform known today as C2C; recruited directly as the platform scaled.

## EDUCATION

**Worcester State University**, Worcester, MA | *Bachelor of Science in Computer Science*  
2015 - 2018

Concentration in Software Development. Dean's List 2015 to 2018.

---

**Ampath Informatics** (Remote) | *Software Developer Intern (Computer Science Capstone)*  
JANUARY 2018 - SEPTEMBER 2018

- Led a team of classmates to build a proof-of-concept offline-first extension for Ampath's medical record system (powered by OpenMRS), proving medical records accessible in the field without continuous connectivity. Built with Angular 2+, RxJS, and PouchDB, with client-side CryptoJS encryption for HIPAA compliance.
- First professional contribution to a live open-source codebase; hands-on exposure to component-based architecture, REST APIs, state management, separation of concerns, and agile process.

## PERSONAL PROJECT

**jknowlesdev.com** | *Interactive Portfolio & Demo*

This portfolio implements Content2Classroom's multi-tenant SaaS pattern on a modern stack, proving cross-framework portability while staying current with the latest technologies and adhering to WCAG 2.2 AA best practices.

- **Configuration-driven themes:** each theme is a JSON file specifying CSS variables for branding, next-intl for text, and flag-based widgets; themes are data, not code.
- **Next.js 16 (App Router and React 19):** middleware resolves themes per request, server components load and merge JSON configurations, React 19 client components drive interactivity. Privacy-first with no cookies or third-party tracking.
- **Tailwind CSS v4:** primary styling framework with per-theme CSS variable overrides.
- **TypeScript and Zod:** single source of truth; Zod schemas derive TypeScript types and enforce validation at trust boundaries.
- **next-intl:** per-theme translation bundles, ready for multi-language expansion.
- **PostgreSQL with Neon and Drizzle ORM:** backend scaffolded (schema, migrations, seed script wired); ready to populate. Live on Vercel.

## TECHNOLOGIES

- **Languages** · JavaScript, TypeScript, Java
- **Frontend** · React, MobX, Semantic UI React, Angular, Angular Material, RxJS, Next.js
- **Backend** · Node.js, NestJS, Spring Boot, Tomcat
- **Styling** · CSS, SCSS, LESS, Tailwind CSS
- **Data** · PostgreSQL, Neon, SQL, MongoDB, Drizzle ORM, Hibernate, Liquibase, Firebase, PouchDB
- **Validation** · Zod
- **i18n** · next-intl
- **Build** · Vite, Turbopack, Webpack, Rollup
- **Deployment** · Docker, AWS, Vercel
- **Source Control** · Git, Bitbucket, GitHub
- **IDEs** · VS Code, Eclipse / Spring Tool Suite
- **Legacy** · AngularJS, jQuery, Kendo UI, CRACO
