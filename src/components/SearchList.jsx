import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

export default function SearchList(props) {

    const [temp, addHoliday] = useState([]);

    const fooddata = props.fd;

    const payload2 = {
        FdcId: 15,
        Description: "ASD",
        BrandOwner: "ASD",
        Brand: "ASD",
        MarketCountry: "ASD"
      };
      
      const payload = {
        "records": [{
            "fields": {
                "FdcId": 15,
                "Description": "ASD",
                "BrandOwner": "ASD",
                "Brand": "ASD",
                "MarketCountry": "ASD"
            }
        }]
    }
      
    useEffect(() => {
          async function createHoliday(payload) {
            const response = await fetch("https://api.airtable.com/v0/appuSOtQ4A8knKIU1/tbl1e1gi4Hl0ClJKC?api_key=keyG5wgdTEwwoo4hS", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            const jsonData = await response.json();
            addHoliday(jsonData);
          }
          createHoliday(payload);
    }, []);

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
                <td><input type="submit" value={"+"}></input></td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
    );
  }