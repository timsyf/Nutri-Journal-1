import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

export default function SearchList(props) {

    const [favourites, addFavourites] = useState([]);

    const fooddata = props.fd;

    function HandleAddToFavourites(e) {

        /*fooddata.map((fd) => (
            favourites.map((df) => (
                console.log(fd + " | " + df)
            ))
        ))*/

        async function createFavourites() {
            const response = await fetch("https://api.airtable.com/v0/appuSOtQ4A8knKIU1/tbl1e1gi4Hl0ClJKC?api_key=keyG5wgdTEwwoo4hS", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "records": [{
                    "fields": {
                        "FdcId": e.target.name,
                    }
                }]
            }),
            });
            const jsonData = await response.json();
            addFavourites(jsonData);
        }



          createFavourites();
    }

    return (
        <>
            <table className="table">
            <tbody>
                <tr>
                <th>GTIN/UPC</th>
                <th>Description</th>
                <th>Branded Food Category</th>
                <th>Brand Owner</th>
                <th>Brand</th>
                <th>Market Country</th>
                </tr>

                {fooddata.map((fd) => (
                <tr key={fd.fdcId}>
                <td><Link to={"./details/" + fd.fdcId}>{fd.fdcId}</Link></td>
                <td>{fd.description}</td>
                <td>{fd.foodCategory}</td>
                <td>{fd.brandOwner}</td>
                <td>{fd.brandName}</td>
                <td>{fd.marketCountry}</td>
                <td><input name={fd.fdcId} type="button" value={"+"} onClick={HandleAddToFavourites}></input></td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
    );
  }