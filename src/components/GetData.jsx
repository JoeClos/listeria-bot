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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(sourceUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
    setQuery();
    setLoading(false);
  }, [sourceUrl]);

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

      <div className="container">
        <div className="data">
          <h2>Data from the Wikidata</h2>
          <pre>{JSON.stringify(query, null, "   ")}</pre>
        </div>
        <div className="data">
          <h2>Data for the Wikimedia Commons</h2>
          <pre className="wrap-data">
            {query && JSON.stringify(convert(query, sourceLink), null, "   ")}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default GetData;
