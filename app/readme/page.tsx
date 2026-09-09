import { getTranslations } from 'next-intl/server';

import { MarkdownPage } from '@/lib/components/MarkdownPage';
import { GITHUB_README_URL } from '@/lib/urls';

/**
 * Readme page (/readme) - renders README.md from repo root via MarkdownPage.
 */
export default async function Readme() {
  const tReadme = await getTranslations('Readme');
  const tNavigation = await getTranslations('Navigation');

  return (
    <MarkdownPage
      filename='README.md'
      title={tReadme('title')}
      description={tReadme('description')}
      githubUrl={GITHUB_README_URL}
      githubLabel={tReadme('viewOnGithub')}
      backLabel={tNavigation('backToHome')} />
  );
}
