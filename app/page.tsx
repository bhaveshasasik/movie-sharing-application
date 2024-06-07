import MovieTile from "@/components/MovieTile";


interface Movie {
  title: string;
  imageUrl: string;
}

const movies: Movie[] = [
  { title: 'Pulp Fiction', imageUrl: "/pulpfiction.jpg"},
  { title: 'Inception', imageUrl: "/inception.jpg" },
  { title: 'The Hulk', imageUrl: "/theincrediblehulk.jpg"},

];

export default function Home() {
  return (
    <section className="">
      <h1 className="text-4xl font-extrabold underline leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-black ml-4 lg:ml-8">Popular Movies</h1>
        <main className="flex flex-row text-black">
          {movies.map((movie, index) => (
            <MovieTile
            key={index}
            title={movie.title} 
            imageUrl={movie.imageUrl}
            />
          ))}
      </main>
    </section>
  );
}