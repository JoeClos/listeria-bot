import React, { useState } from "react";
import GetData from "./components/GetData";
import "./App.css";
function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      {loading ? (
        <div className="position">
          <div className="loader"></div>
          <h3>Loading ...</h3>
        </div>
      ) : (
        <GetData />
      )}
    </div>
  );
}

export default App;
