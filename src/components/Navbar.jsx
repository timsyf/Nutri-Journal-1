import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex" }}>

      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>

      <NavLink to="/search">
      <h1>Search</h1>
      </NavLink>

      <NavLink to="/compare">
      <h1>Compare</h1>
      </NavLink>

      <hr />
    </nav>
  );
}
