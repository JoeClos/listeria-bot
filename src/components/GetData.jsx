import axios from "axios";
import React, { useState, useEffect } from "react";
import convert from "../convert";
import Navbar from "./Navbar";
import "../css/GetData.css";

const GetData = () => {
  const url = "https://query.wikidata.org/sparql?format=json&query=";
  const sparql = document.location.search.slice(1);
  const queryWikidata = "https://query.wikidata.org/";
  const sourceUrl = url + sparql;
  const sourceLink = queryWikidata + "#" + sparql;

  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [outputData, setOutputData] = useState();
  const [toggle, setToggle] = useState(true);

  const handleChange = () => {
    return setToggle(!toggle);
  };
  

  useEffect(
    () => {
      axios
        .get(sourceUrl)
        .then((response) => {
          setOutputData(convert(response.data, sourceLink, setMessage));
          setQuery(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    },
    [sourceUrl],
    4000
  );

  if (loading) {
    return (
      <div className="position">
        <div className="loader"></div>
        <h3>Loading ...</h3>
      </div>
    );
  }

  return (
    <section>
      <Navbar />
      <p>{message}</p>
      <div className="container">
        <div className="data">
          <h2>Data from the Wikidata</h2>
          <button
            onClick={() => handleChange()}
            className="btn btn-primary mb-5"
            style={{border: "1px #3272b6 solid", borderRadius: "5px", color: "#0069d9", cursor: "pointer", padding: "5px"}}
            id="btn-hidden"
          >
           { toggle? "See less" : "See more"}
          </button>
          {toggle && (
            <pre className="wrap-data">
              {JSON.stringify(query, null, "   ")}
            </pre>
          )}
        </div>
        <div className="data">
          <h2>Data for the Wikimedia Commons</h2>
          <pre className="wrap-data">
            {query && JSON.stringify(outputData, null, "   ")}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default GetData;
