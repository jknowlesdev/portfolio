import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import deepmerge from 'deepmerge';
import { AppProviders } from '@/lib/providers';
import { allFontVariables } from '@/lib/fonts';
import { defaultFlags } from '@/lib/theme/default-flags';
import { resolveThemeId } from '@/lib/theme/server/resolve-theme-id';
import { loadThemeOverride } from '@/lib/theme/server/theme-loader';
import type { ThemeFlags } from '@/lib/theme/theme.zod';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jason Knowles — Senior Software Engineer',
  description:
    'Senior software engineer building front-end architecture at scale, currently exploring full-stack opportunities for deeper end-to-end experience.',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const themeId = await resolveThemeId();
  const override = await loadThemeOverride(themeId);
  const messages = await getMessages();

  // Cast to ThemeFlags: deepmerge widens the type to reflect that override.flags
  // has optional fields, but defaultFlags provides every required field, so the
  // merged result IS a complete ThemeFlags shape at runtime.
  const flags = deepmerge(defaultFlags, override.flags, {
    arrayMerge: (_dest, src) => src,
  }) as ThemeFlags;

  return (
    <html lang='en'
          className={`${allFontVariables} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <AppProviders themeId={themeId}
                      styles={override.styles}
                      flags={flags}
                      messages={messages}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
