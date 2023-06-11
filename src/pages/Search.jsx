import SearchList from "../components/SearchList";
import { useEffect, useState } from "react";

export default function Search() {

  const [fooddata, setFoodData] = useState([]);
  const [foodlist, setFoodList] = useState([]);

  const [search, setSearch] = useState('');
  const [pageNo, setPageNumber] = useState('');

  const [compareCheckbox, setCompareCheckbox] = useState(false);

  async function getFood() {
    const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2&query=" + encodeURIComponent(search) +
    "&sortOrder=asc&dataType=Branded&pageSize=25&pageNumber=" + encodeURIComponent(pageNo));
    
    const data = await response.json();
    const fd = data.foods;
    setFoodList(data);
    setFoodData(fd);
    
    console.log(data);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function handlePageNumberChange(e) {
    setPageNumber(e.target.value);
  }

  function handleSearch() {
    console.log("Searching Food");
    getFood();
  }

  const handleCompare = event => {
    if (event.target.checked) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is NOT checked');
    }
    setCompareCheckbox(current => !current);
  };

    return (
      <>
      <h1>Search</h1>
      <input type="text" id="search" name="search" placeholder="Broccoli, Salmon, Cheese, etc.." onChange={handleSearchChange}></input>
      <input type="submit" value={"Search"} onClick={handleSearch}></input>
      
      <input type="text" id="page" name="page" placeholder="0, 1, 100.." onChange={handlePageNumberChange}></input>
      <label>Maximum Pages: {foodlist.totalPages}</label>

      <input type="checkbox" id="compare" name="compare" onChange={handleCompare}></input>

      <label>Compare</label>
      {/* Shows when checkbox is ticked */}
      <input type="text" id="descripton" name="descripton" placeholder="First Item Description" readOnly></input>
      {/* Shows when checkbox is ticked */}
      <input type="text" id="brandowner" name="brandowner" placeholder="First Item Brand Owner" readOnly></input>

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
          <SearchList fd={fooddata}/>
        </tbody>
      </table>
      </>
    );
  }