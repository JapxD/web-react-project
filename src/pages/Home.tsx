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
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
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
  }, [searchQuery]);

  // Handlers
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container text-center">
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <div className="row">
        {error && <div>{error}</div>}
        {loading ? (
          <div>Loading... </div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              release_date={movie.release_date}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
