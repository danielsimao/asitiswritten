import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const root = process.cwd();

export interface BiblePathData {
  params: { version: string; book: string; chapter: string };
}

export async function getBiblePaths(): Promise<BiblePathData[]> {
  return fs
    .readdirSync(path.join(root, 'data', 'bible'))
    .map((version) => {
      const books = fs.readdirSync(path.join(root, 'data', `bible/${version}`));
      return books
        .map((book) => {
          const chapters = fs.readdirSync(
            path.join(root, 'data', `bible/${version}/${book}`)
          );

          return chapters.map((chapter) => ({
            params: {
              version,
              book,
              chapter: chapter.replace(/\.mdx/, '')
            }
          }));
        })
        .flat();
    })
    .flat();
}

export interface ChapterProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    slug: string | null;
    chapter: string;
    book: string;
  };
}

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<ChapterProps> {
  const source = slug
    ? fs.readFileSync(path.join(root, 'data', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'data', `${type}.mdx`), 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content);

  return {
    mdxSource,
    frontMatter: {
      slug: slug || null,
      chapter: data.chapter,
      book: data.book,
      ...data
    }
  };
}
