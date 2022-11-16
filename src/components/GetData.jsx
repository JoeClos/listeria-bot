import axios from "axios";
import { useState, useEffect } from "react";

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
     


      <pre>
        {JSON.stringify(query, null, "   ")}
      
      </pre>
     
    </div>
  );
};

export default GetData;
