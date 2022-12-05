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
  const [toggleArrowDown, setToggleArrowDown] = useState(true);
  const [toggleArrowUp, setToggleArrowUp] = useState(true);

  const handleChangeArrowDown = () => {
    return setToggleArrowDown(!toggleArrowDown);
  };
  const handleChangeArrowUp = () => {
    return setToggleArrowUp(!toggleArrowUp);
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
      {message && (
        <div className="show-message">
          <p>{message}</p>
        </div>
      )}

      <div className="container">
        <div className="data">
          <h2>
            Data from the Wikidata{" "}
            <span onClick={() => handleChangeArrowDown()} id="btn-hidden">
              {toggleArrowDown ? (
                <FontAwesomeIcon icon={faSortUp} />
              ) : (
                <FontAwesomeIcon icon={faSortDown} />
              )}
            </span>
          </h2>

          {toggleArrowDown && (
            <pre className="wrap-data">
              {JSON.stringify(query, null, "   ")}
            </pre>
          )}
        </div>
        <div className="data">
          <h2>
            Data for the Wikimedia Commons{" "}
            <span onClick={() => handleChangeArrowUp()} id="btn-hidden">
              {toggleArrowUp ? (
                <FontAwesomeIcon icon={faSortUp} />
              ) : (
                <FontAwesomeIcon icon={faSortDown} />
              )}
            </span>
          </h2>
          {toggleArrowUp && (
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
