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

  return (
    <main className='HomePage flex-1 flex flex-col items-center justify-center px-8'>
      <div className='home-page-intro max-w-2xl'>
        <h1 className='home-page-name text-5xl md:text-6xl font-bold mb-2'>
          {tIntro('name')}
        </h1>
        <p className='home-page-role text-xl mb-1'>
          {tIntro('role')}
        </p>
        <p className='home-page-actions text-sm mb-6'>
          <Link href={ROUTE_RESUME}>
            {tIntro('resumeLabel')}
          </Link>
          <span aria-hidden='true'>{' · '}</span>
          <ExternalLink href={GITHUB_URL}>
            {tIntro('githubLabel')}
          </ExternalLink>
          <span aria-hidden='true'>{' · '}</span>
          <Link href={ROUTE_README}>
            {tIntro('readmeLabel')}
          </Link>
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
