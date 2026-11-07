# Concept

The finished design of this portfolio: a site that documents, tests, and demonstrates itself. Today it is a configuration-driven site with themes and widgets, described in the [Architecture Overview](architecture/overview.md). The [Roadmap](roadmap.md) is the order this concept gets built in.

## Contents

- [The docs become the main content](#the-docs-become-the-main-content)
- [Every feature explains itself](#every-feature-explains-itself)
- [Visitors operate what the docs describe](#visitors-operate-what-the-docs-describe)
- [The checks run live](#the-checks-run-live)
- [Finding your way](#finding-your-way)
- [What stays the same](#what-stays-the-same)

## The docs become the main content

The docs render on the site at `/docs`, opening with a Start here path of about five pages in reading order. Each page leads with a plain summary and a "What this shows" note, with the technical depth below.

## Every feature explains itself

Each part of the page is a section placed in a slot, such as the header, main area, or sidebar, and each section has a doc. The doc records why a visitor would want the section and which concept it demonstrates, and a test fails if either is missing, so no feature exists without a reason.

## Visitors operate what the docs describe

A Customize panel changes the same configuration the docs explain:

- **Layout:** show, hide, and move sections between their allowed slots
- **Look:** brand color swatches, each pre-checked for contrast, and a font choice
- **Presets:** start from Terminal or Newspaper, which become presets instead of separate themes

A JSON view stays in sync with the controls. Every change shows what changed, the JSON diff, and the check that covers it. Undo, reset, and a share link make it safe to explore, and the configuration stays in the visitor's browser, with no account needed.

## The checks run live

A Dev view drawer shows the checks behind the docs' claims: tests, axe accessibility results, Core Web Vitals, renders, and the configuration diff. An "i" marker on any section answers "Why is this here?" and links to that section's doc, and links in the docs open Dev view at the matching tab.

## Finding your way

A command palette (Ctrl+K) doubles as docs search. A build log ties the story together: the journal, with tagged entries and an RSS feed; the shipped releases; and the roadmap.

## What stays the same

- **Accessible by default:** every panel and layout passes axe, and everything works by keyboard
- **Configuration as data:** no preset name appears in the code, only in configuration, and a test enforces it
