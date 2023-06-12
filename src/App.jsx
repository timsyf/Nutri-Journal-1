import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SearchDetails from "./pages/SearchDetails";
import Journal from "./pages/Journal.jsx";
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path = "search" element = {<Search />} />
          <Route path = "search/details/:id" element = {<SearchDetails />} />

          <Route path = "journal" element = {<Journal />} />
          <Route path="/*" element={<h1>Error 404: No page found</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
