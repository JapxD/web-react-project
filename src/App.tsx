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
          </Routes>
        </div>
      </MovieProvider>
    </main>
  );
};

export default App;
