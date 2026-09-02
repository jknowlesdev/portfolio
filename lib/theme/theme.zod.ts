/**
 * Zod schema for theme JSON files. Validates structure at trust boundaries
 * (JSON file reads, DB response parsing, Route Handler responses).
 * Generates the Theme TypeScript type via z.infer — single source of truth
 * for both runtime validation and compile-time type safety.
 *
 * Structure aligns with Tailwind v4 @theme naming conventions:
 * - styles.colors.X  →  --color-X   →  bg-X / text-X / border-X utilities
 * - styles.fonts.X   →  --font-X    →  font-X utility
 * - styles.text.X    →  --text-X    →  text-X utility
 * - styles.spacing.X →  --spacing-X →  p-X / m-X / gap-X utilities
 */

import { z } from 'zod';

// Reusable atomic schemas — kept simple for v1. Values are all strings
// (CSS values, copy strings) or booleans (flags).
const stringMap = z.record(z.string(), z.string());
const booleanMap = z.record(z.string(), z.boolean());
const translationSection = z.record(z.string(), z.string());

/**
 * Full theme schema — validates the final merged theme (defaults + overrides
 * combined, every field present). Used when passing themes to providers at
 * runtime after the merge has happened.
 */
export const themeSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  description: z.string().optional(),

  styles: z.object({
    colors: stringMap,       // hex, rgba, or any CSS color string
    fonts: stringMap,        // CSS font-family strings
    text: stringMap,         // CSS font-size values (rem, clamp, etc.)
    spacing: stringMap,      // CSS length values
  }),

  translations: z.object({
    Intro: translationSection,
    Sections: translationSection,
    Widgets: translationSection,
    Navigation: translationSection,
    Stats: translationSection,
    Footer: translationSection,
  }),

  flags: z.object({
    sections: booleanMap,
    layout: z.object({
      sectionsOrder: z.array(z.string()),
      showTagline: z.boolean(),
      widgetsDefaultExpanded: z.boolean(),
      showThemeSwitcher: z.boolean(),
      showViewConfig: z.boolean(),
    }),
  }),
});

/**
 * Override schema — validates a theme JSON file containing only the diffs
 * from the baseline defaults. Every field is optional except id + displayName
 * (needed to identify and label the theme in the UI).
 *
 * The seed script parses raw JSON with this schema, then stores the partial
 * as-is in the DB. Merging with defaults happens at request time.
 */
export const themeOverrideSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  description: z.string().optional(),

  styles: z.object({
    colors: stringMap.optional(),
    fonts: stringMap.optional(),
    text: stringMap.optional(),
    spacing: stringMap.optional(),
  }).partial().optional(),

  translations: z.object({
    Intro: translationSection.optional(),
    Sections: translationSection.optional(),
    Widgets: translationSection.optional(),
    Navigation: translationSection.optional(),
    Stats: translationSection.optional(),
    Footer: translationSection.optional(),
  }).partial().optional(),

  flags: z.object({
    sections: booleanMap.optional(),
    layout: z.object({
      sectionsOrder: z.array(z.string()).optional(),
      showTagline: z.boolean().optional(),
      widgetsDefaultExpanded: z.boolean().optional(),
      showThemeSwitcher: z.boolean().optional(),
      showViewConfig: z.boolean().optional(),
    }).partial().optional(),
  }).partial().optional(),
});

// TypeScript types auto-derived from schemas — single source of truth.
export type Theme = z.infer<typeof themeSchema>;
export type ThemeOverride = z.infer<typeof themeOverrideSchema>;

// Named subtype exports — useful for widgets that only need one part.

// Complete shapes (post-merge with defaults):
export type ThemeStyles = Theme['styles'];
export type ThemeTranslations = Theme['translations'];
export type ThemeFlags = Theme['flags'];

// Partial shapes (as stored in DB, before merge with defaults):
export type ThemeStylesOverride = NonNullable<ThemeOverride['styles']>;
export type ThemeTranslationsOverride = NonNullable<ThemeOverride['translations']>;
export type ThemeFlagsOverride = NonNullable<ThemeOverride['flags']>;
