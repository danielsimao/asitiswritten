import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import mdxPrism from 'mdx-prism';

const root = process.cwd();

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'data', type));
}

export async function getBiblePaths() {
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

export async function getFileBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'data', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'data', `${type}.mdx`), 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        [
          require('remark-autolink-headings'),
          {
            linkProperties: {
              className: ['anchor']
            }
          }
        ],
        require('remark-code-titles')
      ],
      rehypePlugins: [mdxPrism]
    }
  });
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  const tweetIDs = tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]);

  return {
    mdxSource,
    tweetIDs: tweetIDs || [],
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data
    }
  };
}

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, 'data', type));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, 'data', type, postSlug),
      'utf8'
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', '')
      },
      ...allPosts
    ];
  }, []);
}

export async function getNumberOfChapters(book) {
  return fs.readdirSync(path.join(root, `data/bible/acf/${book}`, type)).length;
}
