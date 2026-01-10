interface MovieCardProp {
  poster_path: string;
  title: string;
  release_date: string;
}

const MovieCard = ({ poster_path, title, release_date }: MovieCardProp) => {
  // Handlers
  const onFavoriteClick = () => {
    alert(title);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={"https://image.tmdb.org/t/p/w500" + poster_path}
        alt={title}
        className="card-img-top"
      ></img>
      <div className="card-body">
        <button className="favorite-btn" onClick={onFavoriteClick}>
          ♥
        </button>
        <h3>{title}</h3>
        <p>{release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
