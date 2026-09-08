import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { ROUTE_HOME } from '@/lib/urls';

import '@/css/NotFound.css';

/**
 * Route-level 404. Rendered when no route matches or notFound() is called.
 */
export default async function NotFound() {
  const tNotFound = await getTranslations('NotFound');
  const tNavigation = await getTranslations('Navigation');

  return (
    <main className='NotFound flex-1 flex flex-col items-center justify-center px-8 text-center'>
      <div className='not-found-container'>
        <h1 className='not-found-title'>{tNotFound('title')}</h1>
        <p className='not-found-description'>{tNotFound('description')}</p>
        <Link href={ROUTE_HOME} className='icon-link not-found-back'>
          <ChevronLeft className='icon-md' />
          {tNavigation('backToHome')}
        </Link>
      </div>
    </main>
  );
}
