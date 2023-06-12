import { useState } from "react";

export default function Compare(props1, props2) {

  const [foodData, setFoodData] = useState([]);
  const [firstCompare, setFirstCompare] = useState([]);
  const [secondCompare, setSecondCompare] = useState([]);
  let nutrientsCount = 0;

  async function handleSearch(event) {
    event.preventDefault();
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods?fdcIds=${encodeURIComponent(firstCompare)}&fdcIds=${encodeURIComponent(secondCompare)}&format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`);
    const data = await response.json();
    setFoodData(data);
    nutrientsCount = 0;

    console.log(firstCompare);
    console.log(secondCompare);
    console.log(foodData);
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
        <form onSubmit={handleSearch}>
          <input type="text" id="firstCompare" name="firstCompare" placeholder="first item" onChange={handleSetFirstCompare}></input><br></br>
          <input type="text" id="secondCompare" name="secondCompare" placeholder="second item" onChange={handleSetSecondCompare}></input><br></br>
          <input type="submit" value={"Search"}></input>
        </form>

        {foodData.map((fd) => (
          <ul>
            <li><label>ID:</label><br></br><input type="text" name={fd.fdcId} id={fd.fdcId} placeholder={fd.fdcId} readOnly></input></li>
            <li><label>Description:</label><br></br><input type="text" name={fd.fdcId} id={fd.description} placeholder={fd.description} readOnly></input></li>

            {fd.foodNutrients.map((c) => (
              <div key={nutrientsCount++}>
                <li>
                  <label>{c.name}: </label><br></br>
                  <input type="text" name={c.name} id={c.name} placeholder={c.amount + " " + c.unitName} readOnly></input>
                </li>
              </div>
            ))}

          </ul>
        ))}
      </>
    );
}


