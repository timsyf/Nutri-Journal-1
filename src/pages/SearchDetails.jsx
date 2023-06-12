import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

export default function SearchDetails() {

    const [foodData, setFoodData] = useState([]);
    const { id } = useParams()

    const [foodDataNutrients, setFoodDataNutrients] = useState([]);
    let nutrientsCount = 0;

    useEffect(() => {
        async function getFoodData() {
          const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${encodeURIComponent(id)}?format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`);
          const data = await response.json();
          setFoodData(data);
          setFoodDataNutrients(jsonData.foodNutrients);
        }
        getFoodData();
        nutrientsCount = 0;
      }, []);

      return (
          <>
          
          <h1>Search Details</h1><Link to={"../../search"}><input type="button" value={"Back"}></input></Link>
          <ul>

          </ul>

          {foodData.map((fd) => (
            <ul>
              <li><label>ID:</label><br></br><input type="text" name={fd.fdcId} id={fd.fdcId} placeholder={fd.fdcId} readOnly></input></li>
              <li><label>Description:</label><br></br><input type="text" name={fd.fdcId} id={fd.description} placeholder={fd.description} readOnly></input></li>
              {fd.map((c) => (
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
        )
  }
