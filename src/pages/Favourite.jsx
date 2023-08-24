import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Favourite() {
  // AIRTABLE
  const [allRecords, setAllRecords] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    async function fetchSearch() {
      setStatus("loading");
      try {
        const response = await fetch(
          "https://api.airtable.com/v0/appuSOtQ4A8knKIU1/tbl1e1gi4Hl0ClJKC?api_key=keyG5wgdTEwwoo4hS"
        );

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

  const uniqueFdcIds = new Set(allRecords.map((fd) => fd.fields.FdcId));
  const uniqueRecords = allRecords.filter((fd, index, self) => {
    return index === self.findIndex((t) => t.fields.FdcId === fd.fields.FdcId);
  });

  return (
    <>
      <h1>Favourite</h1>
      <label>{status}</label>

      <div className="scrollable-table-container">
        <table className="table table-striped table-bordered">
          <tbody>
            {uniqueRecords.map((fd) => (
              <tr key={fd.fields.FdcId}>
                <td>
                  <Link to={"./details/" + fd.fields.FdcId}>
                    {fd.fields.description}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
