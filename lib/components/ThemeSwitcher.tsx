'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useActiveTheme, useThemeId } from '@/lib/theme/ThemeProvider';
import type { ThemeMetadata } from '@/lib/theme/theme.zod';

import '@/css/ThemeSwitcher.css';

type ThemeSwitcherProps = {
  themes: ThemeMetadata[];
};

export function ThemeSwitcher({ themes }: ThemeSwitcherProps) {
  const tAria = useTranslations('Aria');
  const tThemeSwitcher = useTranslations('ThemeSwitcher');
  const activeThemeId = useThemeId();
  const activeTheme = useActiveTheme(themes);
  const currentThemeName = activeTheme?.displayName || activeThemeId;
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
    <div className='ThemeSwitcher flex flex-col items-end gap-1'>
      <div role='group'
        aria-labelledby='theme-switcher-label'
        className='theme-switcher-nav flex items-center gap-1 rounded-full border p-1'>
        {themes.map((theme) => {
          const isActive = theme.id === activeThemeId;
          return (
            <button key={theme.id}
              type='button'
              onClick={() => switchTo(theme.id)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={tAria('switchToTheme', { theme: theme.displayName })}
              className='theme-switcher-button flex items-center gap-1.5 rounded-full px-3 py-2 min-h-[44px] text-sm focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent)'>
              {theme.favicon && (
                <span className='theme-switcher-emoji' aria-hidden='true'>{theme.favicon}</span>
              )}
              <span className='theme-switcher-label hidden lg:inline'>{theme.displayName}</span>
            </button>
          );
        })}
      </div>
      <span id='theme-switcher-label' className='theme-switcher-heading flex items-center gap-1 text-2xs mr-1'>
        <span className='theme-switcher-heading-emoji' aria-hidden='true'>🎨</span>
        {tThemeSwitcher('caption', { theme: currentThemeName })}
      </span>
    </div>
  );
}
