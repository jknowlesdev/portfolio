/**
 * HomePage — top-level route content for the / route. Renders the intro block
 * (name, role, location, tagline) sourced from the theme's translations.
 *
 * Wired into app/page.tsx as the default export (thin re-export). All widget
 * rendering (flag-driven) will land here as the portfolio grows.
 */

import { getTranslations } from 'next-intl/server';

import '@/css/HomePage.css';

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
        <p className='home-page-location text-sm mb-6'>
          {tIntro('location')}
        </p>
        <p className='home-page-tagline text-lg'>
          {tIntro('tagline')}
        </p>
      </div>
    </main>
  );
}
