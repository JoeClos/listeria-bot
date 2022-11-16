import axios from "axios";
import { useState, useEffect } from "react";
import convert from "../convert";

const GetData = () => {
  const url = "https://query.wikidata.org/sparql?format=json&query=";
  const sparql = document.location.search.slice(1);
  const queryWikidata = "https://query.wikidata.org/";


  const [query, setQuery] = useState({ data: [] });

  useEffect(() => {
    axios
      .get(url + sparql)
      .then((response) => {
        setQuery(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sparql]);

  return (
    <div>
      <h1>Listeria</h1>

            <a
              href= {queryWikidata + "#" + sparql}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
     

    <h2>Data from the Wikidata</h2>
      <pre>
        {JSON.stringify(query, null, "   ")}
      
      </pre>
    <h2>Data for the Wikimedia Commons</h2>
    <pre>
    {JSON.stringify(convert(query), null, "   ")}

    </pre>
     
    </div>
  );
};

export default GetData;
