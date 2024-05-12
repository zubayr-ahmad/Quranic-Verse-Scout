import {useState} from 'react'
import './verses_box.css'
import Verse_container from './verse_container/verse_container'
import { ayahs } from '../../utils/sample_data/ayahs'
function Verses_box() {
  const [showAyahs, setShowAyahs] = useState(ayahs.slice(0, 3))
  const fetchMoreAyahs = () => {
    setShowAyahs(
      ayahs.slice(0, showAyahs.length + 3)
    )
  }
  return (
    <>
    <div className="verse-container">
        {showAyahs.map((ayah, index) => (
        <Verse_container key={index} ayah={ayah}/>
      ))
      }
      </div>
      {showAyahs.length < ayahs.length && 
        <button className="see-more" onClick={fetchMoreAyahs}>
          See More<i className="down_icon fa-solid fa-arrow-down"></i>
        </button>
      }
    </>
  )
}

export default Verses_box
