/**
 * next/font/google font declarations, centralized. Each font exposes a CSS
 * variable (--font-X); themes reference these variables to switch typography.
 *
 * Import from app/layout.tsx as the single source of truth for font loading.
 * Adding a new font for a future theme: add it here + include in allFontVariables.
 */

import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Source_Serif_4,
  JetBrains_Mono,
} from 'next/font/google';

// Default theme fonts
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Newspaper theme fonts
export const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
});

export const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
});

// Terminal theme font
export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

/**
 * Combined className string for all font variables — applied once to the
 * <html> tag so every font is available via var(--font-X) in CSS.
 */
export const allFontVariables = [
  geistSans.variable,
  geistMono.variable,
  playfairDisplay.variable,
  sourceSerif.variable,
  jetbrainsMono.variable,
].join(' ');
