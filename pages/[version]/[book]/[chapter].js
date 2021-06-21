import { MDXRemote } from 'next-mdx-remote';
import path from 'path';

import { getBiblePaths, getFileBySlug } from '@/lib/mdx';
import BookLayout from '@/layouts/book';
import MDXComponents from '@/components/MDXComponents';

export default function Blog({ mdxSource, frontMatter }) {
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

export async function getStaticProps({ params }) {
  const post = await getFileBySlug(
    'bible',
    path.join(params.version, params.book, params.chapter)
  );

  return { props: { ...post } };
}
