import { useState, useEffect } from "react";
import SearchList from "../components/SearchList";

export default function Search() {

  const [fooddata, setFoodData] = useState([]);
  const [foodlist, setFoodList] = useState([]);

  const [search_url, setSearch] = useState('');
  const [resultsPerPage_url, setResultsPerPage] = useState(50);
  const [pageNo_url, setPageNumber] = useState(1);
  
  const [maximumPageNumber, setMaximumPageNumber] = useState(0);

  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchSearch() {
      setStatus("loading");
      try {
        const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2&query=" + encodeURIComponent(search_url) +
        "&dataType=Branded&pageSize=" + encodeURIComponent(resultsPerPage_url) + "&pageNumber=" + encodeURIComponent(pageNo_url));
        
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const data = await response.json();

        setFoodList(data);
        setFoodData(data.foods);
        setMaximumPageNumber(pageNumber(data));

        setStatus("");
      } catch (error) {
          setStatus("error");
      }
    }
    fetchSearch();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2&query=" + encodeURIComponent(search_url) +
      "&dataType=Branded&pageSize=" + encodeURIComponent(resultsPerPage_url) + "&pageNumber=" + encodeURIComponent(pageNo_url));

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    setFoodList(data);
    setFoodData(data.foods);
    setMaximumPageNumber(pageNumber(data));
    setStatus("");

    } catch (error) {
        setStatus("error");
    }
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

  function pageNumber(data) {
    if(parseInt(data.totalPages) * parseInt(resultsPerPage_url) > 10000) {
      return 10000 / parseInt(resultsPerPage_url);
    }
    else {
      return data.totalPages;
    }
  }

  return (
    <>
    <h1>Search</h1>
    <form onSubmit = {handleSearch}>
      <input type="text" id="search" name="search" placeholder="Broccoli, Salmon, Cheese, etc.." onChange={handleSearchChange}></input><br></br>
      <input type="text" id="resultsPerPage" name="resultsPerPage" placeholder="Results per page" onChange={handleResultsPerPageChange}></input><br></br>
      <input type="text" id="page" name="page" placeholder="Page No" onChange={handlePageNumberChange}></input><br></br>
      <label>Maximum Pages: {Math.floor(maximumPageNumber)}</label><br></br>
      <input type="submit" value={"Search"}></input><br></br>
      <label>{status}</label>
    </form>

    <SearchList fd={fooddata} />
    
    </>
  );
  }