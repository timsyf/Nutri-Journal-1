import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <aside>Nutri Journal</aside>
        <main>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Outlet />
        </main>
      </div>
    </>
  );
}
