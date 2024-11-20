import React from 'react'
import './home.css'
import Search_bar from '/src/components/search_bar/search_bar'
import Verses_box from '/src/components/verses_box/verses_box'
import Home_Image from '/src/components/home_image/home_image'
function Home() {
  const [ayahs, setAyahs] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="container">
      <Home_Image />
      <Search_bar setAyahs={setAyahs} setIsLoading={setIsLoading}  />
      <Verses_box ayahs={ayahs} isLoading={isLoading}/>
    </div>
  )
}

export default Home
