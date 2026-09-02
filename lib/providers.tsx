/**
 * AppProviders — single composition point for the client-side context providers
 * the app needs at the root level.
 *
 * Keeps provider composition in one focused file:
 *   - Easy to reorder providers when order matters (outer/inner nesting)
 *   - Easy to add a new provider without touching the layout shell
 *   - Isolates "which providers exist" from "how the HTML is structured"
 */

'use client';

import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import type { ThemeStylesOverride, ThemeFlags } from '@/lib/theme/theme.zod';

type AppProvidersProps = {
  themeId: string;
  styles: ThemeStylesOverride;
  flags: ThemeFlags;
  messages: Record<string, unknown>;
  children: ReactNode;
};

export function AppProviders({ themeId, styles, flags, messages, children }: AppProvidersProps) {
  return (
    <NextIntlClientProvider locale='en' messages={messages}>
      <ThemeProvider themeId={themeId} styles={styles} flags={flags}>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}