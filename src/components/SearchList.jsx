import { Link } from "react-router-dom";
import { useState } from "react";

export default function SearchList(props) {
  const [favourites, addFavourites] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [status, setStatus] = useState();

  const fooddata = props.fd;

  function HandleAddToFavourites(e, desc) {
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

    async function createFavourites() {
      setStatus("loading");
      try {
        const response = await fetch(
          "https://api.airtable.com/v0/appuSOtQ4A8knKIU1/tbl1e1gi4Hl0ClJKC?api_key=keyG5wgdTEwwoo4hS",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              records: [
                {
                  fields: {
                    FdcId: e.target.name,
                    description: desc,
                  },
                },
              ],
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const jsonData = await response.json();
        addFavourites(jsonData);

        setStatus("");
      } catch (error) {
        setStatus("error");
      }
    }
    createFavourites();
  }

  return (
    <>
      <div className="scrollable-table-container">
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            {" "}
            {/* To give the headers a darker background */}
            <tr>
              <th>GTIN/UPC</th>
              <th>Description</th>
              <th>Branded Food Category</th>
              <th>Brand Owner</th>
              <th>Brand</th>
              <th>Market Country</th>
              <th>Action</th> {/* Added a header for the action button */}
            </tr>
          </thead>
          <tbody>
            {fooddata.map((fd) => (
              <tr key={fd.fdcId}>
                <td>
                  <Link to={"./details/" + fd.fdcId}>{fd.fdcId}</Link>
                </td>
                <td>
                  <Link to={"./details/" + fd.fdcId}>{fd.description}</Link>
                </td>
                <td>{fd.foodCategory}</td>
                <td>{fd.brandOwner}</td>
                <td>{fd.brandName}</td>
                <td>{fd.marketCountry}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    name={fd.fdcId}
                    onClick={(e) => HandleAddToFavourites(e, fd.description)}
                  >
                    Add to favourite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
