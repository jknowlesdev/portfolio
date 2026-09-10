'use client';

import { useEffect, useState } from 'react';
import { useMessages } from 'next-intl';

import { getIndexedTranslationEntries } from '@/i18n/getIndexedTranslationEntries';
import { useThemeFlags } from '@/lib/theme/ThemeProvider';

import '@/css/CommandPrompt.css';

type CommandPromptMessages = { CommandPrompt: Record<string, string> };

// Animation timing, in milliseconds.
const CHAR_TYPE_MS = 60;        // per-character typing speed
const POST_COMMAND_MS = 400;    // pause after command fully typed, before output
const POST_OUTPUT_MS = 1800;    // pause after output rendered, before clearing
const CLEAR_PAUSE_MS = 250;     // pause between clearing and starting next command

/**
 * CommandPrompt — pre-scripted terminal demo. Auto-types a sequence of
 * artificial commands character-by-character, renders their output,
 * pauses, then advances to the next command. Loops through the sequence.
 *
 * Flag-gated on flags.widgets.commandPrompt. Commands are discovered
 * dynamically via getIndexedTranslationEntries — adding a command =
 * add commandNPrompt + commandNOutput to translations.
 *
 * Client component (needs state for the typing animation). Honors
 * prefers-reduced-motion: skips animation and renders all commands at
 * once when the user prefers reduced motion.
 */
export function CommandPrompt() {
  const flags = useThemeFlags();
  const messages = useMessages() as CommandPromptMessages;

  const [typedPrompt, setTypedPrompt] = useState('');
  const [output, setOutput] = useState<string | null>(null);

  const section = messages.CommandPrompt;
  const commands = getIndexedTranslationEntries(section, 'command', 'Prompt', ['Output']);

  useEffect(() => {
    if (!flags.widgets.commandPrompt || commands.length === 0) {
      return;
    }

    // Respect prefers-reduced-motion when applicable: skip the animation entirely. The
    // synchronous setState here fires once on mount for reduced-motion users;
    // no cascade because deps do not change.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      const first = commands[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTypedPrompt(first.anchor);
      setOutput(first.siblings.Output);
      return;
    }

    let cancelled = false;
    let commandIndex = 0;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function runLoop() {
      while (!cancelled) {
        const { anchor: prompt, siblings } = commands[commandIndex];
        // Type the command one character at a time.
        for (let i = 1; i <= prompt.length; i++) {
          if (cancelled) return;
          setTypedPrompt(prompt.slice(0, i));
          await sleep(CHAR_TYPE_MS);
        }
        await sleep(POST_COMMAND_MS);
        if (cancelled) return;
        // Reveal the output all at once.
        setOutput(siblings.Output);
        await sleep(POST_OUTPUT_MS);
        if (cancelled) return;
        // Clear before the next command.
        setTypedPrompt('');
        setOutput(null);
        await sleep(CLEAR_PAUSE_MS);
        commandIndex = (commandIndex + 1) % commands.length;
      }
    }

    runLoop();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.widgets.commandPrompt]);

  if (!flags.widgets.commandPrompt) {
    return null;
  }

  return (
    <section className='CommandPrompt' aria-label={section.ariaLabel}>
      <div className='command-prompt-screen' aria-hidden='true'>
        <div className='command-prompt-line'>
          <span className='command-prompt-sigil'>~ $ </span>
          <span className='command-prompt-typed'>{typedPrompt}</span>
          <span className='command-prompt-cursor'>█</span>
        </div>
        {output !== null && (
          <pre className='command-prompt-output'>{output}</pre>
        )}
      </div>
    </section>
  );
}
