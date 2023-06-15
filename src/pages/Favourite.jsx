import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

export default function Favourite() {

    // AIRTABLE
    const [allRecords, setAllRecords] = useState([]);
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

        setAllRecords(data.records);
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
      <table className="favouriteTable">
          <tbody>
              <tr>
              {allRecords.map((fd) => (
              <td><Link to={"./details/" + fd.fields.FdcId}>{fd.fields.FdcId}</Link></td>
              ))}
              </tr>
          </tbody>
        </table>

      </>
    );
  }
  