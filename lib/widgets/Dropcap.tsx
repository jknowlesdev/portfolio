/**
 * Dropcap — decorative first-letter treatment for editorial-style paragraphs.
 *
 * Flag-gated on flags.widgets.dropcap. When off, children render unchanged;
 * when on, wraps them in a `.Dropcap` container that scopes the CSS rule
 * so only paragraphs inside get the oversized first letter.
 *
 * Client component because it reads a flag from ThemeProvider context.
 * Children can be server-rendered content passed through the boundary.
 */

'use client';

import type { ReactNode } from 'react';

import { useThemeFlags } from '@/lib/theme/ThemeProvider';

import '@/css/Dropcap.css';

type DropcapProps = {
  children: ReactNode;
};

export function Dropcap({ children }: DropcapProps) {
  const flags = useThemeFlags();
  if (!flags.widgets.dropcap) {
    return <>{children}</>;
  }
  return <div className='Dropcap'>{children}</div>;
}
