/**
 * Default translations — baseline copy used when no theme overrides a key.
 * Per-theme JSON files override individual keys; unmentioned keys fall through.
 *
 * Sections + keys within each section are alphabetized for predictable lookup.
 */

import type { ThemeTranslations } from './theme.zod';

export const defaultThemeTranslations: ThemeTranslations = {
  Aria: {
    customizationToggle: 'Toggle customization mode panel',
    switchToTheme: 'Switch to {theme} theme',
    themeSwitcher: 'Theme',
  },
  Customization: {
    closeButton: 'Close',
    panelDescription: 'Toggle features on and off to see how this theme is built. Each option maps to a value in the theme JSON at content/custom-themes/theme-{id}.json.',
    panelTitle: 'Customization mode',
    resetButton: 'Reset to theme defaults',
    toggleLabel: 'Customize',
  },
  Footer: {
    privacyNote: 'Only counts total visits and downloads. No cookies, no personal data, no tracking across visits.',
  },
  Intro: {
    contactCta: 'Contact',
    downloadCta: 'Download resume',
    location: 'Boston area',
    name: 'Jason Knowles',
    role: 'Senior Software Engineer',
    tagline: 'Shipping clean, scalable code for 8+ years. Demonstrates config-driven, multi-tenant architecture.',
  },
  Navigation: {
    themeSwitch: 'Theme',
    viewConfig: 'View configuration',
  },
  Sections: {
    education: 'Education',
    experience: 'Experience',
    projects: 'Personal Projects',
    skills: 'Technical Skills',
    summary: 'Summary',
  },
  Stats: {
    mostViewedTheme: 'most viewed theme',
    sectionTitle: 'Site activity',
    totalDownloads: 'resume downloads',
    totalVisits: 'visitors',
  },
  Widgets: {
    collapseLabel: 'Show less',
    expandLabel: 'Show more',
  },
};
