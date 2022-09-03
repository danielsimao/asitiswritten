import '../styles/global.css';

import { ThemeProvider } from 'next-themes';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '../components/MDXComponents';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const C = Component as any;
  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXComponents}>
        <C {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}
