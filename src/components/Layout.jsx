import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div>
      <main>
        <h1>Nutri Journal</h1>
        <p>Nutri Journal is a comprehensive nutrition guide website revolutionizing healthy eating.
          With its extensive database of branded food, users can effortlessly search, compare, and explore the nutritional value of various products.
          Empowering individuals to make informed dietary choices, Nutri Journal is the go-to platform for optimizing wellness through smart food selection.</p>
        <Outlet />
      </main>
      </div>
    </>
  );
}
