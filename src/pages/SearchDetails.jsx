import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

export default function SearchDetails() {

    const [foodData, setFoodData] = useState([]);
    const { id } = useParams()

    const [foodDataNutrients, setFoodDataNutrients] = useState([]);
    const nutrients = ["Calcium", "Iron", "Vitamin A", "Vitamin C", "Protein", "Fat", "Carbohydrate", "Energy", "Sugars", "Fiber", "Sodium", "Cholesterol", "Total Trans", "Total Saturated"];
    let nutrientsCount = 0;

    useEffect(() => {
        async function getFoodData() {
          const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${encodeURIComponent(id)}?format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`);
          const jsonData = await response.json();
          setFoodData(jsonData);
          setFoodDataNutrients(jsonData.foodNutrients);
          console.log(jsonData);
        }
        getFoodData();
        nutrientsCount = 0;
      }, []);

      return (
          <>
          <Link to={"../../search"}>Back</Link>
          <h1>Search Details</h1>
          ID: {foodData.fdcId}<br></br>
          Description: {foodData.description}<br></br>
          {foodDataNutrients.map((c) => (
              <>
                  {nutrients[nutrientsCount++]}: {c.amount} {c.unitName}<br></br>
              </>
          ))}
          </>
        )
  }
