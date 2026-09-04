/**
 * Theme loader — resolves theme override data from the filesystem.
 *
 * Themes live as JSON files in content/custom-themes/theme-{id}.json,
 * including the default theme (which carries empty override objects but
 * still supplies its identifier + display name + favicon like any other).
 *
 * Same function surface as a DB-backed source would expose, so callers
 * (layout, i18n config, /api/themes routes) do not need to know where the
 * data lives. If the source ever moves to a DB, only this module changes.
 *
 * Results are cached in module scope for the lifetime of the server process.
 * Themes are file-based and only change on deploy, so cache-forever is safe.
 */

import 'server-only';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { themeOverrideSchema, type ThemeMetadata, type ThemeOverride } from '@/lib/theme/theme.zod';

const themesDir = join(process.cwd(), 'content', 'custom-themes');
const filePrefix = 'theme-';
const fileSuffix = '.json';

type LoadedOverride = {
  styles: ThemeOverride['styles'];
  flags: ThemeOverride['flags'];
  translations: ThemeOverride['translations'];
  favicon: ThemeOverride['favicon'];
  metadata: { fromCached: boolean };
};

let cachedThemesList: ThemeMetadata[] | null = null;
const cachedOverrides = new Map<string, LoadedOverride>();

/**
 * Load a theme's override JSON. Falls back to the default theme's JSON if
 * the requested id is unknown, so callers always receive a coherent shape
 * (including a favicon) even when the URL carries a bad theme id.
 */
export async function loadThemeOverride(themeId: string): Promise<LoadedOverride> {
  // Cache in all envs. Uncomment below to skip cache in dev (reflects JSON edits without pnpm dev restart).
  // if (process.env.NODE_ENV !== 'production') cachedOverrides.delete(themeId);
  const cached = cachedOverrides.get(themeId);
  if (cached) {
    return { ...cached, metadata: { fromCached: true } };
  }

  const override = (await readThemeFile(themeId)) ?? (await readThemeFile('default'));
  const result: LoadedOverride = {
    styles: override?.styles ?? {},
    flags: override?.flags ?? {},
    translations: override?.translations ?? {},
    favicon: override?.favicon,
    metadata: { fromCached: false },
  };
  cachedOverrides.set(themeId, result);
  return result;
}

/**
 * List all themes with minimal metadata — used by the theme switcher UI and
 * the public /api/themes endpoint. Sorted by each theme's `order` field
 * (lower first); ties broken alphabetically by displayName.
 */
export async function listThemes(): Promise<ThemeMetadata[]> {
  // Cache in all envs. Uncomment below to skip cache in dev (reflects JSON edits without pnpm dev restart).
  // if (process.env.NODE_ENV !== 'production') cachedThemesList = null;
  if (cachedThemesList) {
    return cachedThemesList;
  }

  const files = await readdir(themesDir);
  const overrides = await Promise.all(
    files
      .filter((f) => f.startsWith(filePrefix) && f.endsWith(fileSuffix))
      .map((f) => readThemeFile(f.slice(filePrefix.length, -fileSuffix.length))),
  );
  const metadata: ThemeMetadata[] = overrides
    .filter((o): o is ThemeOverride => o !== null)
    .map((o) => ({
      id: o.id,
      displayName: o.displayName,
      description: o.description,
      favicon: o.favicon,
      order: o.order,
    }));
  metadata.sort((a, b) => {
    const aOrder = a.order ?? Infinity;
    const bOrder = b.order ?? Infinity;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.displayName.localeCompare(b.displayName);
  });

  cachedThemesList = metadata;
  return metadata;
}

/**
 * Fetch the full theme override by id. Used by /api/themes/[id] to return
 * the raw override JSON. Returns null for unknown ids.
 */
export async function getThemeById(id: string): Promise<ThemeOverride | null> {
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
