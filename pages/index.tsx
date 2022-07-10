import Container from '../components/Container';
import SearchForm from '../components/SearchForm';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      {/* <nav className="mx-auto my-0 flex w-full max-w-4xl items-center justify-between bg-transparent bg-opacity-60 px-8 py-4 text-white dark:text-gray-100">
        <button
          onClick={() => router.push('/')}
          className="absolute hidden h-12 w-12 text-4xl font-bold md:block"
        >
          B.
        </button>
        <SearchForm />
      </nav> */}
      <main
        id="skip"
        className="flex flex-col justify-center  px-8 dark:bg-black"
      >
        <div className="flex flex-col items-center justify-center pt-10">
          <div className="fixed inset-0 -z-[1] h-[500px] w-full bg-[rgb(204,196,179)]" />
          <div className="relative h-[500px] w-full max-w-[1120px] overflow-hidden rounded-xl">
            <Image
              alt="Mountains"
              src="/static/images/hero.jpeg"
              layout="fill"
              objectFit="cover"
              // objectPosition="50% unset"
              className="rounded-lg"
              loading="eager"
            />
            <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-5 p-4 font-semibold">
              <h1 className="text-center text-xl  tracking-wide sm:max-w-sm md:text-2xl">
                Conheça a maravilhosa palavra do nosso Criador
              </h1>
              <Link href="/acf/gen/1">
                <a className="rounded-full bg-white py-3 px-6  text-[#E28C5B]">
                  Começar a ler
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}
