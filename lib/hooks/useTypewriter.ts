import { useEffect, useState } from 'react';

const DEFAULT_CHAR_TYPE_MS = 55;

type UseTypewriterOptions = {
  /**
   * When false, the hook returns the full text immediately with
   * `complete: true` and does not animate. Callers use this to gate the
   * effect on a flag or other condition without conditionally calling
   * the hook.
   */
  active: boolean;
  /**
   * Per-character delay in milliseconds. Defaults to 55ms.
   */
  charMs?: number;
};

/**
 * Types out `text` character-by-character when `active` is true.
 *
 * SSR / initial render: returns the full text (a11y/SEO). On client mount
 * (or when `active`/`text` changes), the hook resets to empty and re-types
 * unless the user prefers reduced motion — in which case the full text is
 * shown immediately with no animation.
 *
 * Returns `{ displayed, complete }`:
 *   - `displayed` — the substring currently visible
 *   - `complete` — true when the animation has finished (or was skipped)
 */
export function useTypewriter(text: string, { active, charMs = DEFAULT_CHAR_TYPE_MS }: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState(text);
  const [complete, setComplete] = useState(true);

  useEffect(() => {
    if (!active) {
      return;
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    };

    let cancelled = false;
    // Reset to empty before typing begins. Fires once on mount when active;
    // the effect does not re-run because its deps [active, text, charMs] do
    // not change here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed('');
    setComplete(false);

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function simulateTyping() {
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return;
        setDisplayed(text.slice(0, i));
        await sleep(charMs);
      }
      if (!cancelled) {
        setComplete(true)
      };
    }

    simulateTyping();
    return () => {
      cancelled = true;
    };
  }, [active, text, charMs]);

  return { displayed, complete };
}
