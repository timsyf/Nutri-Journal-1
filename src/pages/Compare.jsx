import { useState } from "react";

export default function Compare(props1, props2) {

  const [firstCompare, setFirstCompare] = useState([]);
  const [secondCompare, setSecondCompare] = useState([]);

  async function handleSearch() {
    const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods?fdcIds=111&fdcIds=222&fdcIds=333&format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2");
    const data = await response.json();
  }

  async function handleSetFirstCompare(e) {
    setFirstCompare(e.target.value);
  }

  async function handleSetSecondCompare(e) {
    setSecondCompare(e.target.value);
  }

    return (
      <>
        <h1>Compare</h1>
        <input type="text" id="firstCompare" name="firstCompare" placeholder="first item" onChange={handleSetFirstCompare}></input><br></br>
        <input type="text" id="secondCompare" name="secondCompare" placeholder="second item" onChange={handleSetSecondCompare}></input><br></br>
        
      </>
    );
}


