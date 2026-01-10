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
  return (
    <div className="container text-center">
      <Navigation />
      <div className="row">
        {movies.map((item) => (
          <div className="col-sm-3 mb-2 mb-sm-1">
            <MovieCard
              key={item.id}
              poster_path={item.poster_path}
              title={item.title}
              release_date={item.release_date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
