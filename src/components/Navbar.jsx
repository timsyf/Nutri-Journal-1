import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/compare">Comparator</NavLink></li>
        <li><NavLink to="/journal">Journal</NavLink></li>
      </ul>

    </nav>
  );
}
