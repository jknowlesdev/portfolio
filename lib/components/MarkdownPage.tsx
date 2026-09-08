import { promises as fs } from 'node:fs';
import path from 'node:path';

import { ChevronLeft, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; /* GitHub Flavored Markdown plugin for ReactMarkdown */

import { ExternalLink } from '@/lib/components/ExternalLink';
import { ROUTE_HOME } from '@/lib/urls';

import '@/css/MarkdownPage.css';

type MarkdownPageProps = {
  filename: string;
  title: string;
  description: string;
  githubUrl: string;
  githubLabel: string;
  backLabel: string;
};

/**
 * MarkdownPage - shared server component that renders a repo-root markdown
 * file (e.g. RESUME.md, README.md) as a styled page with a header showing
 * title, description, back link to home, and external "view on GitHub" link.
 *
 * The .md file ships with the Vercel deploy, so no network fetch is needed -
 * fs.readFile at request time returns the same content as the GitHub raw URL.
 */
export async function MarkdownPage({
  filename,
  title,
  description,
  githubUrl,
  githubLabel,
  backLabel,
}: MarkdownPageProps) {
  const filePath = path.join(process.cwd(), filename);
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <main className='MarkdownPage flex-1 px-8 py-16'>
      <div className='markdown-page-container max-w-3xl mx-auto'>
        <nav className='markdown-page-nav' aria-label={backLabel}>
          <Link href={ROUTE_HOME} className='icon-link markdown-page-back'>
            <ChevronLeft className='icon-md' />
            {backLabel}
          </Link>
        </nav>
        <header className='markdown-page-header'>
          <h1 className='markdown-page-title'>{title}</h1>
          <p className='markdown-page-description'>{description}</p>
          <ExternalLink href={githubUrl} className='icon-link markdown-page-github-link'>
            {githubLabel}
            <ExternalLinkIcon className='icon-sm' />
          </ExternalLink>
        </header>
        <article className='markdown-page-content'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
