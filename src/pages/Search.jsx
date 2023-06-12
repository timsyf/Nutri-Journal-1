import SearchList from "../components/SearchList";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function Search() {

  const [fooddata, setFoodData] = useState([]);
  const [foodlist, setFoodList] = useState([]);

  const [search, setSearch] = useState('');
  const [resultsPerPage, setResultsPerPage] = useState('');
  const [pageNo, setPageNumber] = useState('');

  const navigate = useNavigate();

  async function handleSearch() {
    const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2&query=" + encodeURIComponent(search) +
    "&sortOrder=asc&dataType=Branded&pageSize=10&pageNumber=" + encodeURIComponent(pageNo));
    
    const data = await response.json();
    const fd = data.foods;
    setFoodList(data);
    setFoodData(fd);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function handlePageNumberChange(e) {
    setPageNumber(e.target.value);
  }

  function handleResultsPerPageChange(e) {
    setPageNumber(e.target.value);
  }

  return (
    <>
    <h1>Search</h1>
    <input type="text" id="search" name="search" placeholder="Broccoli, Salmon, Cheese, etc.." onChange={handleSearchChange}></input><br></br>
    <input type="text" id="resultsPerPage" name="resultsPerPage" placeholder="1 - 200" onChange={handleResultsPerPageChange}></input><br></br>
    <input type="text" id="resultsPerPage" name="resultsPerPage" placeholder="1 - 200" onChange={handleResultsPerPageChange}></input><br></br>
    <input type="text" id="page" name="page" placeholder="0, 1, 100.." onChange={handlePageNumberChange}></input><br></br>
    <input type="submit" value={"Search"} onClick={handleSearch}></input><br></br>
    <label>Maximum Pages: {foodlist.totalPages}</label>

    <table>
      <tbody>
        <tr>
          <th>GTIN/UPC</th>
          <th>Description</th>
          <th>Branded Food Category</th>
          <th>Brand Owner</th>
          <th>Brand</th>
          <th>Market Country</th>
        </tr>

        {fooddata.map((fd) => (
        <tr key={fd.fdcId}>
          <td><Link to={"./details/" + fd.fdcId}>{fd.fdcId}</Link></td>
          <td>{fd.description}</td>
          <td>{fd.foodCategory}</td>
          <td>{fd.brandOwner}</td>
          <td>{fd.brandName}</td>
          <td>{fd.marketCountry}</td>
        </tr>
        ))}
      </tbody>
    </table>
    </>
  );
  }