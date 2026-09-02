import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Source_Serif_4,
  JetBrains_Mono,
} from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { eq } from 'drizzle-orm';
import deepmerge from 'deepmerge';
import { db } from '@/lib/db';
import { themes } from '@/db/schema';
import { ThemeProvider } from '@/lib/theme/context';
import { defaultFlags } from '@/lib/theme/default-flags';
import './globals.css';

// Default theme fonts.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Newspaper theme fonts.
const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
});

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
});

// Terminal theme font.
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jason Knowles — Senior Software Engineer',
  description:
    'Senior software engineer building front-end architecture at scale, currently exploring full-stack opportunities for deeper end-to-end experience.',
};

// Loads only the OVERRIDE portion of a theme from the DB. Defaults live in
// code (globals.css for styles, default-flags.ts for flags). The layout merges
// flags in memory; styles cascade via CSS (browser handles the fallback).
async function loadThemeOverride(themeId: string) {
  if (themeId === 'default') {
    return { styles: {}, flags: {} };
  }
  const [row] = await db.select().from(themes).where(eq(themes.id, themeId));
  return {
    styles: row?.styles ?? {},
    flags: row?.flags ?? {},
  };
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const themeId = await getLocale();
  const messages = await getMessages();
  const override = await loadThemeOverride(themeId);

  const flags = deepmerge(defaultFlags, override.flags, {
    arrayMerge: (_dest, src) => src,
  });

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider themeId={themeId} styles={override.styles} flags={flags}>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
