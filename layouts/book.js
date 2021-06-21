import Container from '@/components/Container';

export default function BookLayout({ children, frontMatter }) {
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
        <div className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
      </article>
    </Container>
  );
}
