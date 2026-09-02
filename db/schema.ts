/**
 * Drizzle schema — TypeScript source of truth for the database.
 *
 * Column names use snake_case in DB (idiomatic SQL) but camelCase in TS
 * (idiomatic JS). Drizzle handles the mapping automatically.
 *
 * Migration flow:
 *   1. Edit this file
 *   2. `pnpm db:generate` → produces SQL migration in drizzle/ folder
 *   3. `pnpm db:migrate`  → applies pending migrations to the DB
 *
 * For rapid iteration during early development, `pnpm db:push` skips
 * migration files and pushes the schema directly (bypasses migration
 * history — for early dev only, do not use once production is stable).
 *
 * `demo_table` is a live scaffold that demonstrates the end-to-end DB
 * interaction (schema → push → seed → query) with real code that actually
 * runs. Rename/adapt when a real DB-backed feature (e.g., dev log entries)
 * lands.
 */

import { bigserial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const demoTable = pgTable('demo_table', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  label: text('label').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
