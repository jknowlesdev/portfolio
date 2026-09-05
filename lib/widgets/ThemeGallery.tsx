/**
 * ThemeGallery — card gallery of portfolio themes. Each card is a
 * clickable link that switches to that theme via URL param + router.refresh
 * (matches ThemeSwitcher pattern).
 *
 * Flag-gated on flags.widgets.themeGallery. Reads themes list from prop
 * (server layout calls listThemes() and passes down).
 *
 * Client component: reads flag from ThemeProvider context + uses router hooks
 * for navigation. Server-rendered content (theme names/descriptions) passes
 * through the boundary as props.
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';

import { useThemeFlags, useThemeId } from '@/lib/theme/ThemeProvider';
import type { ThemeMetadata } from '@/lib/theme/theme.zod';

import '@/css/ThemeGallery.css';

type ThemeGalleryProps = {
  themes: ThemeMetadata[];
};

export function ThemeGallery({ themes }: ThemeGalleryProps) {
  const flags = useThemeFlags();
  const tThemeGallery = useTranslations('ThemeGallery');
  const activeThemeId = useThemeId();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!flags.widgets.themeGallery) {
    return null;
  }

  const buildHref = (themeId: string) => (themeId === 'default' ? '/' : `?theme=${themeId}`);

  const handleClick = (event: MouseEvent, themeId: string) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (themeId === 'default') {
      params.delete('theme');
    } else {
      params.set('theme', themeId);
    }
    const query = params.toString();
    router.push(query ? `?${query}` : '/');
    router.refresh();
  };

  return (
    <section className='ThemeGallery'
             aria-labelledby='theme-gallery-heading'
             aria-describedby='theme-gallery-subtitle'>
      <h2 id='theme-gallery-heading' className='theme-gallery-heading'>
        {tThemeGallery('sectionTitle')}
      </h2>
      <p id='theme-gallery-subtitle' className='theme-gallery-subtitle'>
        {tThemeGallery('sectionSubtitle')}
      </p>
      <div className='theme-gallery-grid'>
        {themes.map((theme) => {
          const isActive = theme.id === activeThemeId;
          return (
            <a key={theme.id}
               href={buildHref(theme.id)}
               onClick={(e) => handleClick(e, theme.id)}
               className='theme-gallery-card'
               aria-current={isActive ? 'true' : undefined}
               aria-label={tThemeGallery('ariaCardLink', { theme: theme.displayName })}>
              {theme.favicon && (
                <span className='theme-gallery-card-favicon' aria-hidden='true'>
                  {theme.favicon}
                </span>
              )}
              <h3 className='theme-gallery-card-name'>{theme.displayName}</h3>
              {theme.description && (
                <p className='theme-gallery-card-description'>{theme.description}</p>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}
