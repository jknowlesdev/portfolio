/**
 * Classifieds — newspaper-style Situations Wanted section.
 *
 * Flag-gated on flags.widgets.classifieds. Ads are discovered dynamically
 * by scanning Classifieds translation keys matching AD_HEADER_KEY_PATTERN
 * and pairing each with its matching adNBody. Adding a new ad = add
 * adNHeader + adNBody to translations; no component change needed.
 *
 * Client component because it reads a flag from ThemeProvider context and
 * pulls messages via next-intl's useMessages hook.
 */

'use client';

import { useMessages } from 'next-intl';

import { useThemeFlags } from '@/lib/theme/ThemeProvider';

import '@/css/Classifieds.css';

// Ad translation keys follow adNHeader / adNBody where N is the ad's index.
// This regex isolates Header keys so we can pair each with its Body sibling.
const AD_HEADER_KEY_PATTERN = /^ad\d+Header$/;

type ClassifiedsMessages = { Classifieds: Record<string, string> };

export function Classifieds() {
  const flags = useThemeFlags();
  const messages = useMessages() as ClassifiedsMessages;

  if (!flags.widgets.classifieds) {
    return null;
  }

  const classifieds = messages.Classifieds;
  const adKeys = Object.keys(classifieds)
    .filter((key) => AD_HEADER_KEY_PATTERN.test(key))
    .sort();

  return (
    <section className='Classifieds' aria-labelledby='classifieds-heading' aria-describedby='classifieds-subtitle'>
      <h2 id='classifieds-heading' className='classifieds-heading'>
        {classifieds.sectionTitle}
      </h2>
      <p id='classifieds-subtitle' className='classifieds-subtitle'>
        {classifieds.sectionSubtitle}
      </p>
      <dl className='classifieds-list'>
        {adKeys.map((headerKey) => {
          const bodyKey = headerKey.replace('Header', 'Body');
          return (
            <div key={headerKey} className='classifieds-ad'>
              <dt className='classifieds-ad-header'>{classifieds[headerKey]}</dt>
              <dd className='classifieds-ad-body'>{classifieds[bodyKey]}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
