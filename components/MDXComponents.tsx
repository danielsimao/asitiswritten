const BibleVerse = (props: any) => (
  <p>
    <span {...props}></span>{' '}
  </p>
);
const MDXComponents = {
  p: BibleVerse
};

export default MDXComponents;
