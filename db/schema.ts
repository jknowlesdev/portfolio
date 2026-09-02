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
 * history — for early dev only - do not use once production is stable).
 */

import {
  bigserial,
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import type {
  ThemeStylesOverride,
  ThemeTranslationsOverride,
  ThemeFlagsOverride,
} from '../lib/theme/theme.zod';

// Themes: config-driven multi-tenant theme system.
// Source of truth is themes/*.json in git; seed script syncs rows on demand.
// JSONB columns hold PARTIAL overrides (defaults live in code and are merged at request time).
export const themes = pgTable('themes', {
  id: text('id').primaryKey(),
  displayName: text('display_name').notNull(),
  description: text('description'),
  styles: jsonb('styles').$type<ThemeStylesOverride>().notNull(),
  translations: jsonb('translations').$type<ThemeTranslationsOverride>().notNull(),
  flags: jsonb('flags').$type<ThemeFlagsOverride>().notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Event log: one row per theme view.
export const themeViews = pgTable(
  'theme_views',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    themeId: text('theme_id')
      .notNull()
      .references(() => themes.id),
    viewedAt: timestamp('viewed_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    themeViewedIdx: index('idx_theme_views_theme_viewed').on(table.themeId, table.viewedAt),
  }),
);

// Event log: one row per resume download.
export const downloads = pgTable(
  'downloads',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    themeId: text('theme_id')
      .notNull()
      .references(() => themes.id),
    format: text('format').notNull(),
    downloadedAt: timestamp('downloaded_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    themeFormatDownloadedIdx: index('idx_downloads_theme_format_downloaded').on(
      table.themeId,
      table.format,
      table.downloadedAt,
    ),
  }),
);

// Event log: one row per visit (page load).
export const visits = pgTable(
  'visits',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    themeId: text('theme_id'),
    visitedAt: timestamp('visited_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    visitedIdx: index('idx_visits_visited').on(table.visitedAt),
  }),
);
