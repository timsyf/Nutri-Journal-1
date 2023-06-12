import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function Search() {

  const [fooddata, setFoodData] = useState([]);
  const [foodlist, setFoodList] = useState([]);

  const [search, setSearch] = useState('');
  const [resultsPerPage, setResultsPerPage] = useState('50');
  const [pageNo, setPageNumber] = useState('');

  async function handleSearch(event) {
    event.preventDefault();
    const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2&query=" + encodeURIComponent(search) +
    "&dataType=Branded&pageSize=" + encodeURIComponent(resultsPerPage) + "&pageNumber=" + encodeURIComponent(pageNo));
    
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
    setResultsPerPage(e.target.value);
  }

  function pageNumber() {
    if(parseInt(foodlist.totalPages) * parseInt(resultsPerPage) > 10000) {
      return 10000 / parseInt(resultsPerPage);
    }
    else {
      return foodlist.totalPages;
    }
  }

  return (
    <>
    <h1>Search</h1>
    <form onSubmit = {handleSearch}>
      <input type="text" id="search" name="search" placeholder="Broccoli, Salmon, Cheese, etc.." onChange={handleSearchChange}></input><br></br>
      <input type="text" id="resultsPerPage" name="resultsPerPage" placeholder="Results per page" onChange={handleResultsPerPageChange}></input><br></br>
      <input type="text" id="page" name="page" placeholder="Page No" onChange={handlePageNumberChange}></input><br></br>
      <input type="submit" value={"Search"}></input><br></br>
    </form>
    
    <label>Maximum Pages: {pageNumber()}</label>

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