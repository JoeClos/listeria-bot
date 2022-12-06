import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../css/Navbar.css";
import axios from "axios";

const Navbar = ({ outputData }) => {
  const sparql = document.location.search.slice(1);
  const queryWikidata = "https://query.wikidata.org/";
  const sourceLink = queryWikidata + "#" + sparql;

  const handleClick = () => {
    axios.post(process.env.REACT_APP_BACKEND_URL ||  "https://tabular-data-from-sparql.toolforge.org/upload", {
      pageName: "Data:Sandbox/JosephineBot/uploadTest.tab",
      content: outputData
    });
    alert("PAGE UPLOADED! 🎊 🎉");
  };

  return (
    <nav className="navbar">
      <div className="upper-layer">
        <h1>Tabular Data from SPARQL</h1>

        <div className="buttons-container">
          {/*This is the button that's open new page too see the query in wikidata  */}

          <a href={sourceLink} target="_blank" rel="noopener noreferrer">
            <button className="btn-query">
              <img
                src="images/Wikidata-logo-en.png"
                alt="Wikidata logo"
                className="wikidata-logo"
              />
              <div className="text-btn">View query</div>
            </button>
          </a>

          {/*This is the button that's saving the data to Wikimedia Commons  */}

          <button className="btn-save-commons" onClick={handleClick}>
            <img
              src="images/Commons-logo.png"
              alt="Wikimedia Commons logo"
              className="commons-logo"
            />
            <div className="text-btn">Save to Wikimedia Commons</div>
          </button>

          <a href="https://github.com/JoeClos/listeria-bot">
            <button className="btn-github">
              <FontAwesomeIcon
                icon={faGithub}
                className="github-icon"
                style={{ fontSize: "28px" }}
              />
              <div className="text-btn">GitHub</div>
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
