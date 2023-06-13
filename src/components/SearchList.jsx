import { Link } from "react-router-dom"

export default function SearchList(props) {

    const fooddata = props.fd;

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