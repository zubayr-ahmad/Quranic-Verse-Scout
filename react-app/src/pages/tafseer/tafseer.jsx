import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './tafseer.css';
function tafseer() {
    const [ayat, setAyat] = useState({});
    const { surah_id, verse_id } = useParams();
    useEffect(() => {
      URL = `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/en-asbab-al-nuzul-by-al-wahidi/${surah_id}/${verse_id}.json`
      const fetch_Tafseer = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        const ayatJSON = localStorage.getItem('ayat');
        const ayatObject = JSON.parse(ayatJSON);
        data.english = ayatObject.english;
        data.arabic = ayatObject.text;
        console.log(data);
        setAyat(data);
      };
      fetch_Tafseer();
      console.log(ayat);
    }, [surah_id, verse_id]);
    return (
      <div className="tafsir-page">
        <h1>Tafsir</h1>
        <div id= "ayat">
          <h2>Ayat</h2>
          {/* {console.log(ayat)} */}
          <p className="arabic"><b>[{surah_id}:{verse_id}] </b>{ayat.arabic}</p>
          <p>{ayat.english}</p>
        </div>
        <div id= "tafsir">
          <h2>Ayat Tafsir</h2>
          <p>{ayat.text}</p>
        </div>
      </div>
    );
}

export default tafseer
