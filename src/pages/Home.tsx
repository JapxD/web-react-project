import Navigation from "../components/Navigation";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, fetchPopularMovies } from "../services/api";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setError(null);
        setLoading(true);
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // Handlers
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      let searchResults: Movie[];
      if (searchQuery) {
        searchResults = await searchMovies(searchQuery);
      } else {
        searchResults = await fetchPopularMovies();
      }
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading... </div>
      ) : movies.length > 0 ? (
        <div className="row row-cols-auto">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div>No movies found</div>
      )}
    </>
  );
};

export default Home;
