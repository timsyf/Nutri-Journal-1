import { useState, useEffect } from "react";
import Airtable from "airtable";

export default function Favourite() {

    // AIRTABLE
    const base = new Airtable({apiKey:"keyG5wgdTEwwoo4hS"}).base("appuSOtQ4A8knKIU1");

    const [temp, setTemp] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
    async function fetchSearch() {
      setStatus("loading");
      try {
        const response = await fetch("https://api.airtable.com/v0/appuSOtQ4A8knKIU1/tbl1e1gi4Hl0ClJKC?api_key=keyG5wgdTEwwoo4hS");
        
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const data = await response.json();

        setTemp(data);
        console.log(data);
        setStatus("");
      } catch (error) {
          setStatus("error");
      }
    }
    fetchSearch();
  }, []);

    return (
      <>
      <h1>Favourite</h1>

      <table className="table">
          <tbody>
              <tr>
              <th>GTIN/UPC</th>
              <th>Description</th>
              <th>Branded Food Category</th>
              <th>Brand Owner</th>
              <th>Brand</th>
              </tr>

              {fooddata.map((fd) => (
              <tr key={fd.fdcId}>
              <td><Link to={"./details/" + fd.fdcId}>{fd.fdcId}</Link></td>
              <td>{fd.description}</td>
              <td>{fd.foodCategory}</td>
              <td>{fd.brandOwner}</td>
              <td>{fd.brandName}</td>
              <td>{fd.marketCountry}</td>
              </tr>
              ))}
          </tbody>
        </table>

      </>
    );
  }
  