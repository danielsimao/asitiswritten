import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import SearchForm from './SearchForm';

export default function Container(props: any) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'The Bible',
    description: 'Bible',
    type: 'website',
    ...customMeta
  };

  return (
    <div className="">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="The Bible" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
      </Head>
      <nav className="mx-auto my-0 flex w-full max-w-4xl items-center justify-between bg-transparent bg-opacity-60 px-8 py-4 text-white dark:text-gray-100">
        <button
          onClick={() => router.push('/')}
          className="absolute hidden h-12 w-12 text-4xl font-bold md:block"
        >
          B.
        </button>
        <SearchForm />
      </nav>
      {children}
    </div>
  );
}
