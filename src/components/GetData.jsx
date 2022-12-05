import axios from "axios";
import React, { useState, useEffect } from "react";
import convert from "../convert";
import Navbar from "./Navbar";
import "../css/GetData.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";

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
  const [toggleArrow1, setToggleArrow1] = useState(true);
  const [toggleArrow2, setToggleArrow2] = useState(true);

  const handleChangeArrow1 = () => {
    return setToggleArrow1(!toggleArrow1);
  };
  const handleChangeArrow2 = () => {
    return setToggleArrow2(!toggleArrow2);
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
      <Navbar outputData={outputData} />

      {message && (
        <div className="show-message">
          <p>{message}</p>
        </div>
      )}

      <div className="container">
        <div className="data">
          <h2>
            Data from the Wikidata{" "}
            <span onClick={() => handleChangeArrow1()} id="btn-hidden">
              {toggleArrow1 ? (
                <FontAwesomeIcon icon={faSortDown} />
              ) : (
                <FontAwesomeIcon icon={faSortUp} />
              )}
            </span>
          </h2>

          {toggleArrow1 && (
            <pre className="wrap-data">
              {JSON.stringify(query, null, "   ")}
            </pre>
          )}
        </div>
        <div className="data">
          <h2>
            Data for the Wikimedia Commons{" "}
            <span onClick={() => handleChangeArrow2()} id="btn-hidden">
              {toggleArrow2 ? (
                <FontAwesomeIcon icon={faSortDown} />
              ) : (
                <FontAwesomeIcon icon={faSortUp} />
              )}
            </span>
          </h2>
          {toggleArrow2 && (
            <pre className="wrap-data">
              {query && JSON.stringify(outputData, null, "   ")}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
};

export default GetData;
