import {useState, useEffect} from 'react'
import './verses_box.css'
import Verse_container from './verse_container/verse_container'
import { ayahs } from '../../utils/sample_data/ayahs'
function Verses_box({ ayahs }) {
  const [showAyahs, setShowAyahs] = useState(ayahs.slice(0, 3))
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setShowAyahs(ayahs.slice(0, 3));
  }, [ayahs, isLoading]);

  const fetchMoreAyahs = () => {
    setIsLoading(true);
    setShowAyahs(
      ayahs.slice(0, showAyahs.length + 3)
    );
    setIsLoading(false);
  }
  return (
    <>
    {isLoading && <h1>Loading ...</h1>}
    <div className="verse-container">
        {showAyahs.map((ayah, index) => (
        <Verse_container key={index} ayah={ayah} id={ayah.id}/>
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
