/**
 * Newsticker — horizontal marquee of rotating headlines, styled after a
 * newspaper ticker tape.
 *
 * Flag-gated on flags.widgets.newsticker. Headlines are discovered dynamically
 * by scanning Newsticker translation keys matching HEADLINE_KEY_PATTERN.
 * Adding a new headline = add headlineN to translations; no component change
 * needed.
 *
 * Marquee (newsticker) behavior:
 *   - Continuous horizontal scroll via CSS keyframes.
 *   - Headlines are duplicated in the DOM for seamless looping; the duplicate
 *     copy is aria-hidden so screen readers announce each headline once.
 *   - Pauses on hover AND focus (keyboard users get the same benefit).
 *   - Respects prefers-reduced-motion — animation is disabled entirely, list
 *     renders statically.
 *
 * Client component because it reads a flag from ThemeProvider context and
 * pulls messages via next-intl's useMessages hook.
 */

'use client';

import { useMessages } from 'next-intl';

import { useThemeFlags } from '@/lib/theme/ThemeProvider';

import '@/css/Newsticker.css';

// Headline translation keys follow headlineN where N is the headline's index.
// This regex isolates them so the component discovers headlines dynamically.
const HEADLINE_KEY_PATTERN = /^headline\d+$/;

type NewstickerMessages = {
  Newsticker: {
    ariaLabel: string;
    [key: string]: string;
  };
};

export function Newsticker() {
  const flags = useThemeFlags();
  const messages = useMessages() as NewstickerMessages;

  if (!flags.widgets.newsticker) {
    return null;
  }

  const { Newsticker: news } = messages;
  const headlineKeys = Object.keys(news)
    .filter((key) => HEADLINE_KEY_PATTERN.test(key))
    .sort();
  const headlines = headlineKeys.map((key) => news[key]);

  return (
    <section className='Newsticker' aria-label={news.ariaLabel}>
      <div className='newsticker-track'>
        {headlines.map((headline, i) => (
          <span key={`primary-${i}`} className='newsticker-item'>
            {headline}
          </span>
        ))}
        {headlines.map((headline, i) => (
          <span key={`duplicate-${i}`} className='newsticker-item' aria-hidden='true'>
            {headline}
          </span>
        ))}
      </div>
    </section>
  );
}
