/**
 * ThemeProvider — client-side context for the current theme's style overrides
 * and merged flags.
 *
 * Translations are NOT handled here; they flow through NextIntlClientProvider
 * (see i18n/request.ts + app/layout.tsx wiring).
 *
 * Responsibilities:
 *   1. Hold the style OVERRIDES (partial — CSS cascade from globals.css handles
 *      defaults for any key not overridden) and the FLAGS (already merged with
 *      defaults in the layout before being passed here).
 *   2. Apply style overrides as CSS custom properties on <html>, so Tailwind
 *      utilities and component styles resolve to the active theme's values.
 *   3. Expose useThemeStyles() / useThemeFlags() hooks for Client Components
 *      that need the raw values (e.g., a config viewer or theme switcher).
 */

'use client';

import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ThemeStylesOverride, ThemeFlags } from './theme.zod';
import { applyStyleOverrides, clearStyleOverrides } from './style-utils';

type ThemeContextValue = {
  themeId: string;
  styles: ThemeStylesOverride;
  flags: ThemeFlags;
  metadata: { fromCached: boolean };
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  themeId: string;
  styles: ThemeStylesOverride;
  flags: ThemeFlags;
  metadata: { fromCached: boolean };
  children: ReactNode;
};

export function ThemeProvider({ themeId, styles, flags, metadata, children }: ThemeProviderProps) {
  useEffect(() => {
    // console.info(`[ThemeProvider] theme: ${themeId}, fromCached: ${metadata.fromCached}`);
    clearStyleOverrides();
    applyStyleOverrides(styles);
  }, [themeId, styles, metadata]);

  return (
    <ThemeContext.Provider value={{ themeId, styles, flags, metadata }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useTheme* hooks must be called within ThemeProvider');
  }
  return value;
}

export function useThemeId(): string {
  return useThemeContext().themeId;
}

export function useThemeStyles(): ThemeStylesOverride {
  return useThemeContext().styles;
}

export function useThemeFlags(): ThemeFlags {
  return useThemeContext().flags;
}
