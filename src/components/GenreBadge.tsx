import "../css/GenreBadge.css";

interface GenreBadgeProp {
  genre: string;
}

const GenreBadge = ({ genre }: GenreBadgeProp) => {
  return <div className="col genre-badge">{genre}</div>;
};

export default GenreBadge;
