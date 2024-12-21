import React from "react";
import "./VerseFinder.css";
import Search_bar from "/src/components/search_bar/search_bar";
import Verses_box from "/src/components/verses_box/verses_box";
import Summary from "../../components/summary/summary";
function VerseFinder() {
  const [ayahs, setAyahs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <div className="verse-finder-title">
        <h1>Verse Finder</h1>
      </div>
      <div className="verse-finder-container">
        <div className="verse-finder-search-container">
          <Search_bar setAyahs={setAyahs} setIsLoading={setIsLoading} />
          <Verses_box ayahs={ayahs} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

export default VerseFinder;
