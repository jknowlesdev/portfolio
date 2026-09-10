'use client';

import { useMessages } from 'next-intl';

import { useThemeFlags } from '@/lib/theme/ThemeProvider';

import '@/css/AsciiMessage.css';

type AsciiMessageMessages = { AsciiMessage: Record<string, string> };

const LINE_KEY_PATTERN = /^line\d+$/;

/**
 * AsciiMessage — decorative bordered box with a terminal-style welcome
 * message. Title + N lines of body text, all discovered dynamically from
 * translations (add lineN = add a line, no component change).
 *
 * Flag-gated on flags.widgets.asciiMessage. Static (no animation), so it
 * lives alongside CommandPrompt without competing for attention.
 */
export function AsciiMessage() {
  const flags = useThemeFlags();
  const messages = useMessages() as AsciiMessageMessages;

  if (!flags.widgets.asciiMessage) {
    return null;
  }

  const section = messages.AsciiMessage;
  const lines = Object.keys(section)
    .filter((k) => LINE_KEY_PATTERN.test(k))
    .sort()
    .map((k) => section[k]);

  return (
    <section className='AsciiMessage' aria-label={section.ariaLabel}>
      <div className='ascii-message-box'>
        {section.title && (
          <div className='ascii-message-title'>{section.title}</div>
        )}
        {lines.map((line, i) => (
          <p key={i} className='ascii-message-line'>{line}</p>
        ))}
      </div>
    </section>
  );
}
