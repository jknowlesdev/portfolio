/**
 * next-intl request config.
 *
 * For each request, resolves the active theme id and returns the merged
 * translations that next-intl exposes to Server + Client Components via
 * useTranslations().
 *
 * Translation lookup:
 *   1. Resolve the active theme id (from the `x-theme-id` header)
 *   2. Fetch the theme's translation override from the filesystem
 *   3. Deep-merge overrides on top of defaultThemeTranslations
 *   4. Return merged messages plus a real language locale (e.g. 'en') so
 *      next-intl's built-in date / number / plural formatters keep working
 *
 * Locale is intentionally kept separate from theme id: theme ids are not
 * valid language tags and would break those formatters. Theme id flows
 * through the ThemeProvider chain instead (resolveThemeId → layout →
 * context → hooks).
 */

import { getRequestConfig } from 'next-intl/server';
import deepmerge from 'deepmerge';

import { loadThemeOverride } from '@/lib/theme/server/theme-loader';
import { resolveThemeId } from '@/lib/theme/server/resolve-theme-id';

import { defaultThemeTranslations } from '@/lib/theme/default-theme-translations';

export default getRequestConfig(async () => {
  const themeId = await resolveThemeId();
  const override = await loadThemeOverride(themeId);

  const messages = deepmerge(defaultThemeTranslations, override.translations, {
    arrayMerge: (_dest, src) => src,
  });

  return {
    locale: 'en',
    messages,
    timeZone: 'UTC',
  };
});
