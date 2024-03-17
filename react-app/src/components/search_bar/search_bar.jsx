import React from 'react'

import './search_bar.css'
function Search_Bar() {
  return (
      <div className="search-container">
          <textarea className='search_bar__text_area_field'  placeholder="Search for reference" rows="2" cols="80"></textarea>
      <button className='search_bar_button'><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
  )
}

export default Search_Bar
