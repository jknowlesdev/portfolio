import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import deepmerge from 'deepmerge';

import { listThemes, loadThemeOverride } from '@/lib/theme/server/theme-loader';
import { resolveThemeId } from '@/lib/theme/server/resolve-theme-id';

import { allFontVariables } from '@/lib/fonts';
import { AppProviders } from '@/lib/providers';
import { ThemeSwitcher } from '@/lib/components/ThemeSwitcher';
import { defaultThemeFlags } from '@/lib/theme/default-theme-flags';
import type { ThemeFlags } from '@/lib/theme/theme.zod';

import '@/css/globals.css';

/**
 * Per-request metadata. Reads the active theme id and its override to pick
 * the right favicon emoji, rendered inline as an SVG data URL so no separate
 * HTTP request is needed for the icon.
 */
export async function generateMetadata(): Promise<Metadata> {
  const themeId = await resolveThemeId();
  const override = await loadThemeOverride(themeId);

  return {
    title: 'Jason Knowles | Senior Software Engineer',
    description:
      'Senior software engineer building front-end architecture at scale, currently exploring full-stack opportunities for deeper end-to-end experience.',
    icons: {
      icon: emojiToFaviconDataUrl(override.favicon ?? ''),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const themeId = await resolveThemeId();
  const override = await loadThemeOverride(themeId);
  const messages = await getMessages();
  const themes = await listThemes();

  // Cast to ThemeFlags: deepmerge widens the type to reflect that override.flags
  // has optional fields, but defaultThemeFlags provides every required field, so
  // the merged result IS a complete ThemeFlags shape at runtime.
  const flags = deepmerge(defaultThemeFlags, override.flags, {
    arrayMerge: (_dest, src) => src,
  }) as ThemeFlags;

  return (
    <html lang='en'
          className={`Portfolio theme-${themeId} ${allFontVariables} h-full antialiased`}>
      <body className='portfolio-body min-h-full flex flex-col'>
        <AppProviders themeId={themeId}
                      styles={override.styles}
                      flags={flags}
                      metadata={override.metadata}
                      messages={messages}>
          <ThemeSwitcher themes={themes} />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

function emojiToFaviconDataUrl(emoji: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${emoji}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
