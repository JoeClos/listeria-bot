import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
    const sparql = document.location.search.slice(1);
    const queryWikidata = "https://query.wikidata.org/";
    const sourceLink = queryWikidata + "#" + sparql;
    return (
        <nav className="navbar">
            <h1>Tabular Data from SPARQL</h1>

            <div className='buttons-container'>
                {/*This is the button that's open new page too see the query in wikidata  */}
                <a
                  href= {sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className='btn'>
                  <img src='images/Wikidata-logo-en.png' 
                      alt='Wikidata logo'
                      className='wikidata-logo'
                      />
                      <div>View query</div>
                      </button>
                </a>
                {/*This is the button that's saving the data to Wikimedia Commons  */}
                {/* <a
                  href= "#"
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                    
                  <button className='btn-save-commons'>
                  <img src='images/Commons-logo.png' 
                      alt='Wikimedia Commons logo'
                      className='commons-logo'
                      />
                      <div>Save to Wikimedia Commons</div>
                    </button>
                {/* </a> */}
            </div>
        </nav>
    )
}

export default Navbar;