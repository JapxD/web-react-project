import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";

interface MovieCardProps {
  movie: {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
  };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const onFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!favorite) addToFavorites(movie);
    else removeFromFavorites(movie);
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-"); // spaces → hyphens

  return (
    <Link
      className="col link-reset"
      to={`/movie/${movie.id}/${slugify(movie.title)}`}
    >
      <div className="movie-card mb-2 mt-2">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="card-img-top img-fluid p-2"
          style={{ height: "20rem", objectFit: "fill" }}
        />
        <button
          className={`movie-btn ${
            favorite ? "movie-btn-primary" : "movie-btn-light"
          } rounded-circle`}
          onClick={onFavoriteClick}
        >
          ♥
        </button>
        <div className="card-body movie-card-body p-2 pt-0">
          <h5 className="movie-title" title={movie.title}>
            {movie.title}
          </h5>
          <p className="movie-meta">
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
