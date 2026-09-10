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
 * CommandPrompt — pre-scripted terminal demo. Renders in a resting state
 * showing the first command (e.g. whoami) as if a completed session; viewers
 * trigger playback via the play button in the top-right.
 *
 * On play, each command is typed character-by-character and its output is
 * revealed; when finished, the terminal lands back on the resting state.
 * Stop cancels mid-animation and jumps straight to the resting state.
 *
 * Flag-gated on flags.widgets.commandPrompt. Commands + control-button
 * icons are all discovered from translations.
 *
 * Honors prefers-reduced-motion: if a viewer clicks Play, the animation
 * is skipped and the resting state is restored immediately.
 */
export function CommandPrompt() {
  const flags = useThemeFlags();
  const messages = useMessages() as CommandPromptMessages;

  const section = messages.CommandPrompt;
  const commands = getIndexedTranslationEntries(section, 'command', 'Prompt', ['Output']);

  const [mode, setMode] = useState<SessionMode>('done');
  const [typedPrompt, setTypedPrompt] = useState(() => commands[0]?.anchor || '');
  const [output, setOutput] = useState<string | null>(() => commands[0]?.siblings.Output || null);

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
