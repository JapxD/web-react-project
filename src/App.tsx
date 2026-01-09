import React from "react";
import MovieCard from "./components/MovieCard";
import { searchMovies, fetchPopularMovies } from "./services/api";
import { useState, useEffect } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
    <div>
      <MovieCard />
    </div>
  );
};

export default App;
