'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useThemeId } from '@/lib/theme/ThemeProvider';
import type { ThemeMetadata } from '@/lib/theme/theme.zod';

import '@/css/ThemeSwitcher.css';

type ThemeSwitcherProps = {
  themes: ThemeMetadata[];
};

export function ThemeSwitcher({ themes }: ThemeSwitcherProps) {
  const tAria = useTranslations('Aria');
  const activeThemeId = useThemeId();
  const router = useRouter();
  const searchParams = useSearchParams();

  const switchTo = (themeId: string) => {
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
    <nav className='ThemeSwitcher fixed top-4 right-4 z-50 flex gap-1 rounded-full border p-1'
         aria-label={tAria('themeSwitcher')}>
      {themes.map((theme) => {
        const isActive = theme.id === activeThemeId;
        return (
          <button key={theme.id}
                  type='button'
                  onClick={() => switchTo(theme.id)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={tAria('switchToTheme', { theme: theme.displayName })}
                  className='theme-switcher-button flex items-center gap-1.5 rounded-full px-3 py-2 min-h-[44px] text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]'>
            {theme.favicon && (
              <span className='theme-switcher-emoji' aria-hidden='true'>{theme.favicon}</span>
            )}
            <span className='theme-switcher-label hidden sm:inline'>{theme.displayName}</span>
          </button>
        );
      })}
    </nav>
  );
}
