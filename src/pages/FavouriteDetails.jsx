import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

export default function FavouriteDetails() {

    const [foodData, setFoodData] = useState([]);
    const { id } = useParams()

    const [foodDataNutrients, setFoodDataNutrients] = useState([]);

    const [status, setStatus] = useState("");

    useEffect(() => {
        async function getFoodData() {
          setStatus("loading");
          try {
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${encodeURIComponent(id)}?format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`);

          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          
          const data = await response.json();
          setFoodData(data);
          setFoodDataNutrients(data.foodNutrients);

          setStatus("");

          } catch (error) {
              setStatus("error");
          }
        }
        getFoodData();
      }, []);

      return (
          <>
          
          <h1>Search Details</h1><Link to={"../../favourite"}><input type="submit" value={"Back"}></input></Link><br></br>
          <label>{status}</label>
          <ul>
            <li><label>ID:</label><br></br><input type="text" name={foodData.fdcId} id={foodData.fdcId} placeholder={foodData.fdcId} readOnly></input></li>
            <li><label>Description:</label><br></br><input type="text" name={foodData.fdcId} id={foodData.description} placeholder={foodData.description} readOnly></input></li>

            {foodDataNutrients.map((c) => (
              <div key={Math.random() * 10}>
                <li>
                  <label>{c.name}: </label><br></br>
                  <input type="text" name={c.name} id={c.name} placeholder={c.amount + " " + c.unitName} readOnly></input>
                </li>
              </div>
            ))}
          </ul>
          </>
        )
  }
