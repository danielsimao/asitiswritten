import Container from '../components/Container';
import Search from '../components/Search';
import SearchMobile from '../components/SearchMobile';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white mb-16">
          As It Is Written
        </h1>
        <SearchMobile></SearchMobile>
        <Search></Search>
      </div>
    </Container>
  );
}
