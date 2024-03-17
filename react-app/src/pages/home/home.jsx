import React from 'react'
import './home.css'
import Search_bar from '/src/components/search_bar/search_bar'
import Verses_box from '/src/components/verses_box/verses_box'
function Home() {
  return (
    <div className="container">
      <img src="src/assets/images/img03.avif" alt="Quran Image" />
      <Search_bar />
      <Verses_box />
    </div>
  )
}

export default Home
