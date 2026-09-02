/**
 * CSS custom property utilities. Read/write CSS variables on a DOM element
 * (defaults to <html>). Prefix `--` is handled automatically — callers pass
 * names without it.
 *
 * Also includes `applyStyleOverrides()` — the theme-specific convenience
 * wrapper that iterates a theme's `styles` object (colors, fonts, text,
 * spacing) and sets each key as a CSS custom property. Defaults declared in
 * globals.css cascade through for any key a theme does not override.
 *
 * Client-side only — these touch `document`. Call from Client Components
 * or inside useEffect.
 */

import type { ThemeStylesOverride } from './theme.zod';

/**
 * Read a CSS custom property value from an element (default: <html>).
 * Returns the cascaded value (walks up the tree if not set at this scope).
 */
export function getStyleVar(
  name: string,
  element: HTMLElement = document.documentElement,
): string {
  return getComputedStyle(element).getPropertyValue(`--${name}`).trim();
}

/**
 * Set a CSS custom property value on an element (default: <html>).
 */
export function setStyleVar(
  name: string,
  value: string,
  element: HTMLElement = document.documentElement,
): void {
  element.style.setProperty(`--${name}`, value);
}

/**
 * Remove a CSS custom property, reverting to whatever cascades from parent scopes.
 */
export function removeStyleVar(
  name: string,
  element: HTMLElement = document.documentElement,
): void {
  element.style.removeProperty(`--${name}`);
}

/**
 * Apply a theme's style overrides as CSS custom properties on an element.
 * Only keys the theme actually overrides are set; unmentioned keys inherit
 * from the `:root` defaults declared in globals.css.
 *
 * Naming maps directly to Tailwind v4 @theme conventions:
 *   styles.colors.X   →  --color-X
 *   styles.fonts.X    →  --font-X
 *   styles.text.X     →  --text-X
 *   styles.spacing.X  →  --spacing-X
 */
export function applyStyleOverrides(
  styles: ThemeStylesOverride,
  element: HTMLElement = document.documentElement,
): void {
  const sectionToPrefix = {
    colors: 'color',
    fonts: 'font',
    text: 'text',
    spacing: 'spacing',
  } as const;

  for (const [section, prefix] of Object.entries(sectionToPrefix)) {
    const sectionValues = styles[section as keyof ThemeStylesOverride];
    if (!sectionValues) {
      continue;
    }
    for (const [key, value] of Object.entries(sectionValues)) {
      setStyleVar(`${prefix}-${key}`, value, element);
    }
  }
}
