import { useEffect, useState } from "react";
import Airtable from "airtable";

export default function Compare(props1, props2) {

  const [foodData, setFoodData] = useState([]);
  const [firstCompare, setFirstCompare] = useState(["454004"]);
  const [secondCompare, setSecondCompare] = useState(["507441"]);

  const [status, setStatus] = useState("");

  // AIRTABLE
  const base = new Airtable({apiKey:"keyG5wgdTEwwoo4hS"}).base("appuSOtQ4A8knKIU1");

  const [description, setDescription] = useState([]);

  useEffect(() => {
    base("Favourites")
      .select({ view: "Grid view"})
      .eachPage((Description, fetchNextPage) => {
        setDescription(Description);
        fetchNextPage();
      });
    }, []);

  async function handleSearch(event) {
    event.preventDefault();
    setStatus("loading");

    try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods?fdcIds=${encodeURIComponent(firstCompare)}&fdcIds=${encodeURIComponent(secondCompare)}&format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`);
    
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    
    const data = await response.json();
    setFoodData(data);
    setStatus("");

    } catch (error) {
        setStatus("error");
    }
  }

  async function handleSetFirstCompare(e) {
    setFirstCompare(e.target.value);
  }

  async function handleSetSecondCompare(e) {
    setSecondCompare(e.target.value);
  }

    return (
      <>
      <h1>Comparator</h1>
        <form onSubmit={handleSearch}>
          <label>First Item:</label><br></br>
          <select className="dropdown" id="firstCompare" name="firstCompare" onChange={handleSetFirstCompare}>
            <option value="454004">454004 - APPLE - TREECRISP 2 GO</option>
            <option value="2383425">2383425 - CHEESE - Savencia Cheese USA LLC</option>
            <option value="1886337">1886337 - BACON - Ahold USA, Inc.</option>
          </select><br></br>

          <label>Second Item:</label><br></br>
          <select className="dropdown" id="secondCompare" name="secondCompare" onChange={handleSetSecondCompare}>
            <option value="507441">507441 - SANDWICH - DELI EXPRESS</option>
            <option value="538197">538197 - COFFEE - Stumptown Coffee Roasters Inc.</option>
            <option value="2549992">2549992 - BROCCOLI - Wal-Mart Stores, Inc.</option>
          </select><br></br>

          <input type="submit" value={"Search"}></input><br></br>
          <label>{status}</label>
          <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea>

        </form>

        {foodData.map((fd) => (
          <ul key={Math.random() * 10} className="compare_ul">
            <li key={Math.random() * 10}>
              <label key={Math.random() * 10}>ID:</label><br></br><input type="text" name={fd.fdcId} id={fd.fdcId} placeholder={fd.fdcId} readOnly></input>
            </li>
            <li key={Math.random() * 10}>
              <label key={Math.random() * 10}>Description:</label><br></br><input type="text" name={fd.fdcId} id={fd.description} placeholder={fd.description} readOnly></input>
            </li>
            {fd.foodNutrients.map((c) => (
            <li key={Math.random() * 10}>
              <label key={Math.random() * 10}>{c.name}: </label><br></br><input type="text" name={c.name} id={c.name} placeholder={c.amount + " " + c.unitName} readOnly></input>
            </li>
            ))}
          </ul>
        ))}
      </>
    );
}


