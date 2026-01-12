import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetail } from "../services/api";
import Navigation from "../components/Navigation";

interface MovieDetailProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genres: string[];
  runtime: number;
  vote_average: number;
}

const MovieDetail = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movie, setMovie] = useState<MovieDetailProps | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setError(null);
        setLoading(true);
        if (!id) return;
        const movieDetail = await fetchMovieDetail(Number(id));

        const correctSlug = slugify(movieDetail.title);

        if (slug !== correctSlug) {
          navigate(`/movie/${id}/${correctSlug}`, { replace: true });
        }

        setMovie(movieDetail);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetails();
  }, [id, slug, navigate]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-"); // spaces → hyphens

  return (
    <>
      <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : movie === null ? (
        <div>Movie not found</div>
      ) : (
        <div>
          <h3>{movie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>Genres: {movie.genres.join(", ")}</p>
          <p>
            Runtime: {movie.runtime} min | Rating: {movie.vote_average}/10
          </p>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
