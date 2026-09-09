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
    primaryNav: 'Primary',
    switchToTheme: 'Switch to {theme} theme',
    themeSwitcher: 'Theme switcher',
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
    githubLabel: 'GitHub',
    homeLabel: 'Home',
    name: 'Jason Knowles',
    readmeLabel: 'About this project',
    resumeLabel: 'Resume',
    role: 'Senior Software Engineer',
    tagline: 'Shipping clean, scalable code for 8+ years. Demonstrates config-driven, multi-tenant architecture.',
  },
  Newsticker: {
    ariaLabel: 'Rolling headlines',
    headline1: 'SPOTLIGHT: Portfolio launches with configurable themes',
    headline2: 'STYLE: Fonts and colors swap based on active theme',
    headline3: 'CAREER: Full-stack roles under active consideration',
    headline4: 'OPINION: Front-end architecture pairs well with end-to-end engineering',
  },
  NotFound: {
    description: 'This page could not be found.',
    title: '404',
  },
  Readme: {
    description: 'How this portfolio is built: architecture, stack, and how to run it locally.',
    title: 'About this project',
    viewOnGithub: 'README.md (View on GitHub)',
  },
  Resume: {
    description: 'Career overview, experience, and technical skills.',
    title: 'Resume',
    viewOnGithub: 'RESUME.md (View on GitHub)',
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
  ThemeGallery: {
    ariaCardLink: 'Switch to {theme} theme',
    sectionSubtitle: 'Each theme has its own self-contained JSON configuration, fetched server-side and applied client-side. This modular architecture allows for quick expansion, easy customization, and clean separation of content from code.',
    sectionTitle: 'Same portfolio, customizable themes',
  },
  ThemeSwitcher: {
    caption: 'Current Theme: {theme}',
  },
  Widgets: {
    collapseLabel: 'Show less',
    expandLabel: 'Show more',
  },
};
