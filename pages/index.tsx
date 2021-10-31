import Container from '../components/Container';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center max-w-2xl mx-auto mb-16 w-full ">
        <h1 className="font-bold text-5xl md:text-7xl tracking-tight text-center text-black dark:text-white mb-16">
          The Bible
          <br />
          As It Is Written
        </h1>
      </div>
    </Container>
  );
}
