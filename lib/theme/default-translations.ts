/**
 * Default translations — baseline copy used when no theme overrides a key.
 * Per-theme JSON files override individual keys; unmentioned keys fall through.
 */

import type { ThemeTranslations } from './theme.zod';

export const defaultTranslations: ThemeTranslations = {
  Intro: {
    name: 'Jason Knowles',
    role: 'Senior Software Engineer',
    location: 'Boston area',
    tagline: 'Shipping clean, scalable code for 8+ years. Demonstrates config-driven, multi-tenant architecture.',
    contactCta: 'Contact',
    downloadCta: 'Download resume',
  },
  Sections: {
    summary: 'Summary',
    experience: 'Experience',
    projects: 'Personal Projects',
    education: 'Education',
    skills: 'Technical Skills',
  },
  Widgets: {
    expandLabel: 'Show more',
    collapseLabel: 'Show less',
  },
  Navigation: {
    themeSwitch: 'Theme',
    viewConfig: 'View configuration',
  },
  Stats: {
    sectionTitle: 'Site activity',
    totalVisits: 'visitors',
    totalDownloads: 'resume downloads',
    mostViewedTheme: 'most viewed theme',
  },
  Footer: {
    privacyNote: 'Only counts total visits and downloads. No cookies, no personal data, no tracking across visits.',
  },
  Customization: {
    toggleLabel: 'Customize',
    toggleAriaLabel: 'Toggle customization mode panel',
    panelTitle: 'Customization mode',
    panelDescription: 'Toggle features on and off to see how this theme is built. Each option maps to a value in the theme JSON at content/custom-themes/theme-{id}.json.',
    resetButton: 'Reset to theme defaults',
    closeButton: 'Close',
  },
};
