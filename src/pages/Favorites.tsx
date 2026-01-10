import { useState } from "react";
import Navigation from "../components/Navigation";

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container text-center">
      <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here</p>
    </div>
  );
};

export default Favorites;
