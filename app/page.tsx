import { getTranslations } from 'next-intl/server';

import { listThemes } from '@/lib/theme/server/theme-loader';
import { Classifieds } from '@/lib/widgets/Classifieds';
import { Dropcap } from '@/lib/widgets/Dropcap';
import { Newsticker } from '@/lib/widgets/Newsticker';
import { Showcase } from '@/lib/widgets/Showcase';
import { ThemeGallery } from '@/lib/widgets/ThemeGallery';

import '@/css/HomePage.css';

/**
 * Home page (/) - renders the tagline, bio, and flag-driven widgets.
 * Name/role/actions live in the shared PortfolioIntro (rendered by layout.tsx).
 */
export default async function HomePage() {
  const tIntro = await getTranslations('Intro');
  const themes = await listThemes();

  return (
    <main className='HomePage flex-1'>
      <div className='home-page-intro max-w-5xl mx-auto'>
        <div className='home-page-content max-w-3xl'>
          <h1 className='home-page-name text-5xl md:text-6xl font-bold mb-2'>
            {tIntro('name')}
          </h1>
          <p className='home-page-role text-xl mb-6'>
            {tIntro('role')}
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
          <Showcase />
          <Newsticker />
        </div>
      </div>
    </main>
  );
}
