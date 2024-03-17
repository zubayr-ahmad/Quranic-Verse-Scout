import React from 'react'

import './index.css'
function index() {
  return (
      <div className="search-container">
          <textarea className='search_bar__text_area_field'  placeholder="Search for reference" rows="2" cols="80"></textarea>
      <button className='search_bar_button'><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
  )
}

export default index
