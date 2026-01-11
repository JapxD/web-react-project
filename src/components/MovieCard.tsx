import { useMovieContext } from "../contexts/MovieContext";

interface MovieCardProp {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

const MovieCard = ({ id, poster_path, title, release_date }: MovieCardProp) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const movie: MovieCardProp = { id, poster_path, title, release_date };
  const favorite = isFavorite(id);
  // Handlers
  const onFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    if (!favorite) {
      addToFavorites(movie);
    } else {
      removeFromFavorites(movie.id);
    }
  };

  return (
    <div className="col">
      <div
        className="card mb-2 mt-2"
        style={{ width: "15rem", position: "relative" }}
      >
        <img
          src={"https://image.tmdb.org/t/p/w500" + poster_path}
          alt={title}
          className="card-img-top img-fluid p-2"
          style={{
            height: "20rem",
            objectFit: "fill",
          }}
        ></img>
        <button
          className={`btn btn-sm ${
            favorite ? "btn-danger" : "btn-light"
          } rounded-circle`}
          style={{
            width: "2rem",
            height: "2rem",
            position: "absolute",
            top: "15px",
            right: "15px",
          }}
          onClick={onFavoriteClick}
        >
          ♥
        </button>
        <div
          className="card-body p-2 pt-0"
          style={{
            height: "5rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            className="card-title fw-normal"
            style={{
              margin: 0,
              fontSize: "0.9rem",
            }}
          >
            {title}
          </p>
          <p
            className="card-text fw-light"
            style={{
              margin: 0,
              fontSize: "0.8rem",
            }}
          >
            {release_date.slice(0, 4)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
