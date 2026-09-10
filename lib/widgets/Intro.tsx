'use client';

import { useTranslations } from 'next-intl';

import { useTypewriter } from '@/lib/hooks/useTypewriter';
import { useThemeFlags } from '@/lib/theme/ThemeProvider';
import { Dropcap } from '@/lib/widgets/Dropcap';

/**
 * Intro — home-page identity block: name (h1), role, tagline, and bio.
 * Bio is wrapped in Dropcap (which itself is flag-gated per theme).
 *
 * When flags.widgets.typewriterIntro is on, apply a typewriter reveal
 * where specified (e.g. tagline).
 */
export function Intro() {
  const tIntro = useTranslations('Intro');
  const flags = useThemeFlags();
  const typewriterIntro = !!flags.widgets.typewriterIntro;

  const tagline = useTypewriter(tIntro('tagline'), { active: typewriterIntro });

  return (
    <>
      <h1 className='home-page-name font-bold mb-2'>
        {tIntro('name')}
      </h1>
      <p className='home-page-role text-xl mb-6'>
        {tIntro('role')}
      </p>
      <p className='home-page-tagline text-lg mb-6'>
        {tagline.displayed}
      </p>
      <Dropcap>
        <p className='home-page-bio text-base'>
          {tIntro('bio')}
        </p>
      </Dropcap>
    </>
  );
}
