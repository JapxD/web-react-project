import { useState } from "react";
import Navigation from "../components/Navigation";

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container text-center">
      <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
};

export default Favorites;
