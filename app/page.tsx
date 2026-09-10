import { listThemes } from '@/lib/theme/server/theme-loader';
import { Classifieds } from '@/lib/widgets/Classifieds';
import { CommandPrompt } from '@/lib/widgets/CommandPrompt';
import { Intro } from '@/lib/widgets/Intro';
import { Newsticker } from '@/lib/widgets/Newsticker';
import { Showcase } from '@/lib/widgets/Showcase';
import { ThemeGallery } from '@/lib/widgets/ThemeGallery';

import '@/css/HomePage.css';

/**
 * Home page (/) — renders the intro identity block and flag-driven widgets.
 * The intro (name, role, tagline, bio, and optional typewriter effect) lives
 * in the Intro widget; site-wide nav lives in PortfolioActionLinks (layout.tsx).
 */
export default async function HomePage() {
  const themes = await listThemes();

  return (
    <main className='HomePage flex-1'>
      <div className='home-page-intro max-w-5xl mx-auto'>
        <div className='home-page-content max-w-3xl'>
          <Intro />
          <CommandPrompt />
          <Classifieds />
          <ThemeGallery themes={themes} />
          <Showcase />
          <Newsticker />
        </div>
      </div>
    </main>
  );
}
