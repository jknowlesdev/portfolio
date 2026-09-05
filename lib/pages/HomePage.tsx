/**
 * HomePage — top-level route content for the / route. Renders the intro block
 * (name, role, actions, tagline, bio) sourced from the theme's translations,
 * plus the flag-driven widgets.
 *
 * Wired into app/page.tsx as the default export (thin re-export).
 */

import { getTranslations } from 'next-intl/server';

import { Classifieds } from '@/lib/widgets/Classifieds';
import { Dropcap } from '@/lib/widgets/Dropcap';
import { Newsticker } from '@/lib/widgets/Newsticker';

import '@/css/HomePage.css';

const GITHUB_URL = 'https://github.com/jknowlesdev/portfolio';
const README_URL = `${GITHUB_URL}/blob/main/README.md`;
const RESUME_URL = `${GITHUB_URL}/blob/main/RESUME.md`;

export async function HomePage() {
  const tIntro = await getTranslations('Intro');

  return (
    <main className='HomePage min-h-screen flex flex-col items-center justify-center px-8'>
      <div className='home-page-intro max-w-2xl'>
        <h1 className='home-page-name text-5xl md:text-6xl font-bold mb-2'>
          {tIntro('name')}
        </h1>
        <p className='home-page-role text-xl mb-1'>
          {tIntro('role')}
        </p>
        <p className='home-page-actions text-sm mb-6'>
          <a href={RESUME_URL} target='_blank' rel='noopener noreferrer'>
            {tIntro('resumeLabel')}
          </a>
          <span aria-hidden='true'>{' · '}</span>
          <a href={GITHUB_URL} target='_blank' rel='noopener noreferrer'>
            {tIntro('githubLabel')}
          </a>
          <span aria-hidden='true'>{' · '}</span>
          <a href={README_URL} target='_blank' rel='noopener noreferrer'>
            {tIntro('readmeLabel')}
          </a>
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
        <Newsticker />
      </div>
    </main>
  );
}
