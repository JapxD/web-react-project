import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <main>
      <MovieProvider>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </MovieProvider>
    </main>
  );
};

export default App;
