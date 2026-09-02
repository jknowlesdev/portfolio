/**
 * Theme loader — resolves theme override data from the filesystem.
 *
 * Themes live as JSON files in content/custom-themes/theme-{id}.json. The
 * default theme has no JSON file — its baseline values live in code
 * (globals.css for styles, default-*.ts for flags/translations) and are
 * merged with an empty override at request time.
 *
 * Same function surface as a DB-backed source would expose, so callers
 * (layout, i18n config, /api/themes routes) do not need to know where the
 * data lives. If the source ever moves to a DB, only this module changes.
 */

import 'server-only';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { themeOverrideSchema, type ThemeOverride } from '@/lib/theme/theme.zod';

const themesDir = join(process.cwd(), 'content', 'custom-themes');
const filePrefix = 'theme-';
const fileSuffix = '.json';

/**
 * Load a theme's override JSON. Returns empty objects for the default theme
 * (no JSON file — defaults live entirely in code) and for unknown ids.
 */
export async function loadThemeOverride(themeId: string) {
  if (themeId === 'default') {
    return { styles: {}, flags: {}, translations: {} };
  }
  const override = await readThemeFile(themeId);
  return {
    styles: override?.styles ?? {},
    flags: override?.flags ?? {},
    translations: override?.translations ?? {},
  };
}

/**
 * List all themes with minimal metadata — used by the theme switcher UI and
 * the public /api/themes endpoint. Includes 'default' plus every file in
 * content/custom-themes.
 */
export async function listThemes() {
  const files = await readdir(themesDir);
  const overrides = await Promise.all(
    files
      .filter((f) => f.startsWith(filePrefix) && f.endsWith(fileSuffix))
      .map((f) => readThemeFile(f.slice(filePrefix.length, -fileSuffix.length))),
  );
  const custom = overrides
    .filter((o): o is ThemeOverride => o !== null)
    .map((o) => ({ id: o.id, displayName: o.displayName, description: o.description }));
  return [
    { id: 'default', displayName: 'Default', description: undefined },
    ...custom,
  ];
}

/**
 * Fetch the full theme override by id. Used by /api/themes/[id] to return
 * the raw override JSON. Returns null for unknown ids.
 */
export async function getThemeById(id: string): Promise<ThemeOverride | null> {
  if (id === 'default') {
    return { id: 'default', displayName: 'Default' };
  }
  return readThemeFile(id);
}

async function readThemeFile(id: string): Promise<ThemeOverride | null> {
  try {
    const raw = await readFile(join(themesDir, `${filePrefix}${id}${fileSuffix}`), 'utf-8');
    return themeOverrideSchema.parse(JSON.parse(raw));
  } catch (error) {
    if (isFileNotFound(error)) {
      return null;
    }
    throw error;
  }
}

function isFileNotFound(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}
