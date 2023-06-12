import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

export default function SearchDetails() {

    const [foodData, setFoodData] = useState([]);
    const { id } = useParams()

    const [foodDataNutrients, setFoodDataNutrients] = useState([]);

    useEffect(() => {
        async function getFoodData() {
          const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${encodeURIComponent(id)}?format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`);
          const jsonData = await response.json();
          setFoodData(jsonData);
          setFoodDataNutrients(jsonData.foodNutrients);
        }
        getFoodData();
      }, []);

    if(foodData == undefined) return
    else {
        return (
            <>
            <h1>Search Details</h1>
            <label>ID: {foodData.fdcId}</label><br></br>
            <label>Description: {foodData.description}</label><br></br>
            {foodDataNutrients.map((c) => (
                <>
                    <label>{c.name}: {c.amount}</label><br></br>
                </>
            ))}
            </>
          );
    }
  }
  
  //  'https://api.nal.usda.gov/fdc/v1/food/fdcId?format=full&nutrients=203&nutrients=204&nutrients=205' \
