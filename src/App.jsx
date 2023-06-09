import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Compare from "./pages/Compare";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path = "search" element = {<Search />} />
          <Route path = "compare" element = {<Compare />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
