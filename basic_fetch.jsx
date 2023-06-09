/*

import { useState } from "react";

function App() {
  const [result, setResult] = useState({});
  
  const handleSearch = async () => {
    console.log("searching");
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=9MD6Im68ci8QJf3fHSBycrAbvkNNFKGcnr2bMtJ2&query=Cheddar%20Cheese`
    );
    const jsonData = await response.json();
    setResult(jsonData);
    console.log(jsonData);
  };

  return (
    <>
      <button onClick={handleSearch}>Search</button>
    </>
  )
}

export default App

*/