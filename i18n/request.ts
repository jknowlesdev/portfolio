/**
 * next-intl request config.
 *
 * For each request, determines the active theme id and returns the translations
 * that next-intl exposes to Server + Client Components via useTranslations().
 *
 * Translation lookup:
 *   1. Fetch the theme row from DB (contains partial translation overrides)
 *   2. Deep-merge overrides on top of defaultTranslations
 *   3. Return the merged messages to next-intl
 *
 * Theme selection: reads `?theme=X` from the URL search params. Unknown or
 * missing theme id falls back to defaults (no DB row needed).
 */

import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import deepmerge from 'deepmerge';
import { db } from '@/lib/db';
import { themes } from '@/db/schema';
import { defaultTranslations } from '@/lib/theme/default-translations';

export default getRequestConfig(async () => {
  const themeId = await resolveThemeId();
  const overrides = await loadTranslationsOverride(themeId);

  const messages = deepmerge(defaultTranslations, overrides, {
    arrayMerge: (_dest, src) => src,
  });

  return {
    locale: themeId,
    messages,
  };
});

async function resolveThemeId(): Promise<string> {
  const headerList = await headers();
  const url = headerList.get('x-url') ?? headerList.get('referer') ?? '';
  const match = url.match(/[?&]theme=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : 'default';
}

async function loadTranslationsOverride(themeId: string) {
  if (themeId === 'default') {
    return {};
  }
  const [row] = await db.select().from(themes).where(eq(themes.id, themeId));
  return row?.translations ?? {};
}
