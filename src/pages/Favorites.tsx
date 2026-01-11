import { useState } from "react";
import MovieCard from "../components/MovieCard";
import Navigation from "../components/Navigation";
import { useMovieContext } from "../contexts/MovieContext";

const Favorites = () => {
  const { favorites } = useMovieContext();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {favorites.length > 0 ? (
        <div className="row row-cols-auto">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              release_date={movie.release_date}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2>No Favorite Movies Yet</h2>
          <p>Start adding movies to your favorites and they will appear here</p>
        </div>
      )}
    </>
  );
};

export default Favorites;
