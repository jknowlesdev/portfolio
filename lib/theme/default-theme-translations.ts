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
    loading: 'Loading',
    switchToTheme: 'Switch to {theme} theme',
    themeSwitcher: 'Theme',
  },
  Classifieds: {
    ad1Header: 'POSITION',
    ad1Body: 'Deep front-end architecture; expanding end-to-end, conception to delivery.',
    ad2Header: 'SEEKING',
    ad2Body: 'JavaScript/TypeScript ecosystem; framework-flexible',
    ad3Header: 'EXPERIENCE',
    ad3Body: '8+ years front-end architecture; multi-tenant systems',
    ad4Header: 'NOTICE',
    ad4Body: 'Runs only when a theme enables the classifieds widget.',
    sectionTitle: 'Classifieds Section Typically Seen in Newspapers',
    sectionSubtitle: 'A portfolio widget demonstrating self-classifieds in classic newspaper advertisement form.',
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
    bio: '',
    githubLabel: 'jknowlesdev/portfolio',
    name: 'Jason Knowles',
    readmeLabel: 'README.md',
    resumeLabel: 'Resume',
    role: 'Senior Software Engineer',
    tagline: 'Shipping clean, scalable code for 8+ years. Demonstrates config-driven, multi-tenant architecture.',
  },
  Navigation: {
    themeSwitch: 'Theme',
    viewConfig: 'View configuration',
  },
  Newsticker: {
    ariaLabel: 'Rolling headlines',
    headline1: 'SPOTLIGHT: Portfolio launches with configurable themes',
    headline2: 'STYLE: Fonts and colors swap based on active theme',
    headline3: 'CAREER: Full-stack roles under active consideration',
    headline4: 'OPINION: Front-end architecture pairs well with end-to-end engineering',
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
