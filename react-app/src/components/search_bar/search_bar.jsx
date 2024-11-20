import React, { useState } from 'react';
import './search_bar.css'

function Search_Bar({ setAyahs, setIsLoading }) {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:5000/get_ayahs?query=${encodeURIComponent(textAreaValue)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    setAyahs(data.ayahs);
    setIsLoading(false);
  };

  return (
    <div className="search-container">
      <textarea
        className='search_bar__text_area_field'
        placeholder="Search for reference"
        rows="1"
        cols="80"
        value={textAreaValue}
        onChange={e => setTextAreaValue(e.target.value)}
      ></textarea>
      <button className='search_bar_button' onClick={handleSubmit}>
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
    )
}

export default Search_Bar;