import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ExternalLink } from '@/lib/components/ExternalLink';
import { GITHUB_URL } from '@/lib/urls';

import '@/css/DocsPage.css';

/**
 * The docs listed on this page, in reading order. Each key names its title and
 * description in the Docs translations; the path is the file in the repo.
 */
const DOCS = [
  { key: 'architecture', path: 'docs/architecture/overview.md' },
  { key: 'process', path: 'docs/development/process.md' },
  { key: 'concept', path: 'docs/concept.md' },
  { key: 'roadmap', path: 'docs/roadmap.md' },
] as const;

/**
 * Docs page (/docs) - an index of the repo's docs. Each entry opens on GitHub
 * until the docs render on the site.
 */
export default async function Docs() {
  const tDocs = await getTranslations('Docs');

  return (
    <main className='DocsPage flex-1'>
      <div className='docs-page-container max-w-5xl mx-auto'>
        <div className='docs-page-content-wrapper max-w-3xl'>
          <header className='docs-page-header mb-8'>
            <h1 className='docs-page-title'>{tDocs('title')}</h1>
            <p className='docs-page-description'>{tDocs('description')}</p>
          </header>
          <ul className='docs-page-list flex flex-col gap-6'>
            {DOCS.map(({ key, path }) => {
              return (
                <li key={key} className='docs-page-item'>
                  <ExternalLink href={`${GITHUB_URL}/blob/main/${path}`} className='icon-link docs-page-link'>
                    {tDocs(`${key}Title`)}
                    <ExternalLinkIcon className='icon-sm' />
                  </ExternalLink>
                  <p className='docs-page-item-description'>{tDocs(`${key}Description`)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
