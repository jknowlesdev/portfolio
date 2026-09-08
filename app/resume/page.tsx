import { getTranslations } from 'next-intl/server';

import { MarkdownPage } from '@/lib/components/MarkdownPage';
import { GITHUB_RESUME_URL } from '@/lib/urls';

/**
 * Resume page (/resume) - renders RESUME.md from repo root via MarkdownPage.
 */
export default async function Resume() {
  const tResume = await getTranslations('Resume');
  const tNavigation = await getTranslations('Navigation');

  return (
    <MarkdownPage
      filename='RESUME.md'
      title={tResume('title')}
      description={tResume('description')}
      githubUrl={GITHUB_RESUME_URL}
      githubLabel={tNavigation('viewOnGithub')}
      backLabel={tNavigation('backToHome')} />
  );
}
