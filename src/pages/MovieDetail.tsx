import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetail } from "../services/api";
import Navigation from "../components/Navigation";
import ProgressCircle from "../components/ProgressCircle";
import GenreBadge from "../components/GenreBadge";
import "../css/MovieDetail.css";

interface MovieDetailProps {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  genres: string[];
  runtime: number;
  vote_average: number;
  tagline: string;
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
          <div
            className="movie-detail-banner"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
            }}
          >
            <div className="container">
              <div className="row movie-detail-hero p-5">
                <div className="col-4">
                  <img
                    className="movie-detail-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="col-8">
                  <div className="movie-detail-title">
                    <h3>{movie.title}</h3>
                    <h4>
                      ({movie.release_date && movie.release_date.slice(0, 4)})
                    </h4>
                  </div>
                  <p className="movie-detail-overview">{movie.overview}</p>
                  <div className="movie-detail-info">
                    <ProgressCircle
                      progress={Math.round(movie.vote_average * 10)}
                    />
                    <div className="genre-container pb-1">
                      <h3
                        style={{
                          color: "white",
                        }}
                      >
                        Genres:
                      </h3>
                      <div className="genres">
                        {movie.genres.map((genre, index) => (
                          <GenreBadge genre={genre} key={index} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
