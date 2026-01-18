const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
};

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

export const fetchMovieDetail = async (id: number): Promise<MovieDetailProps> => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();

  // Map API response to only the fields your component needs
  const movieDetail: MovieDetailProps = {
    id: data.id,
    title: data.title,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    overview: data.overview,
    release_date: data.release_date,
    genres: data.genres.map((g: { name: string }) => g.name),
    runtime: data.runtime,
    vote_average: data.vote_average,
    tagline: data.tagline
  };

  return movieDetail;
};