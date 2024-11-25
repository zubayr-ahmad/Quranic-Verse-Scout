import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <h1 className="title">QURANIC VERSE SCOUT</h1>
      <div className="cards-container">
        <div className="card">
          <h2 className="card-title">Verse Finder</h2>
          <p className="card-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet nulla auctor, vestibulum magna sed, convallis ex.
          </p>
          <button
            className="card-button"
            onClick={() => handleSelect("/verse-finder")}
          >
            Select
          </button>
        </div>
        <div className="card">
          <h2 className="card-title">Surah Summary</h2>
          <p className="card-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet nulla auctor, vestibulum magna sed, convallis ex.
          </p>
          <button
            className="card-button"
            onClick={() => handleSelect("/surah-summary")}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
