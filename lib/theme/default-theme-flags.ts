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
    // Global (on across all themes unless the theme JSON overrides to false)
    themeGallery: true,

    // Default look-and-feel (off in defaults, opted-in via theme-default.json / theme-custom.json)
    showcase: false,

    // Newspaper look-and-feel
    dropcap: false,
    newsticker: false,
    classifieds: false,

    // Terminal look-and-feel
    commandPrompt: false,
    typewriterIntro: false,
    asciiMessage: false,
  },
};
