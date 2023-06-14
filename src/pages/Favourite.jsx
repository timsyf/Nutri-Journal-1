import { Link } from "react-router-dom"
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

        setTemp(data.records);
        console.log(data.records);
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
      <label>{status}</label>
      <table className="table">
          <tbody>
              <tr>
              <th>GTIN/UPC</th>
              <th>Description</th>
              <th>Brand Owner</th>
              <th>Brand</th>
              <th>Market Country</th>
              </tr>

              {temp.map((fd) => (
              <tr key={fd.fdcId}>
                <td><Link to={"./details/" + fd.fields.FdcId}>{fd.fields.FdcId}</Link></td>
                <td>{fd.fields.Description}</td>
                <td>{fd.fields.BrandOwner}</td>
                <td>{fd.fields.Brand}</td>
                <td>{fd.fields.MarketCountry}</td>
                <td><input type="submit" value={"-"}></input></td>
              </tr>
              ))}
          </tbody>
        </table>

      </>
    );
  }
  