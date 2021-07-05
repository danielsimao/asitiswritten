import ChapterContainer from '@/components/ChapterContainer';
import { useEffect, useRef, useState } from 'react';

function getHighlightsLabel(highlights) {
  if (!highlights.length) {
    return null;
  }

  let combo = [];
  let acc = [];

  for (const verse of highlights) {
    if (!combo.length) {
      combo.push(verse);
    } else if (combo[combo.length - 1] + 1 === verse) {
      combo.push(verse);
    } else {
      acc.push(combo);
      combo = [verse];
    }
  }

  acc.push(combo);

  return acc
    .reduce((acc, val) => {
      if (val.length > 1) {
        return [...acc, `${val[0]}-${val[val.length - 1]}`];
      } else {
        return [...acc, val[0].toString()];
      }
    }, [])
    .join(',');
}

export default function BookLayout({ children, frontMatter }) {
  const ref = useRef();
  const [highlight, setHighlight] = useState([]);
  const highlightsLabel = getHighlightsLabel(highlight);

  const onClickVerse = (e) => {
    let verseEl;
    if (e.target.tagName === 'P') {
      verseEl = e.target.children[0];
    } else {
      verseEl = e.target;
    }
    const verseRaw = verseEl.querySelector('strong').textContent;
    const verse = Number(verseRaw.substring(0, verseRaw.length - 1));

    if (!verseEl.classList.length) {
      verseEl.classList.add('highlight');
      setHighlight((s) => [...s, verse].sort((a, b) => a - b));
    } else {
      verseEl.classList = [];

      setHighlight((s) => s.filter((v) => v !== verse));
    }
  };

  useEffect(() => {
    const refs = ref.current.children;
    for (const el of refs) {
      el.addEventListener('click', onClickVerse);
    }

    return () => {
      for (const el of refs) {
        el.removeEventListener('click', onClickVerse);
      }
    };
  }, []);

  const footer = highlightsLabel ? (
    <div className="fixed bottom-0 left-0 w-full text-black dark:text-white bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 rounded-t-lg py-2 pr-2 pl-10">
      <div className="flex items-center justify-between">
        <div>{`${frontMatter.book} ${frontMatter.chapter}:${highlightsLabel}`}</div>
        <div className="flex gap-2">
          <button className="w-10 h-10 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
          <button className="w-10 h-10 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <ChapterContainer
      title={`${frontMatter.book} ${frontMatter.chapter}`}
      description={`${frontMatter.book} ${frontMatter.chapter}`}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {frontMatter.book} {frontMatter.chapter}
        </h1>
        <div ref={ref} className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
        {footer}
      </article>
    </ChapterContainer>
  );
}
