import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <aside>Menu</aside>
        <main>
          <h2>Content</h2>
          <Outlet />
        </main>
      </div>
    </>
  );
}
