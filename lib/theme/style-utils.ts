/**
 * CSS custom property utilities. Read/write CSS variables on a DOM element
 * (defaults to <html>). Prefix `--` is handled automatically — callers pass
 * names without it.
 *
 * Also includes the theme-specific pair `applyStyleOverrides()` +
 * `clearStyleOverrides()` for the theme-switch flow. Applying a theme
 * sets its overrides as inline CSS vars; clearing removes them so the
 * :root defaults from globals.css cascade back.
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
 * Track which CSS vars applyStyleOverrides() has set on the element so
 * clearStyleOverrides() can undo them. Module-scope so both functions
 * share state.
 */
let lastAppliedVars = new Set<string>();

/**
 * Remove all CSS custom properties that this module has previously applied.
 * Reverts to the :root defaults from the CSS cascade. Call this before
 * applyStyleOverrides() when switching themes so the previous theme's
 * inline vars do not stick around.
 */
export function clearStyleOverrides(
  element: HTMLElement = document.documentElement,
): void {
  for (const name of lastAppliedVars) {
    element.style.removeProperty(name);
  }
  lastAppliedVars.clear();
}

/**
 * Apply a theme's style overrides as inline CSS custom properties on the
 * element. Only keys the theme actually overrides are set; unmentioned keys
 * inherit from the :root defaults declared in globals.css.
 *
 * Naming maps directly to Tailwind v4 @theme conventions:
 *   styles.colors.X   →  --color-X
 *   styles.fonts.X    →  --font-X
 *   styles.text.X     →  --text-X
 *   styles.spacing.X  →  --spacing-X
 *
 * Call clearStyleOverrides() first when switching themes so the previous
 * theme's inline vars do not persist.
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
      const varName = `--${prefix}-${key}`;
      element.style.setProperty(varName, value);
      lastAppliedVars.add(varName);
    }
  }
}
