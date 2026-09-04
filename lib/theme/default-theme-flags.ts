/**
 * Default flags — baseline layout and feature toggles used when no theme
 * overrides a key. Per-theme JSON files override individual flags;
 * unmentioned flags fall through to these defaults.
 */

import type { ThemeFlags } from './theme.zod';

export const defaultThemeFlags: ThemeFlags = {
  sections: {
    intro: true,
    summary: true,
    experience: true,
    projects: true,
    education: true,
    skills: true,
    stats: true,
  },
  layout: {
    sectionsOrder: ['intro', 'summary', 'experience', 'projects', 'education', 'skills', 'stats'],
    showTagline: true,
    widgetsDefaultExpanded: false,
    showThemeSwitcher: true,
    showViewConfig: true,
  },
  widgets: {
    // Default look-and-feel (on by default in the default theme)
    geometric: true,
    scrollReveal: true,
    cursorTrail: true,

    // Newspaper look-and-feel
    dropcap: false,
    newsticker: false,
    classifieds: false,

    // Terminal look-and-feel
    commandPrompt: false,
    typewriterIntro: false,
    asciiSkills: false,
  },
};
