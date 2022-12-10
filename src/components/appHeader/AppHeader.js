import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";

const AppHeader = () => {
  const activeLink = ({ isActive }) => (isActive ? { color: "red" } : null);
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink style={activeLink} to={"/"}>
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink style={activeLink} to={"/comics"}>
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
