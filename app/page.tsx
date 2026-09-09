import {
  BookOpen as BookOpenIcon,
  ExternalLink as ExternalLinkIcon,
  FileText as FileTextIcon,
} from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { ExternalLink } from '@/lib/components/ExternalLink';
import { listThemes } from '@/lib/theme/server/theme-loader';
import { GITHUB_URL, ROUTE_README, ROUTE_RESUME } from '@/lib/urls';
import { Classifieds } from '@/lib/widgets/Classifieds';
import { Dropcap } from '@/lib/widgets/Dropcap';
import { Newsticker } from '@/lib/widgets/Newsticker';
import { ThemeGallery } from '@/lib/widgets/ThemeGallery';

import '@/css/HomePage.css';

/**
 * Home page (/) - renders the intro block (e.g. name, role, actions, tagline, bio)
 * sourced from the theme's translations, plus the flag-driven widgets.
 */
export default async function HomePage() {
  const tIntro = await getTranslations('Intro');
  const themes = await listThemes();

  const divider = <span aria-hidden='true'>·</span>;

  return (
    <main className='HomePage flex-1 flex flex-col items-center justify-center px-8'>
      <div className='home-page-intro max-w-2xl'>
        <h1 className='home-page-name text-5xl md:text-6xl font-bold mb-2'>
          {tIntro('name')}
        </h1>
        <p className='home-page-role text-xl mb-1'>
          {tIntro('role')}
        </p>
        <p className='home-page-actions text-sm mb-6 flex flex-wrap items-center gap-x-2'>
          <Link href={ROUTE_RESUME} className='icon-link'>
            <FileTextIcon className='icon-md' />
            {tIntro('resumeLabel')}
          </Link>
          {divider}
          <Link href={ROUTE_README} className='icon-link'>
            <BookOpenIcon className='icon-md' />
            {tIntro('readmeLabel')}
          </Link>
          {divider}
          <ExternalLink href={GITHUB_URL} className='icon-link'>
            {tIntro('githubLabel')}
            <ExternalLinkIcon className='icon-sm' />
          </ExternalLink>
        </p>
        <p className='home-page-tagline text-lg mb-6'>
          {tIntro('tagline')}
        </p>
        <Dropcap>
          <p className='home-page-bio text-base'>
            {tIntro('bio')}
          </p>
        </Dropcap>
        <Classifieds />
        <ThemeGallery themes={themes} />
        <Newsticker />
      </div>
    </main>
  );
}
