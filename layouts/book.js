import Container from '@/components/Container';
import { useEffect, useRef, useState } from 'react';

export default function BookLayout({ children, frontMatter }) {
  const ref = useRef();
  const [highlight, setHighlight] = useState('');

  function onClickVerse(e) {
    const verse = e.target;
    if (!verse.classList.length) {
      verse.classList.add('highlight');
    } else {
      verse.classList = [];
    }
    const verseContent = e.target.querySelector('strong').textContent;
    console.log(verseContent);
    // setHighlight(e.target)
  }

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

  return (
    <Container
      title={`${frontMatter.book}`}
      description={frontMatter.chapter}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {frontMatter.book} {frontMatter.chapter}
        </h1>
        <div ref={ref} className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
      </article>
      <div></div>
    </Container>
  );
}
