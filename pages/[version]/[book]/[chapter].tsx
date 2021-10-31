import { MDXRemote } from 'next-mdx-remote';
import path from 'path';

import { getBiblePaths, getFileBySlug, ChapterProps } from '../../../lib/mdx';
import BookLayout from '../../../layouts/book';
import MDXComponents from '../../../components/MDXComponents';
import { GetStaticProps } from 'next';

export default function Chapter({ mdxSource, frontMatter }: ChapterProps) {
  return (
    <BookLayout frontMatter={frontMatter}>
      <MDXRemote
        {...mdxSource}
        components={{
          ...MDXComponents
        }}
      />
    </BookLayout>
  );
}

export async function getStaticPaths() {
  const paths = await getBiblePaths();

  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { version, book, chapter } = params as {
    version: string;
    book: string;
    chapter: string;
  };

  if (!version || !book || !chapter) {
    return {
      redirect: '/',
      props: {}
    };
  }

  const post = await getFileBySlug('bible', path.join(version, book, chapter));

  return { props: { ...post } };
};
