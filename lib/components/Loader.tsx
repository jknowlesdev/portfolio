'use client';

import { useTranslations } from 'next-intl';

import '@/css/Loader.css';

type LoaderProps = {
  active: boolean;
};

/**
 * Loader - full-screen fixed spinner with fade in/out on `active` toggle.
 *
 * Renders a centered circular arc spinner as an overlay. Fades via CSS opacity
 * transition; keep mounted so the fade can complete. pointer-events: none so
 * it never intercepts input.
 *
 * a11y: role='status' and aria-live='polite' announce to screen readers.
 * 
 * Respects the CSS `prefers-reduced-motion: reduce` media query - when the
 * user's OS-level "Reduce motion" accessibility setting is on, the spinner
 * stays static instead of rotating.
 */
export function Loader({ active }: LoaderProps) {
  const tAria = useTranslations('Aria');

  return (
    <div className='Loader'
      data-active={active}
      role='status'
      aria-live='polite'
      aria-label={tAria('loading')}>
      <div className='loader-spinner' />
    </div>
  );
}
