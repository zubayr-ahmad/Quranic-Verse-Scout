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
      <h2 className="title">QURAN SCOUT</h2>
      <div className="cards-container">
        <div className="card">
          <h2 className="card-title">Verse Finder</h2>
          <p className="card-description">
            <ul>
              <li>Find Quranic verses by describing their context or meaning.</li>
              <li>Utilizes semantic search technology to match context with relevant verses.</li>
              <li>Returns the most likely matches from the Quran.</li>
            </ul>
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
            <ul>
              <li>Get concise, accurate summaries of any Surah.</li>
              <li>Implements RAG-based solution to prevent hallucinations.</li>
              <li>Search Surahs by name or number.</li>
              <li>Summaries are generated directly from the verses, ensuring accuracy.</li>
            </ul>
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
