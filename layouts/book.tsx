import ChapterContainer from '../components/ChapterContainer';
import { PropsWithChildren } from 'react';
import { ChapterProps } from '../lib/mdx';

export default function BookLayout({
  children,
  frontMatter
}: Omit<PropsWithChildren<ChapterProps>, 'mdxSource'>) {
  return (
    <ChapterContainer
      title={`${frontMatter.book} ${frontMatter.chapter}`}
      description={`${frontMatter.book} ${frontMatter.chapter}`}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div id="verses" className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
      </article>
    </ChapterContainer>
  );
}
