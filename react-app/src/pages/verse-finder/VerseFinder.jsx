import React, { useState, useEffect } from "react";
import Verses_box from "../../components/verses_box/verses_box";
import Search_Bar from "../../components/search_bar/search_bar";
import "./VerseFinder.css";

const VerseFinder = () => {
  const [ayahs, setAyahs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setAyahs([
        { id: 1, text: "Ayah 1 text" },
        { id: 2, text: "Ayah 2 text" },
        { id: 3, text: "Ayah 3 text" },
        { id: 4, text: "Ayah 4 text" },
        { id: 5, text: "Ayah 5 text" },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="verse-finder-container">
        <h1 className="verse-finder-title">Verse Finder</h1>
      </div>
      <Search_Bar setAyahs={setAyahs} setIsLoading={setIsLoading} />
      <Verses_box ayahs={ayahs} isLoading={isLoading} />
    </>
  );
};

export default VerseFinder;
