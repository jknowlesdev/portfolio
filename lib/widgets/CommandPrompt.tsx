'use client';

import { useEffect, useState } from 'react';
import { useMessages } from 'next-intl';

import { getIndexedTranslationEntries } from '@/i18n/getIndexedTranslationEntries';
import { iconRegistry } from '@/lib/iconRegistry';
import { useThemeFlags } from '@/lib/theme/ThemeProvider';

import '@/css/CommandPrompt.css';

type CommandPromptMessages = { CommandPrompt: Record<string, string> };

// Animation timing, in milliseconds.
const CHAR_TYPE_MS = 60;        // per-character typing speed
const POST_COMMAND_MS = 400;    // pause after command fully typed, before output
const POST_OUTPUT_MS = 1800;    // pause after output rendered, before clearing
const CLEAR_PAUSE_MS = 250;     // pause between clearing and starting next command

type SessionMode = 'running' | 'done';

/**
 * CommandPrompt — pre-scripted terminal demo. On mount, auto-types a sequence
 * of artificial commands character-by-character and renders their output.
 * Runs through the sequence once, then rests on the first (command1Prompt)
 * translation (e.g. whoami) so the terminal reads as a completed session.
 *
 * A play/stop toggle in the top-right lets viewers restart or interrupt the
 * demo. Stop cancels the animation and jumps to the resting state.
 * Play restarts the sequence from the top.
 *
 * Flag-gated on flags.widgets.commandPrompt. Commands + control-button
 * icons are all discovered from translations.
 *
 * Honors prefers-reduced-motion: skips the animation and renders the
 * resting state immediately.
 */
export function CommandPrompt() {
  const flags = useThemeFlags();
  const messages = useMessages() as CommandPromptMessages;

  const [mode, setMode] = useState<SessionMode>('running');
  const [typedPrompt, setTypedPrompt] = useState('');
  const [output, setOutput] = useState<string | null>(null);

  const section = messages.CommandPrompt;
  const commands = getIndexedTranslationEntries(section, 'command', 'Prompt', ['Output']);

  useEffect(() => {
    if (mode !== 'running' || !flags.widgets.commandPrompt || commands.length === 0) {
      return;
    }

    // Respect prefers-reduced-motion when applicable: skip the animation
    // entirely and rest on whoami. The synchronous setState here fires once
    // on mount; no cascade because deps do not change.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      const first = commands[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTypedPrompt(first.anchor);
      setOutput(first.siblings.Output);
      setMode('done');
      return;
    }

    let cancelled = false;
    setTypedPrompt('');
    setOutput(null);

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function runOnce() {
      for (let idx = 0; idx < commands.length; idx++) {
        if (cancelled) return;
        const { anchor: prompt, siblings } = commands[idx];
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
        // Clear between commands but keep the last one visible for the resting state.
        if (idx < commands.length - 1) {
          setTypedPrompt('');
          setOutput(null);
          await sleep(CLEAR_PAUSE_MS);
        }
      }
      if (cancelled) {
        return;
      };
      // Session complete: return to whoami as the resting state.
      setTypedPrompt(commands[0].anchor);
      setOutput(commands[0].siblings.Output);
      setMode('done');
    }

    runOnce();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.widgets.commandPrompt, mode]);

  if (!flags.widgets.commandPrompt) {
    return null;
  }

  const isRunning = mode === 'running';
  const IconComponent = isRunning
    ? iconRegistry[section.stopIcon]
    : iconRegistry[section.playIcon];
  const controlLabel = isRunning ? section.stopLabel : section.playLabel;

  const handleControlClick = () => {
    if (isRunning) {
      // Stop: cancel the animation via mode change, jump to whoami as resting state.
      setTypedPrompt(commands[0].anchor);
      setOutput(commands[0].siblings.Output);
      setMode('done');
    } else {
      // Play: restart from the top. The mode change triggers the effect.
      setMode('running');
    }
  };

  return (
    <section className='CommandPrompt' aria-label={section.ariaLabel}>
      <div className='command-prompt-screen'>
        <button
          type='button'
          onClick={handleControlClick}
          className='command-prompt-control'
          aria-label={controlLabel}>
          {IconComponent && <IconComponent className='icon-sm' aria-hidden='true' />}
        </button>
        <div className='command-prompt-body' aria-hidden='true'>
          <div className='command-prompt-line'>
            <span className='command-prompt-sigil'>~ $ </span>
            <span className='command-prompt-typed'>{typedPrompt}</span>
            {isRunning && <span className='command-prompt-cursor'>█</span>}
          </div>
          {output !== null && (
            <pre className='command-prompt-output'>{output}</pre>
          )}
        </div>
      </div>
    </section>
  );
}
