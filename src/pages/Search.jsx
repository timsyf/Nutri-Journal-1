import { useState, useRef } from "react";
import SearchList from "../components/SearchList";

export default function Search() {

  const [fooddata, setFoodData] = useState([]);
  const [foodlist, setFoodList] = useState([]);

  const [search, setSearch] = useState('');
  const [resultsPerPage, setResultsPerPage] = useState('50');
  const [pageNo, setPageNumber] = useState('');

  const maximumPageRef = useRef(null);

  async function handleSearch(event) {
    event.preventDefault();
    const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2&query=" + encodeURIComponent(search) +
    "&dataType=Branded&pageSize=" + encodeURIComponent(resultsPerPage) + "&pageNumber=" + encodeURIComponent(pageNo));
    
    const data = await response.json();
    const fd = data.foods;
    setFoodList(data);
    setFoodData(fd);
    setPageNoShow(pageNumber());
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
    <form onSubmit = {handleSearch}>
      <input type="text" id="search" name="search" placeholder="Broccoli, Salmon, Cheese, etc.." onChange={handleSearchChange}></input><br></br>
      <input type="text" id="resultsPerPage" name="resultsPerPage" placeholder="Results per page" onChange={handleResultsPerPageChange}></input><br></br>
      <input type="text" id="page" name="page" placeholder="Page No" onChange={handlePageNumberChange}></input><br></br>
      <input type="submit" value={"Search"}></input><br></br>
      <label>Maximum Pages: <input ref={maximumPageRef}></input></label>
    </form>

    <SearchList fd={fooddata} />
    
    </>
  );
  }