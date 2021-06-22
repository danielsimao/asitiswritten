import Container from '../components/Container';
import SearchMobile from '../components/SearchMobile';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Surf the Bible
        </h1>
        <h2 className="text-2xl md:text-2xl text-gray-600 dark:text-gray-400 mb-16">
          Quick and easy
        </h2>
        <SearchMobile></SearchMobile>
      </div>
    </Container>
  );
}
