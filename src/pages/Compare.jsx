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
        const response = await fetch(
          "https://api.airtable.com/v0/appuSOtQ4A8knKIU1/tbl1e1gi4Hl0ClJKC?api_key=keyG5wgdTEwwoo4hS"
        );

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
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods?fdcIds=${encodeURIComponent(
          firstCompare
        )}&fdcIds=${encodeURIComponent(
          secondCompare
        )}&format=abridged&api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2`
      );

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

  const uniqueRecords = allRecordsAirTable.reduce((acc, current) => {
    const isDuplicate = acc.find(
      (item) => item.fields.FdcId === current.fields.FdcId
    );
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h1>Comparator</h1>
        <form onSubmit={handleSearch} className="mb-3">
          <div className="form-group">
            <select
              className="form-control mb-2"
              name="handleSetFirstCompare"
              onChange={handleSetFirstCompare}
            >
              {uniqueRecords.map((record, index) => (
                <option key={index} value={record.fields.FdcId}>
                  {record.fields.description + " - " + record.fields.FdcId}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control mb-2"
              name="handleSetSecondCompare"
              onChange={handleSetSecondCompare}
            >
              {uniqueRecords.map((record, index) => (
                <option key={index} value={record.fields.FdcId}>
                  {record.fields.description + " - " + record.fields.FdcId}
                </option>
              ))}
            </select>
          </div>
          <input
            type="submit"
            value="Search"
            className="btn btn-primary mb-2"
          />
          <div
            className={
              status === "error"
                ? "alert alert-danger"
                : status
                ? "alert alert-success"
                : ""
            }
          >
            {status}
          </div>
        </form>

        <div className="row">
          {foodData.map((fd, index) => (
            <div key={index} className="col-md-6">
              <table className="table table-bordered table-striped mt-4">
                <tbody>
                  <tr>
                    <th>ID:</th>
                    <td>{fd.fdcId}</td>
                  </tr>
                  <tr>
                    <th>Description:</th>
                    <td>{fd.description}</td>
                  </tr>
                  {fd.foodNutrients.map((c, nutrientIndex) => (
                    <tr key={nutrientIndex}>
                      <th>{c.name}</th>
                      <td>{c.amount + " " + c.unitName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
