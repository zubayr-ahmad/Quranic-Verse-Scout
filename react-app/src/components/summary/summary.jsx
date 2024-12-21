import React, { useState, useEffect, useRef } from "react";
import { surah } from "../../utils/surah";
import "./summary.css";

const Summary = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState(surah.data);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown to close it
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

    // Filter surahs by name or number
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
    setSearchText(`${s.number}. ${s.englishName}`); // Populate input with surah name
    setShowDropdown(false); // Close dropdown
  };

  const fetchSurahSummary = async () => {
    if (!selectedSurah) {
      alert("Please select a Surah first!");
      return;
    }
    setSummary(""); // Clear previous summary

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
          onFocus={() => setShowDropdown(true)} // Show dropdown on focus
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
      <button className="fetch-summary-btn" title="summarize" onClick={fetchSurahSummary}>
        <img src="/src/assets/images/icons8-quran-42.png" alt="summarize"/>
      </button>
      </div>
      {isLoading && <p>Loading summary...</p>}
      {summary && (
        <div className="surah-summary">
          <h3>Surah Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;
