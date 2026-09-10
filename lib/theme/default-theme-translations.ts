/**
 * Default translations: baseline copy used when no theme overrides a key.
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
  CommandPrompt: {
    ariaLabel: 'Terminal demo running example commands',
    command1Prompt: 'whoami',
    command1Output: 'jason.knowles',
    command2Prompt: 'cat skills.txt | head -3',
    command2Output: 'javascript, typescript, react\nnode.js, next.js, angular\njava, spring boot, sql',
    command3Prompt: 'cat theme.json | head',
    command3Output: '{\n  "id": "terminal",\n  "displayName": "Terminal",\n  "favicon": "💻",\n  ...\n}',
    command4Prompt: 'theme --current',
    command4Output: 'terminal',
    command5Prompt: 'flags --active',
    command5Output: 'themeGallery, commandPrompt, typewriterIntro, asciiSkills',
  },
  Classifieds: {
    ad1Header: 'POSITION',
    ad1Body: 'Deep front-end architecture; expanding end-to-end, conception to delivery.',
    ad2Header: 'SEEKING',
    ad2Body: 'JavaScript/TypeScript ecosystem; framework-flexible',
    ad3Header: 'EXPERIENCE',
    ad3Body: '8+ years front-end architecture; multi-tenant systems',
    ad4Header: 'NOTICE',
    ad4Body: 'Every widget, section, and feature is opt-in per theme via JSON flag.',
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
  Showcase: {
    sectionTitle: 'The engineering behind this portfolio',
    readMoreLabel: 'See how it\'s built',
    card1Icon: 'palette',
    card1Label: 'Themes',
    card1Description: 'Same portfolio, different themes: try switching to see the design adapt.',
    card2Icon: 'sliders',
    card2Label: 'Config-driven design',
    card2Description: 'Every theme feature is a JSON toggle: the config drives what you see.',
    card3Icon: 'puzzle',
    card3Label: 'Multi-tenant architecture',
    card3Description: 'One codebase, per-tenant customization: the pattern that scales.',
    card4Icon: 'accessibility',
    card4Label: 'Accessibility-first',
    card4Description: 'Every component built to pass WCAG / ARIA audits at design stage.',
    card5Icon: 'layers',
    card5Label: 'Reusable widgets',
    card5Description: 'Widgets opt into themes via flags: write once, activate anywhere.',
    card6Icon: 'book-open',
    card6Label: 'How it\'s built',
    card6Description: 'Full architecture writeup and source on GitHub. See the About page for more details.',
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
