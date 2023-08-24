import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchDetails() {
  const [foodData, setFoodData] = useState([]);
  const { id } = useParams();

  const [foodDataNutrients, setFoodDataNutrients] = useState([]);

  const [status, setStatus] = useState("");

  useEffect(() => {
    async function getFoodData() {
      setStatus("loading");
      try {
        const response = await fetch(
          `https://api.nal.usda.gov/fdc/v1/food/${encodeURIComponent(
            id
          )}?format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`
        );

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
      <div className="container mt-4">
        <h1>Search Details</h1>
        <div className="mb-3">
          <Link to={"../../search"}>
            <button className="btn btn-secondary">Back</button>
          </Link>
        </div>
        <div
          className={
            status === "error" ? "alert alert-danger" : "alert alert-success"
          }
        >
          {status}
        </div>
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{foodData.fdcId}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{foodData.description}</td>
            </tr>
            {foodDataNutrients.map((c, index) => (
              <tr key={index}>
                <th>{c.name}</th>
                <td>{c.amount + " " + c.unitName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
