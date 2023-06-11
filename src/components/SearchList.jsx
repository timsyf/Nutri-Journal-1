export default function SearchList(props) {

    const fd = props.fd;

    return (
        <>
            {fd.map((fd) => (
            <tr key={fd.fdcId}>
                <td>{fd.fdcId}</td>
                <td>{fd.description}</td>
                <td>{fd.foodCategory}</td>
                <td>{fd.brandOwner}</td>
                <td>{fd.brandName}</td>
                <td>{fd.marketCountry}</td>
                <td><input type="submit" className="compare_button" name={fd.fdcId} value={"+"}></input></td>
            </tr>
            ))}
        </>
    );
  }