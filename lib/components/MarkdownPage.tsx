import { promises as fs } from 'node:fs';
import path from 'node:path';

import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { ExternalLink } from '@/lib/components/ExternalLink';

import '@/css/MarkdownPage.css';

type MarkdownPageProps = {
  filename: string;
  title: string;
  description: string;
  githubUrl: string;
  githubLabel: string;
};

/**
 * MarkdownPage - shared server component that renders a repo-root markdown
 * file as a styled page. Header shows title, description, and an external
 * "view on GitHub" link; article contains the parsed markdown content.
 *
 * The following plugins match GitHub's rendering:
 * - remark-gfm: GitHub Flavored Markdown, such as tables and task lists
 * - rehype-slug: GitHub's anchor id on each heading; allows certain markdown
 *   features (such as table-of-contents links) to work properly with the
 *   react-markdown render
 *
 * The file ships with the Vercel deploy - fs.readFile at request time returns
 * the same content as the GitHub raw URL, no network fetch needed.
 */
export async function MarkdownPage({
  filename,
  title,
  description,
  githubUrl,
  githubLabel,
}: MarkdownPageProps) {
  const filePath = path.join(process.cwd(), filename);
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <main className='MarkdownPage flex-1'>
      <div className='markdown-page-container max-w-5xl mx-auto'>
        <div className='markdown-page-content-wrapper max-w-3xl'>
          <header className='markdown-page-header'>
            <p className='markdown-page-title'>{title}</p>
            <p className='markdown-page-description'>{description}</p>
            <ExternalLink href={githubUrl} className='icon-link markdown-page-github-link'>
              {githubLabel}
              <ExternalLinkIcon className='icon-sm' />
            </ExternalLink>
          </header>
          <article className='markdown-page-content'>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>{content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
}
