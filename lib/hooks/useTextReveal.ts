import { useEffect, useState } from 'react';

const DEFAULT_CHAR_TYPE_MS = 55;

type UseTextRevealOptions = {
  /**
   * When false, the hook returns the full text immediately with
   * `isComplete: true` and does not animate. Callers use this to gate the
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
 * Progressively reveals `text` character-by-character when `active` is true
 * (typewriter effect). Future expansions may add other reveal styles
 * (fade-in, blur-in, etc.) behind the same interface.
 *
 * SSR / initial render: returns the full text (a11y/SEO). On client mount
 * (or when `active`/`text` changes), the hook resets to empty and re-reveals
 * unless the user prefers reduced motion — in which case the full text is
 * shown immediately with no animation.
 *
 * Returns `{ text, isComplete }`:
 *   - `text` — the substring currently revealed
 *   - `isComplete` — true when the animation has finished (or was skipped)
 */
export function useTextReveal(text: string, { active, charMs = DEFAULT_CHAR_TYPE_MS }: UseTextRevealOptions) {
  const [revealed, setRevealed] = useState(text);
  const [isComplete, setIsComplete] = useState(true);

  useEffect(() => {
    if (!active) {
      // Sync revealed back to the full text so we do not leave a stale
      // partial-revealed string visible if this hook was mid-animation before
      // active turned off (e.g., theme switch while typewriter was running).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRevealed(text);
      setIsComplete(true);
      return;
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    };

    let cancelled = false;
    // Reset to empty before revealing begins. Fires once on mount when active;
    // the effect does not re-run because its deps [active, text, charMs] do
    // not change here.
    setRevealed('');
    setIsComplete(false);

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function simulateTyping() {
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return;
        setRevealed(text.slice(0, i));
        await sleep(charMs);
      }
      if (!cancelled) {
        setIsComplete(true)
      };
    }

    simulateTyping();
    return () => {
      cancelled = true;
    };
  }, [active, text, charMs]);

  return { text: revealed, isComplete };
}
