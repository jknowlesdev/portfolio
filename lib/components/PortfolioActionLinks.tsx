'use client';

import {
  BookOpen as BookOpenIcon,
  ExternalLink as ExternalLinkIcon,
  FileText as FileTextIcon,
  House as HomeIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ExternalLink } from '@/lib/components/ExternalLink';
import { ThemeSwitcher } from '@/lib/components/ThemeSwitcher';
import type { ThemeMetadata } from '@/lib/theme/theme.zod';
import { GITHUB_URL, ROUTE_HOME, ROUTE_README, ROUTE_RESUME } from '@/lib/urls';

import '@/css/PortfolioActionLinks.css';

type PortfolioActionLinksProps = {
  themes: ThemeMetadata[];
};

/**
 * Shared action links nav (e.g. Home, Resume, README, GitHub).
 */
export function PortfolioActionLinks({ themes }: PortfolioActionLinksProps) {
  const tAria = useTranslations('Aria');
  const tIntro = useTranslations('Intro');
  const pathname = usePathname();

  const isCurrent = (route: string) => pathname === route;

  const linkClass = (route: string) => {
    return isCurrent(route) ? 'icon-link icon-link-current' : 'icon-link';
  };

  const ariaCurrent = (route: string) => {
    return isCurrent(route) ? 'page' : undefined;
  };

  const divider = <span aria-hidden='true'>·</span>;

  return (
    <nav
      aria-label={tAria('primaryNav')}
      className='PortfolioActionLinks sticky top-0 z-40 bg-background -mx-8 px-8 pt-4 pb-4'>
      <div className='portfolio-action-links-container max-w-5xl mx-auto min-h-11 flex flex-wrap items-center justify-between gap-x-4 gap-y-4.5'>
        <p className='portfolio-action-links-row text-sm flex flex-wrap items-center gap-x-3'>
          <Link href={ROUTE_HOME} className={linkClass(ROUTE_HOME)} aria-current={ariaCurrent(ROUTE_HOME)}>
            <HomeIcon className='icon-md' />
            {tIntro('homeLabel')}
          </Link>
          {divider}
          <Link href={ROUTE_RESUME} className={linkClass(ROUTE_RESUME)} aria-current={ariaCurrent(ROUTE_RESUME)}>
            <FileTextIcon className='icon-md' />
            {tIntro('resumeLabel')}
          </Link>
          {divider}
          <Link href={ROUTE_README} className={linkClass(ROUTE_README)} aria-current={ariaCurrent(ROUTE_README)}>
            <BookOpenIcon className='icon-md' />
            {tIntro('readmeLabel')}
          </Link>
          {divider}
          <ExternalLink href={GITHUB_URL} className='icon-link'>
            {tIntro('githubLabel')}
            <ExternalLinkIcon className='icon-sm' />
          </ExternalLink>
        </p>
        <ThemeSwitcher themes={themes} />
      </div>
    </nav>
  );
}
