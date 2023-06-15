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

      function HandleDeleteFromFavourites() {

      }

      return (
          <>
          <h1>Search Details</h1><Link to={"../../favourite"}><input type="submit" value={"Back"}></input></Link><input name={foodData.fdcId} type="button" value={"Delete"} onClick={HandleDeleteFromFavourites}></input><br></br>
                
          <label>{status}</label>
            <table className="details">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{foodData.fdcId}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{foodData.description}</td>
                </tr>
                {foodDataNutrients.map((c) => (
                <tr>
                  <th>{c.name}</th>
                  <td>{c.amount + " " + c.unitName}</td>
              </tr>
                ))}
              </tbody>
            </table>
        </>
        )
  }
