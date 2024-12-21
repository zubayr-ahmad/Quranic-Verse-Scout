import React, { useState, useEffect, useRef } from "react";
import { surah } from "../../utils/surah";
import "./summary.css";

const formatText = (text) => {
  // Process the text in multiple passes for different formatting types
  const processText = (input) => {
    // Handle bold text
    const boldParts = input.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`bold-${index}`}>{part.slice(2, -2)}</strong>;
      }
      
      // Handle italics
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={`italic-${index}`}>{part.slice(1, -1)}</em>;
      }
      
      // Handle lists
      if (part.startsWith('- ')) {
        return <li key={`list-${index}`}>{part.slice(2)}</li>;
      }
      
      // Handle paragraphs
      if (part.trim().length > 0) {
        return <p key={`text-${index}`}>{part}</p>;
      }
      
      return null;
    });
  };

  return processText(text);
};

const Summary = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState(surah.data);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [summary, setSummary] = useState("");
  const [translatedSummary, setTranslatedSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);

    const filtered = surah.data.filter(
      (s) =>
        s.englishName.toLowerCase().includes(query) ||
        s.englishNameTranslation.toLowerCase().includes(query) ||
        s.name.includes(query) ||
        s.number.toString().includes(query)
    );

    setFilteredSurahs(filtered);
  };

  const handleSelectSurah = (s) => {
    setSelectedSurah(s);
    setSearchText(`${s.number}. ${s.englishName}`);
    setShowDropdown(false);
  };

  const fetchSurahSummary = async () => {
    if (!selectedSurah) {
      alert("Please select a Surah first!");
      return;
    }
    setSummary("");
    setTranslatedSummary("");

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/summarize?surah_id=${selectedSurah.number}&surah_name=${selectedSurah.englishName}`
      );
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching Surah summary:", error);
      setSummary("Failed to fetch summary. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const translateSummary = async () => {
    if (!summary) {
      alert("Please generate a summary first!");
      return;
    }

    setTranslatedSummary("");
    setIsTranslating(true);
    try {
      const response = await fetch(
        `http://localhost:5000/translate?summary=${encodeURIComponent(summary)}`
      );
      const data = await response.json();
      console.log(data);
      
      setTranslatedSummary(data.summary);
    } catch (error) {
      console.error("Error translating summary:", error);
      setTranslatedSummary("Failed to translate. Please try again later.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="summary">
      <h2>Generate Summary</h2>
      <div className="summary-input-container" ref={dropdownRef}>
        <input
          type="text"
          className="summary-input-search-box"
          placeholder="Search Surah by name or number"
          value={searchText}
          onChange={handleSearch}
          onFocus={() => setShowDropdown(true)}
        />
        {showDropdown && (
          <div className="dropdown">
            {filteredSurahs.map((s) => (
              <div
                key={s.number}
                className="dropdown-item"
                onClick={() => handleSelectSurah(s)}
              >
                <strong>
                  {s.number}. {s.name}
                </strong>{" "}
                - {s.englishName}
              </div>
            ))}
          </div>
        )}
        <button 
          className="fetch-summary-btn" 
          title="summarize" 
          onClick={fetchSurahSummary}
        >
          <img src="/src/assets/images/icons8-quran-42.png" alt="summarize"/>

        </button>
      </div>
      {isLoading && (
        <div className="loading-message">
          <p>Generating summary...</p>
        </div>
      )}
      {summary && (
        <div className="surah-summary">
          <div className="formatted-summary">
            {formatText(summary)}
          </div>
          <button
            className="translate-btn"
            title="Translate to Urdu"
            onClick={translateSummary}
          >
            Translate to Urdu
          </button>
        </div>
      )}
      {isTranslating && <p>Translating summary...</p>}
      {translatedSummary && (
        <div className="translated-summary">
          <h3>Translated Summary:</h3>
          <p>{translatedSummary}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;