import { NavLink } from "react-router-dom";

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Navigation = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: NavigationProps) => {
  // Handlers
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch?.(e);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-outline-primary mb-2 mt-2">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          My Movies
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
                to="/favorites"
              >
                Favorites
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={onSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
