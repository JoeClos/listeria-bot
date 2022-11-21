import { useState } from "react";
import GetData from "./components/GetData";
import "./App.css";
function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <>
      
        <div className="position">
          <div className="loader"></div>
          <h3>Loading ...</h3>
        </div>
        
      </>
    );
  }
  return (
    <div className="App">
      <GetData />
    </div>
  );
}

export default App;
