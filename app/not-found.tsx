import { getTranslations } from 'next-intl/server';

import '@/css/NotFound.css';

/**
 * Route-level 404. Rendered when no route matches or notFound() is called.
 * Cross-page navigation lives in the shared PortfolioIntro (rendered by layout.tsx).
 */
export default async function NotFound() {
  const tNotFound = await getTranslations('NotFound');

  return (
    <main className='NotFound flex-1 flex flex-col items-center justify-center text-center'>
      <div className='not-found-container'>
        <h1 className='not-found-title'>{tNotFound('title')}</h1>
        <p className='not-found-description'>{tNotFound('description')}</p>
      </div>
    </main>
  );
}
