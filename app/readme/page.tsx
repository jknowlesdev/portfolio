import { promises as fs } from 'node:fs';
import path from 'node:path';

import { getTranslations } from 'next-intl/server';

import { MarkdownPage } from '@/lib/components/MarkdownPage';
import { GITHUB_README_URL } from '@/lib/urls';

/**
 * Readme page (/readme) - renders README.md from repo root via MarkdownPage.
 *
 * The path is a literal, so the build traces only README.md into the deploy; a
 * variable path makes Turbopack include the whole project. The file ships with
 * the Vercel deploy, so reading it at request time returns the same content as
 * the GitHub raw URL, no network fetch needed.
 */
export default async function Readme() {
  const tReadme = await getTranslations('Readme');
  const content = await fs.readFile(path.join(process.cwd(), 'README.md'), 'utf-8');

  return (
    <MarkdownPage
      content={content}
      title={tReadme('title')}
      description={tReadme('description')}
      githubUrl={GITHUB_README_URL}
      githubLabel={tReadme('viewOnGithub')} />
  );
}
