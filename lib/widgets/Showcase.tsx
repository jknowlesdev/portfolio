/**
 * Showcase — grid of icon + label + description cards, plus a section-level
 * "read more" link. Advertises the interesting characteristics of the
 * portfolio (or whatever content the theme puts into it). Icons resolve
 * against the shared iconRegistry.
 *
 * Flag-gated on flags.widgets.showcase. Cards are discovered dynamically
 * via getIndexedTranslationEntries — adding a new card = add cardNIcon +
 * cardNLabel + cardNDescription to translations; no component change.
 *
 * Client component because it reads a flag from ThemeProvider context and
 * pulls messages via next-intl's useMessages hook.
 */

'use client';

import { ArrowRight as ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMessages } from 'next-intl';

import { getIndexedTranslationEntries } from '@/i18n/getIndexedTranslationEntries';
import { iconRegistry } from '@/lib/iconRegistry';
import { useThemeFlags } from '@/lib/theme/ThemeProvider';
import { ROUTE_README } from '@/lib/urls';

import '@/css/Showcase.css';

type ShowcaseMessages = { Showcase: Record<string, string> };

export function Showcase() {
  const flags = useThemeFlags();
  const messages = useMessages() as ShowcaseMessages;
  const searchParams = useSearchParams();

  if (!flags.widgets.showcase) {
    return null;
  }

  const showcase = messages.Showcase;
  const cards = getIndexedTranslationEntries(showcase, 'card', 'Label', ['Icon', 'Description']);

  // Preserve theme query param on the "read more" link.
  const query = searchParams.toString();
  const readMoreHref = query ? `${ROUTE_README}?${query}` : ROUTE_README;

  return (
    <section className='Showcase' aria-labelledby='showcase-heading'>
      <div className='showcase-header'>
        <h2 id='showcase-heading' className='showcase-heading'>
          {showcase.sectionTitle}
        </h2>
        <Link href={readMoreHref} className='icon-link showcase-read-more'>
          {showcase.readMoreLabel}
          <ArrowRightIcon className='icon-sm' aria-hidden='true' />
        </Link>
      </div>
      <dl className='showcase-grid'>
        {cards.map(({ anchor, siblings }, i) => {
          const IconComponent = siblings.Icon ? iconRegistry[siblings.Icon] : null;
          return (
            <div key={i} className='showcase-card'>
              {IconComponent && (
                <IconComponent className='showcase-card-icon' aria-hidden='true' />
              )}
              <dt className='showcase-card-label'>{anchor}</dt>
              <dd className='showcase-card-description'>{siblings.Description}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
