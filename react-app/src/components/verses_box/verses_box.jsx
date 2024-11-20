import {useState, useEffect} from 'react'
import './verses_box.css'
import Verse_container from './verse_container/verse_container'
function Verses_box({ ayahs, isLoading }) {
  const [showAyahs, setShowAyahs] = useState(ayahs.slice(0, 3));

  useEffect(() => {
    setShowAyahs(ayahs.slice(0, 3));
  }, [ayahs]);

  const fetchMoreAyahs = () => {
    setShowAyahs(ayahs.slice(0, showAyahs.length + 3));
  };

  if (isLoading) {
    return <h1 className='loading'>Searching Ayahs ...</h1>;
  }

  return (
    <>
      <div className="verse-container">
        {showAyahs.map((ayah, index) => (
          <Verse_container key={index} ayah={ayah} id={ayah.id} />
        ))}
      </div>
      {showAyahs.length < ayahs.length && (
        <button className="see-more" onClick={fetchMoreAyahs}>
          See More<i className="down_icon fa-solid fa-arrow-down"></i>
        </button>
      )}
    </>
  );
}

export default Verses_box;
