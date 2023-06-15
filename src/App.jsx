import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SearchDetails from "./pages/SearchDetails";
import Compare from "./pages/Compare";
import Favourite from "./pages/Favourite";
//import Journal from "./pages/Journal";
import "./App.css";
import FavouriteDetails from "./pages/FavouriteDetails";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path = "search" element = {<Search />} />
          <Route path = "search/details/:id" element = {<SearchDetails />} />

          <Route path = "compare" element = {<Compare />} />
          <Route path = "favourite" element = {<Favourite />} />
          <Route path = "favourite/details/:id" element = {<FavouriteDetails />} />
          {/*<Route path = "journal" element = {<Journal />} />*/}
          <Route path="/*" element={<h1>Error 404: No page found</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
