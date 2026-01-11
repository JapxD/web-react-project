import { createContext, useState, useContext, useEffect } from "react";

interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within MovieProvider");
  }
  return context;
};

interface MovieProviderProps {
  children: React.ReactNode;
}

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}
export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (!storedFavs) return [];
    try {
      return JSON.parse(storedFavs) as Movie[];
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromFavorites = (movie: Movie) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
