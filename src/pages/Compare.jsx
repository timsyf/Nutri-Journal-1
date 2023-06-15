import { useEffect, useState } from "react";

export default function Compare(props1, props2) {

  const [foodData, setFoodData] = useState([]);
  const [firstCompare, setFirstCompare] = useState([]);
  const [secondCompare, setSecondCompare] = useState([]);

  const [allRecordsAirTable, setAllRecordsAirTable] = useState([]);
  const [status, setStatus] = useState("");

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function handleDropdownBox() {
      setStatus("loading");
      try {
        const response = await fetch("https://api.airtable.com/v0/appuSOtQ4A8knKIU1/tbl1e1gi4Hl0ClJKC?api_key=keyG5wgdTEwwoo4hS");
        
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const data = await response.json();

        setAllRecordsAirTable(data.records);
        setFirstCompare(data.records[0].fields.FdcId);
        setSecondCompare(data.records[0].fields.FdcId);

        setStatus("");
      } catch (error) {
          setStatus("error"); 
      }
    }
    handleDropdownBox();

  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    setStatus("loading");

    try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods?fdcIds=${encodeURIComponent(firstCompare)}&fdcIds=${encodeURIComponent(secondCompare)}&format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`);
    
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    
    const data = await response.json();
    setFoodData(data);
    setStatus("");

    } catch (error) {
        setStatus("error");
    }
  }

  async function handleSetFirstCompare(e) {
    setFirstCompare(e.target.value);
  }

  async function handleSetSecondCompare(e) {
    setSecondCompare(e.target.value);
  }

    return (
      <>
      <h1>Comparator</h1>
        <form onSubmit={handleSearch}>
        <select className="dropdown" name="handleSetFirstCompare" onChange={handleSetFirstCompare}>
            {allRecordsAirTable.map((records) => (
              <option value={records.fields.FdcId}>{records.fields.FdcId}</option>
            ))}
          </select>
          <select className="dropdown" name="handleSetSecondCompare" onChange={handleSetSecondCompare}>
            {allRecordsAirTable.map((records) => (
              <option value={records.fields.FdcId}>{records.fields.FdcId}</option>
            ))}
          </select>
          <input type="submit" value={"Search"}></input><br></br>
          <label>{status}</label>
        </form>

        {foodData.map((fd) => (
        <table className="compareTable">
          <tbody>
            <tr>
              <th>ID:</th>
              <td>{fd.fdcId}</td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{fd.description}</td>
            </tr>

            {fd.foodNutrients.map((c) => (
              <tr>
                <th>{c.name}</th>
                <td>{c.amount + " " + c.unitName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ))}
      </>
    );
}


