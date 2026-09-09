/**
 * Classifieds — newspaper-style Situations Wanted section.
 *
 * Flag-gated on flags.widgets.classifieds. Ads are discovered dynamically
 * via getIndexedTranslationEntries — adding a new ad = add adNHeader +
 * adNBody to translations; no component change needed.
 *
 * Client component because it reads a flag from ThemeProvider context and
 * pulls messages via next-intl's useMessages hook.
 */

'use client';

import { useMessages } from 'next-intl';

import { getIndexedTranslationEntries } from '@/i18n/getIndexedTranslationEntries';
import { useThemeFlags } from '@/lib/theme/ThemeProvider';

import '@/css/Classifieds.css';

type ClassifiedsMessages = { Classifieds: Record<string, string> };

export function Classifieds() {
  const flags = useThemeFlags();
  const messages = useMessages() as ClassifiedsMessages;

  if (!flags.widgets.classifieds) {
    return null;
  }

  const classifieds = messages.Classifieds;
  const ads = getIndexedTranslationEntries(classifieds, 'ad', 'Header', ['Body']);

  return (
    <section className='Classifieds' aria-labelledby='classifieds-heading' aria-describedby='classifieds-subtitle'>
      <h2 id='classifieds-heading' className='classifieds-heading'>
        {classifieds.sectionTitle}
      </h2>
      <p id='classifieds-subtitle' className='classifieds-subtitle'>
        {classifieds.sectionSubtitle}
      </p>
      <dl className='classifieds-list'>
        {ads.map(({ anchor, siblings }, i) => (
          <div key={i} className='classifieds-ad'>
            <dt className='classifieds-ad-header'>{anchor}</dt>
            <dd className='classifieds-ad-body'>{siblings.Body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
