/**
 * Loader — full-screen fixed spinner with fade in/out on `active` toggle.
 *
 * Renders a centered circular arc spinner as an overlay. Fades via CSS opacity
 * transition; keep mounted so the fade can complete. pointer-events: none so
 * it never intercepts input.
 *
 * a11y: role='status' + aria-live='polite' announce to screen readers.
 * Respects prefers-reduced-motion (no rotation when the user prefers it).
 */

'use client';

import { useTranslations } from 'next-intl';

import '@/css/Loader.css';

type LoaderProps = {
  active: boolean;
};

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
